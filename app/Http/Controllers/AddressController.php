<?php

namespace App\Http\Controllers;

use App\Http\Repositories\Address;
use App\Models\OrderDelivery;
use Illuminate\Http\Request;
use Laravel\Sanctum\PersonalAccessToken;

class AddressController extends Controller
{
    public $address;

    public function __construct(Address $address) {
        $this->address = $address;
    }
    public function addAddress (Request $request) {
        $token = $request->cookie('auth_token');
        $accessToken = PersonalAccessToken::findToken($token);
        $customer = $accessToken->tokenable;
        $customerID = $customer->customerID;

        $validated = $request->validate([
            'barangay' => 'required|integer',
            'municipality' => 'required|integer',
            'province' => 'required|integer',
            'region' => 'required|integer',
            'postalCode' => 'required|string|max:10',
            'addressInfo' => 'nullable|string|max:255',
            'address' => 'required|string|max:255',
            'phoneNumber' => 'required|string|regex:/^[0-9]{10,15}$/',
            'fullName' => 'required|string|max:255',
        ]);

        $addressInfo = $this->address->getAddress($validated['region'], $validated['province'], $validated['municipality'],$validated['barangay']);

        $addressInfo = json_decode(json_encode($addressInfo), true);

        OrderDelivery::where('customerID', $customerID)
            ->where('deliveryIsDefault', true)
            ->update(['deliveryIsDefault' => false]);

        $order = OrderDelivery::create([
            'customerID' => $customerID,
            'deliveryFullName' => $validated['fullName'],
            'deliveryPhoneNo' => $validated['phoneNumber'],
            'deliveryAddress' => $validated['address'],
            'deliveryAddressExtra' => $validated['addressInfo'],
            'deliveryRegion' => $addressInfo['region'][0]['regionName'],
            'deliveryProvince' => $addressInfo['province'][0]['provinceName'],
            'deliveryCity' => $addressInfo['municipality'][0]['municipalityName'],
            'deliveryBarangay' => $addressInfo['barangay'][0]['barangayName'],
            'deliveryIsDefault' => 1
        ]);

        return response()->json([
            'message' => 'Delivery address saved!', 
            'status' => 'success',
            'order' => $order->orderDeliveryID
        ]);
    }

    public function getAddress(Request $request) {
        $token = $request->cookie('auth_token');
        $accessToken = PersonalAccessToken::findToken($token);
        $customer = $accessToken->tokenable;
        $customerID = $customer->customerID;

        $data = $this->address->getAllAddress($customerID);

        return response()->json($data);
    }
}
