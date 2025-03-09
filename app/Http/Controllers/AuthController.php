<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Session;
use Laravel\Sanctum\PersonalAccessToken;

class AuthController extends Controller
{
    public function signIn (Request $request) {
        $validatedForm = $request->validate([
            'emailUsername' => 'required|string',
            'password' => 'required|string|min:8',
        ]);

        $credentials = [
            'password' => $validatedForm['password']
        ];
    
        if (filter_var($validatedForm['emailUsername'], FILTER_VALIDATE_EMAIL)) {
            $credentials['customerEmail'] = $validatedForm['emailUsername'];
        } else {
            $credentials['customerUsername'] = $validatedForm['emailUsername'];
        }
        
        if (Auth::attempt($credentials)) {
            $customer = Auth::user();
            $token = $customer->createToken('clientAuth')->plainTextToken;

            $customerID = $customer->customerID;
            $cartKey = "cart:$customerID";

            Redis::select(1);

            $redisCart = json_decode(Redis::get($cartKey), true) ?? [];

            $cookieCart = json_decode($request->cookie('cart'), true) ?? [];

            foreach ($cookieCart as $cookieItem) {
                $found = false;
                foreach ($redisCart as &$redisItem) {
                    if ($redisItem['productCode'] === $cookieItem['productCode']) {
                        $redisItem['quantity'] += $cookieItem['quantity'];
                        $found = true;
                        break;
                    }
                }

                if (!$found) {
                    $redisCart[] = $cookieItem;
                }
            }

            // Save merged cart in Redis
            Redis::set($cartKey, json_encode($redisCart));

            // Clear the cart cookie after merging
            Cookie::queue(Cookie::forget('cart'));
            
            return response()->json([
                'message' => 'Login successful',
                'status' => 'success',
                'user' => $customer,
            ])->cookie('auth_token', $token, 60 * 24, '/', null, false, true);
        } else {
            return response()->json([
                'message' => "Email or password is incorrect",
                'status' => 'error'
            ]);
        }
    }

    public function signUp(Request $request) {
        $validatedData = $request->validate([
            'username' => 'required|string|max:15|unique:customer,customerUsername',
            'email' => 'required|email|unique:customer,customerEmail',
            'phoneNumber' => 'required|digits:11',
            'password' => 'required|string|min:8',
        ]);

        $signUp = Customer::create([
            'customerUsername' => $validatedData['username'],
            'customerEmail' => $validatedData['email'],
            'customerContactNo' => $validatedData['phoneNumber'],
            'customerPassword' => Hash::make($validatedData['password']),
        ]);

        if ($signUp) {
            $cart = json_decode(request()->cookie('cart'), true) ?? [];
    
            if (!empty($cart)) {
                Redis::select(1);
                Redis::set('cart:' . $signUp->customerID, json_encode($cart));
            }
    
            Cookie::queue(Cookie::forget('cart'));
    
            return response()->json([
                'message' => 'Sign up successful',
                'status' => 'success',
            ]);
        }
    }

    public function authCheck(Request $request) {
        $token = $request->cookie('auth_token');

        if (!$token) {
            return response()->json(['loggedIn' => false]);
        }
    
        $accessToken = PersonalAccessToken::findToken($token);
    
        if (!$accessToken) {
            return response()->json(['loggedIn' => false]);
        }
    
        $customer = $accessToken->tokenable;
    
        return response()->json([
            'loggedIn' => true,
            'user' => $customer,
        ]);    
    }

    public function signOut(Request $request) {
        $token = $request->cookie('auth_token');
    
        if ($token) {
            $accessToken = PersonalAccessToken::findToken($token);
    
            if ($accessToken) {
                $accessToken->delete();
            }
        }
    
        Cookie::queue(Cookie::forget('auth_token'));
        Session::flush();
    
        return response()->json([
            'message' => 'Logged out', 
            'status' => 'success'
        ]);
    }
}
