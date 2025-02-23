<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redis;

class AuthController extends Controller
{
    public function signIn (Request $request) {
        $validatedForm = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string|min:8',
        ]);
        
        if (Auth::attempt(['customerEmail' => $validatedForm['email'], 'password' => $validatedForm['password']])) {
            // $customer = Auth::user();
            // $token = $customer->createToken('authToken')->plainTextToken;

            // Redis::select(5);
            // Redis::setex("sanctum:token:{$customer->customerID}", 86400, $token);
    
            // Cookie::queue(Cookie::make('auth_token', $token, 60 * 24 * 7, null, null, false, true));

            return response()->json([
                'message' => 'Login successful!',
                'status' => 'success',
            ]);
        } else {
            return response()->json([
                'message' => "Email or password is incorrect.",
                'status' => 'error'
            ]);
        }
    }

    public function signUp(Request $request)
    {
        $validatedData = $request->validate([
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'email' => 'required|email|unique:customer,customerEmail',
            'phoneNumber' => 'required|digits:11',
            'password' => 'required|string|min:8',
        ]);

        $signUp = Customer::create([
            'customerFirstName' => $validatedData['firstName'],
            'customerLastName' => $validatedData['lastName'],
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
                'message' => 'Sign up successful! Sign in to your account.',
                'status' => 'success',
            ]);
        }
    }

    // public function authCheck(Request $request)
    // {
    //     $token = $request->cookie('auth_token');

    //     if (!$token) {
    //         return response()->json(['loggedIn' => false]);
    //     }

    //     $customer = Auth::user();
    //     if (!$customer) {
    //         return response()->json(['loggedIn' => false]);
    //     }

    //     Redis::select(5);
    //     $storedToken = Redis::get("sanctum:token:{$customer->customerID}");

    //     if (!$storedToken || $storedToken !== $token) {
    //         return response()->json(['loggedIn' => false]);
    //     }

    //     return response()->json([
    //         'loggedIn' => true,
    //         'user' => $customer,
    //     ]);
    // }

    // public function logout()
    // {
    //     $customer = Auth::user();

    //     if ($customer) {
    //         Redis::select(5);
    //         Redis::del("sanctum:token:{$customer->customerID}");
    //     }

    //     Cookie::queue(Cookie::forget('auth_token'));

    //     return response()->json(['message' => 'Logged out']);
    // }
}
