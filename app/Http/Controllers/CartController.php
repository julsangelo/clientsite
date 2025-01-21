<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;

class CartController extends Controller
{
    public function addToCart (Request $request) {
        $sessionID = session()->id();
        $code = $request->input('code');
        $quantity = $request->input('quantity');
        
        Redis::hset("user:{$sessionID}", $code, $quantity);
    }
}