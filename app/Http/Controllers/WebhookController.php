<?php

namespace App\Http\Controllers;

use App\Mail\OrderPaidMail;
use App\Models\Customer;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\ProductCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;
use Google\Auth\Credentials\ServiceAccountCredentials;
class WebhookController extends Controller
{
    public function handleXendit(Request $request)
    {
        $callbackToken = $request->header('X-Callback-Token');
        $expectedToken = env('XENDIT_WEBHOOK_TOKEN');

        $payload = $request->all();

        if ($payload['status'] === "PAID") {
            $invoiceId = $payload['id'];

            if ($invoiceId) {
                $order = Order::where('orderInvoiceID', $invoiceId)->first();

                if ($order) {
                    $order->orderPaymentStatus = '1';
                    $order->save();

                    $customer = Customer::find($order->customerID);
                    $items = OrderItem::where('orderID', $order->orderID)
                        ->get()
                        ->map(function ($item) {
                            $product = Product::where('productCode', $item->productCode)->first();
                            $item->productName = $product;
                            return $item;
                        });

                    Mail::to($customer->customerEmail)->send(new OrderPaidMail($order, $customer, $items, $payload));
                }

                return $payload;
            }
        }

        return response()->json(['message' => 'Ignored'], 200);
    }

    public function handleDialogflow(Request $request)
    {
        $pathToKey = storage_path('app/dialogflow-key.json');

            $creds = new ServiceAccountCredentials(
            ['https://www.googleapis.com/auth/cloud-platform'],
            json_decode(file_get_contents($pathToKey), true)
        );

        $accessToken = $creds->fetchAuthToken()['access_token'];

        $userInput = $request->input('query');

        $response = Http::withToken($accessToken)
            ->post('https://dialogflow.googleapis.com/v2/projects/mercury-445815/agent/sessions/123456789:detectIntent', [
                'queryInput' => [
                    'text' => [
                        'text' => $userInput,
                        'languageCode' => 'en',
                    ]
                ]
            ]);

        $dialogflowData = $response->json();
        $intent = $dialogflowData['queryResult']['intent']['displayName'] ?? null;

        if ($intent === "Default Welcome Intent" || $intent === 'Default Fallback Intent') {
            $messages = $dialogflowData['queryResult']['fulfillmentMessages'] ?? [];
            $textResponses = [];

            foreach ($messages as $msg) {
                if (isset($msg['text']['text'])) {
                    $textResponses = array_merge($textResponses, $msg['text']['text']);
                }
            }

            $message = implode("\n", $textResponses);
            $data = null;
        }
        elseif ($intent === 'ShowCategories') {
            $categories = ProductCategory::select()->get();
            $message = empty($categories)
                ? 'No categories found.'
                : "Here are our product categories:";
            $data = $categories;
        }
        elseif ($intent === 'ShowProducts') {
            $products = Product::select()->get();
            $message = empty($products)
                ? 'No products found.'
                : "Here are some of our product:";
            $data = $products;
        } else {
            $message = "Sorry, I didn’t understand that.";
        }

        return response()->json([
            'fulfillmentMessages' => [
                ['text' => ['text' => [$message]]]
            ],
            'data' => $data
        ]);
    }
}
