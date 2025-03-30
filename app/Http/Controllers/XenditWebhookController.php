<?php

namespace App\Http\Controllers;

use App\Mail\OrderPaidMail;
use App\Models\Customer;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Support\Facades\Mail;

class XenditWebhookController extends Controller
{
    public function handleWebhook(Request $request)
    {
        $callbackToken = $request->header('X-Callback-Token');
        $expectedToken = env('XENDIT_WEBHOOK_TOKEN');

        $payload = $request->all();

        if ($payload['status'] == "PAID") {
            $invoiceId = $payload['id'];

            if ($invoiceId) {
                $order = Order::where('orderInvoiceID', $invoiceId)->first();
                $order->orderPaymentStatus = '1';
                $order->save();

                $customer = Customer::find($order->customerID);
                $items = OrderItem::where('orderID', $order->orderID)
                        ->get()
                        ->map(function ($item) {
                            $product = Product::where('productCode',$item->productCode)->first();
                            $item->productName = $product;
                            return $item;
                        });

                Mail::to($customer->customerEmail)->send(new OrderPaidMail($order, $customer, $items, $payload));
                return $payload;
            }
        }
    }
}
