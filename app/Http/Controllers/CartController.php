<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Redis;
use Laravel\Sanctum\PersonalAccessToken;

class CartController extends Controller
{
    public function addToCart(Request $request) {
        $code = $request->input('code');
        $quantity = $request->input('quantity');
    
        if (Auth::check()) {
            $customerID = Auth::id();
            $cartKey = "cart:$customerID";
            
            Redis::select(1);
            $cart = json_decode(Redis::get($cartKey), true) ?? [];
    
            $found = false;
            foreach ($cart as &$item) {
                if ($item['productCode'] === $code) {
                    $item['quantity'] += $quantity;
                    $found = true;
                    break;
                }
            }
    
            if (!$found) {
                $cart[] = ['productCode' => $code, 'quantity' => $quantity];
            }
    
            Redis::set($cartKey, json_encode($cart));
    
        } else {
            $cart = json_decode($request->cookie('cart'), true) ?? [];
    
            $found = false;
            foreach ($cart as &$item) {
                if ($item['productCode'] === $code) {
                    $item['quantity'] += $quantity;
                    $found = true;
                    break;
                }
            }
    
            if (!$found) {
                $cart[] = ['productCode' => $code, 'quantity' => $quantity];
            }
    
            Cookie::queue('cart', json_encode($cart), 525600);
        }
    
        return response()->json([
            'status' => 'success',
            'message' => 'Added to cart.'
        ]);
    }

    public function getCart(Request $request) {
        $token = $request->cookie('auth_token');

        if ($token) {
            $accessToken = PersonalAccessToken::findToken($token);

            if ($accessToken) {
                $customer = $accessToken->tokenable;
                $customerID = $customer->customerID;

                Redis::select(1);
                $cartKey = "cart:$customerID";
                $cart = json_decode(Redis::get($cartKey), true) ?? [];
            } else {
                $cart = json_decode($request->cookie('cart'), true) ?? [];
            }
        } else {
            $cart = json_decode($request->cookie('cart'), true) ?? [];
        }

        $cartItems = array_map(function ($item) {
            $product = Product::where('productCode', $item['productCode'])
                ->select('productCode', 'productName', 'productImage', 'productPrice')
                ->first();

            return [
                'productCode' => $item['productCode'],
                'quantity' => $item['quantity'],
                'productName' => $product ? $product->productName : null,
                'productImage' => $product ? $product->productImage : null,
                'productPrice' => $product ? $product->productPrice : null
            ];
        }, $cart);

        return response()->json($cartItems);
    }

    public function updateItemQuantity(Request $request) {
        $code = $request->input('code');
        $action = $request->input('action');
        $token = $request->cookie('auth_token');
        

        if ($token) {
            $accessToken = PersonalAccessToken::findToken($token);
            $customer = $accessToken->tokenable;
            $customerID = $customer->customerID;

            Redis::select(1);
            $cartKey = "cart:$customerID";
            $cart = json_decode(Redis::get($cartKey), true) ?? [];
        } else {
            $cart = json_decode($request->cookie('cart'), true) ?? [];
        }
    
        foreach ($cart as &$item) {
            if ($item['productCode'] === $code) {
                if ($action === 'increment') {
                    $item['quantity'] += 1;
                } elseif ($action === 'decrement') {
                    $item['quantity'] -= 1;
                    if ($item['quantity'] <= 0) {
                        $cart = array_filter($cart, fn($i) => $i['productCode'] !== $code);
                    }
                }
                break;
            }
        }
    
        if ($token) {
            Redis::set($cartKey, json_encode(array_values($cart)));
        } else {
            Cookie::queue('cart', json_encode(array_values($cart)), 525600);
        }
    }
}