<?php

namespace App\Http\Controllers;

use App\Http\Services\XenditService;
use App\Mail\OrderPlacedMail;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Redis;
use Illuminate\Validation\ValidationException;
use Laravel\Sanctum\PersonalAccessToken;

class CheckoutController extends Controller
{
    public $xendit;

    public function __construct(XenditService $xendit) {
        $this->xendit = $xendit;
    }

    public function placeOrder(Request $request){
        $token = $request->cookie('auth_token');
        $accessToken = PersonalAccessToken::findToken($token);
        $customer = $accessToken->tokenable;
        $customerID = $customer->customerID;
        $invoiceUrl = null;

        try {
            $validated = $request->validate([
                'orderDeliveryID' => 'required|integer',
                'orderItems' => 'required|array',
                'orderTotal' => 'required|numeric',
                'orderPaymentMethod' => 'required|string'
            ], [
                'orderDeliveryID.required' => 'Select delivery address',
                'orderPaymentMethod.required' => 'Select payment option'
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => $e->validator->errors()->first(),
                'status' => 'error'
            ]);
        }

        $order = Order::create([
            'customerID' => $customerID,
            'orderPaymentStatus' => '2',
            'orderFulfillmentStatus' => '2',
            'orderStatus' => '1',
            'orderDeliveryID' => $validated['orderDeliveryID'],
            'orderTotal' => $validated['orderTotal'],
            'orderDateTime' => now(),
            'orderPaymentMethod' => $validated['orderPaymentMethod'],
        ]);

        foreach ($validated['orderItems'] as $item) {
            OrderItem::create([
                'orderID' => $order->orderID,
                'productID' => $item['productID'],
                'orderItemPrice' => $item['productPrice'],
                'orderItemQuantity' => $item['quantity'],
                'orderItemTotal' => $item['productPrice'] * $item['quantity'],
            ]);
        }

        $cartKey = "cart:$customerID";
        Redis::select(1);
        $cart = json_decode(Redis::get($cartKey), true) ?? [];

        $updatedCart = array_filter($cart, function ($cartItem) use ($validated) {
            return !in_array($cartItem['productID'], array_column($validated['orderItems'], 'productID'));
        });

        Redis::set($cartKey, json_encode(array_values($updatedCart)));

        if ($validated['orderPaymentMethod'] === 'online') {
            $invoiceItems = array_map(function ($item) {
                return [
                    'name' => $item['productName'],
                    'price' => (float) $item['productPrice'],
                    'quantity' => (int) $item['quantity'],
                ];
            }, $validated['orderItems']);

            $invoice = $this->xendit->createInvoice(
                'cliff_order_' . $order->orderID,
                $validated['orderTotal'],
                $customer->customerEmail,
                'Order Invoice for Order ID: cliff_order_' . $order->orderID,
                'PHP',
                $invoiceItems
            );

            $order->update(['orderInvoiceID' => $invoice['id']]);
            $invoiceUrl = $invoice['invoice_url'];

            $message = 'Your order has been placed! <a href="' . $invoiceUrl . '" target="_blank" style="text-decoration: none; color: #1ea1d7;">Click here</a> to complete your online payment.';
        } else {
            $message = 'Your order has been successfully placed! Payment will be collected upon delivery.';
        }

        $orderItems = OrderItem::where('orderID', $order->orderID)
            ->join('product', 'orderItem.productID', '=', 'product.productID')
            ->select('orderItem.*', 'product.productName', 'product.productImage')
            ->get();

        Mail::to($customer->customerEmail)->send(new OrderPlacedMail($order, $customer, $orderItems, $invoiceUrl ?? null));

        return response()->json([
            'message' => $message,
            'status' => 'success',
            'orderNumber' => $order->orderID
        ]);
    }
}
