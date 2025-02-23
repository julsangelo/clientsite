<?php

namespace App\Http\Controllers;

use App\Http\Repositories\Address;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;
use Stripe\PaymentIntent;
use Stripe\Stripe;

class CheckoutController extends Controller
{
    public $address;

    public function __construct(Address $address) {
        $this->address = $address;
    }

    public function paymentIntent (Request $request) {
        Stripe::setApiKey(env("STRIPE_SECRET"));

        $paymentIntent = PaymentIntent::create([
            'amount' => $request->amount * 100, // Amount in cents
            'currency' => 'php',
            'description' => $request->description,
            'payment_method_types' => ["card"],
        ]);

        return response()->json([
            'clientSecret' => $paymentIntent->client_secret,
        ]);
    }

    public function placeOrder (Request $request) {
        $validatedData = $request->validate([
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'phoneNumber' => [
                'required',
                'regex:/^9\d{9}$/',
            ],
            'email' => 'required|email|max:255',
            'address' => 'required|string|max:255',
            'addressInfo' => 'nullable|string|max:255',
            'postalCode' => [
                'required',
                'regex:/^\d{4}$/'
            ],
            'region' => 'required|string|max:255',
            'province' => 'required|string|max:255',
            'municipality' => 'required|string|max:255',
            'barangay' => 'required|string|max:255',
            'total' => 'required|numeric'
        ]);

        $addressInfo = $this->address->getAddress($validatedData['region'], $validatedData['province'], $validatedData['municipality'],$validatedData['barangay']);

        // $address = ;

        // $placeOrder = DB::table('order')->insert([
        //     'first_name' => $validatedData['firstName'],
        //     'last_name' => $validatedData['lastName'],
        //     'phone_number' => $validatedData['phoneNumber'],
        //     'email' => $validatedData['email'],
        //     'address' => $validatedData['address'],
        //     'address_info' => $validatedData['addressInfo'],
        //     'postal_code' => $validatedData['postalCode'],
        //     'region' => $validatedData['region'],
        //     'province' => $validatedData['province'],
        //     'municipality' => $validatedData['municipality'],
        //     'barangay' => $validatedData['barangay'],
        //     'order' => 
        //     'orderDateTime' => now(),
        // ]);

        return $addressInfo;
    }
}
