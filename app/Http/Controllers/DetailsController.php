<?php

namespace App\Http\Controllers;

use App\Http\Repositories\Orders;
use Illuminate\Http\Request;
use Laravel\Sanctum\PersonalAccessToken;

class DetailsController extends Controller
{
    public $orders;
    public function __construct(Orders $orders) {
        $this->orders = $orders;
    }

    public function getOrders (Request $request) {
        $token = $request->cookie('auth_token');
        $accessToken = PersonalAccessToken::findToken($token);
        $customer = $accessToken->tokenable;
        $customerID = $customer->customerID;

        $data = $this->orders->getOrders($customerID);

        return response()->json($data);
    }
}
