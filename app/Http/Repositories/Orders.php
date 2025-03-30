<?php

namespace App\Http\Repositories;

use App\Http\Services\XenditService;
use App\Models\Order;

class Orders
{
    public $address;
    public $xendit;

    public function __construct(Address $address, XenditService $xendit) {
        $this->address = $address;
        $this->xendit = $xendit;
    }

    public function getOrders($customerID) {
        $orders = Order::where('customerID', $customerID)
            ->with(['orderItems.product', 'orderDeliveryDetails'])
            ->orderByDesc('orderID')
            ->get()
            ->map(function ($order) {
                $deliveryDetails = $order->orderDeliveryDetails ? clone $order->orderDeliveryDetails : null;
    
                if ($deliveryDetails) {
                    $addressInfo = $this->address->getAddressInfo(
                        $deliveryDetails->deliveryRegion,
                        $deliveryDetails->deliveryProvince,
                        $deliveryDetails->deliveryCity,
                        $deliveryDetails->deliveryBarangay
                    );
    
                    $addressInfo = json_decode(json_encode($addressInfo), true);
    
                    $deliveryDetails->deliveryRegion = $addressInfo['region'][0]['regionDescription'];
                    $deliveryDetails->deliveryProvince = $addressInfo['province'][0]['provinceName'];
                    $deliveryDetails->deliveryCity = $addressInfo['municipality'][0]['municipalityName'];
                    $deliveryDetails->deliveryBarangay = $addressInfo['barangay'][0]['barangayName'];
                }

                $paymentLink = $order->orderInvoiceID ? $this->xendit->getInvoice($order->orderInvoiceID) : null;
    
                return [
                    'orderID' => $order->orderID,
                    'orderPaymentMethod' => $order->orderPaymentMethod,
                    'orderDateTime' => $order->orderDateTime,
                    'orderTotal' => $order->orderTotal,
                    'orderDeliveryDetails' => $deliveryDetails,
                    'orderItems' => $order->orderItems->map(function ($item) use ($order) {
                        return [
                            'orderItemQuantity' => $item->orderItemQuantity,
                            'orderItemTotal' => $item->orderItemTotal,
                            'orderItemPrice' => $item->orderItemPrice,
                            'product' => [
                                'productID' => $item->product->productID,
                                'productName' => $item->product->productName,
                                'productImage' => $item->product->productImage,
                                'productPrice' => $item->product->productPrice,
                            ],
                        ];
                    }),
                    'paymentStatus' => $order->paymentStatus()->pluck('orderPaymentStatusName')->first(),
                    'fulfillmentStatus' => $order->fulfillmentStatus()->pluck('orderFulfillmentStatusName')->first(),
                    'orderStatus' => $order->orderStatus()->pluck('orderStatusName')->first(),
                    'paymentLink' => $paymentLink,
                ];
            });
    
        return [
            'order' => $orders,
        ];
    }    
}
