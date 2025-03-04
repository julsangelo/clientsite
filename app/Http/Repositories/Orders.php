<?php

namespace App\Http\Repositories;

use App\Models\Order;
use Illuminate\Support\Facades\DB;

class Orders
{
    public function getOrders ($customerID) {
        $orders = Order::where('customerID', $customerID)
            ->with(['orderItems.product'])
            ->get()
            ->map(function ($order) {
                return [
                    'orderID' => $order->orderID,
                    'orderDateTime' => $order->orderDateTime,
                    'orderTotal' => $order->orderTotal,
                    'orderItems' => $order->orderItems->map(function ($item) {
                        return [
                            'orderItemQuantity' => $item->orderItemQuantity,
                            'orderItemTotal' => $item->orderItemTotal,
                            'product' => [
                                'productName' => $item->product->productName ?? null,
                                'productImage' => $item->product->productImage ?? null,
                                'productPrice' => $item->product->productPrice ?? null,
                            ],
                        ];
                    }),
                    'paymentStatus' => $order->paymentStatus()->pluck('orderPaymentStatusName')->first(),
                    'fulfillmentStatus' => $order->fulfillmentStatus()->pluck('orderFulfillmentStatusName')->first(),
                    'orderStatus' => $order->orderStatus()->pluck('orderStatusName')->first(),
                ];
            });

        return [
            'order' => $orders,
        ];
    }
}
