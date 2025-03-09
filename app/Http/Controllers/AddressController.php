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

        OrderDelivery::where('customerID', $customerID)
            ->where('deliveryIsDefault', 1)
            ->update(['deliveryIsDefault' => 0]);

        $order = OrderDelivery::create([
            'customerID' => $customerID,
            'deliveryFullName' => $validated['fullName'],
            'deliveryPhoneNo' => $validated['phoneNumber'],
            'deliveryAddress' => $validated['address'],
            'deliveryAddressExtra' => $validated['addressInfo'],
            'deliveryPostalCode' => $validated['postalCode'],
            'deliveryRegion' => $validated['region'],
            'deliveryProvince' => $validated['province'],
            'deliveryCity' => $validated['municipality'],
            'deliveryBarangay' => $validated['barangay'],
            'deliveryIsDefault' => 1
        ]);

        return response()->json([
            'message' => 'Delivery address saved', 
            'status' => 'success',
            'order' => $order->orderDeliveryID
        ]);
    }

    public function getAllAddress(Request $request) {
        $token = $request->cookie('auth_token');
        $accessToken = PersonalAccessToken::findToken($token);
        $customer = $accessToken->tokenable;
        $customerID = $customer->customerID;
    
        $data = $this->address->getAllAddress($customerID);
        $data = json_decode(json_encode($data), true);
    
        foreach ($data['allAddress'] as &$address) {
            $addressInfo = $this->address->getAddressInfo(
                $address['deliveryRegion'],
                $address['deliveryProvince'],
                $address['deliveryCity'],
                $address['deliveryBarangay']
            );

            if ($addressInfo) {
                $addressInfo = json_decode(json_encode($addressInfo), true);
    
                $address['deliveryRegion'] = $addressInfo['region'][0]['regionDescription'];
                $address['deliveryProvince'] = $addressInfo['province'][0]['provinceName'];
                $address['deliveryCity'] = $addressInfo['municipality'][0]['municipalityName'];
                $address['deliveryBarangay'] = $addressInfo['barangay'][0]['barangayName'];
            }
        }
    
        return response()->json($data);
    }

    public function deleteAddress (Request $request) {
        $orderDeliveryID = $request->input('id');
        $token = $request->cookie('auth_token');
        $accessToken = PersonalAccessToken::findToken($token);
        $customer = $accessToken->tokenable;
        $customerID = $customer->customerID;

        OrderDelivery::where('customerID', $customerID)
            ->where('orderDeliveryID', $orderDeliveryID)
            ->delete();

        OrderDelivery::where('customerID', $customerID)
            ->orderByDesc('orderDeliveryID')
            ->first()?->update(['deliveryIsDefault' => 1]);

        return response()->json([
            'message' => 'Delivery address deleted', 
            'status' => 'success',
        ]);
    }

    public function getAddress(Request $request) {
        $token = $request->cookie('auth_token');
        $orderDeliveryID = $request->input('id');
        $accessToken = PersonalAccessToken::findToken($token);
        $customer = $accessToken->tokenable;
        $customerID = $customer->customerID;
    
        $data = $this->address->getAddress($customerID, $orderDeliveryID);
    
        return response()->json($data);
    }

    public function editAddress(Request $request) {
        $orderDeliveryID = $request->input('id');
        $data = $request->input('data');
        $token = $request->cookie('auth_token');
        $accessToken = PersonalAccessToken::findToken($token);
        $customer = $accessToken->tokenable;
        $customerID = $customer->customerID;
    
        $validated = validator($data, [
            'barangay' => 'required|integer',
            'municipality' => 'required|integer',
            'province' => 'required|integer',
            'region' => 'required|integer',
            'postalCode' => 'required|string|max:10',
            'addressInfo' => 'nullable|string|max:255',
            'address' => 'required|string|max:255',
            'phoneNumber' => 'required|string|regex:/^[0-9]{10,15}$/',
            'fullName' => 'required|string|max:255',
            'default' => 'required|in:0,1'
        ])->validate();
    
        $order = OrderDelivery::where('customerID', $customerID)
            ->where('orderDeliveryID', $orderDeliveryID)
            ->first();

        if ($validated['default'] == 1) {
            OrderDelivery::where('customerID', $customerID)
                ->where('deliveryIsDefault', 1)
                ->update(['deliveryIsDefault' => 0]);
        }
    
        $order->update([
            'deliveryFullName' => $validated['fullName'],
            'deliveryPhoneNo' => $validated['phoneNumber'],
            'deliveryAddress' => $validated['address'],
            'deliveryAddressExtra' => $validated['addressInfo'],
            'deliveryPostalCode' => $validated['postalCode'],
            'deliveryRegion' => $validated['region'],
            'deliveryProvince' => $validated['province'],
            'deliveryCity' => $validated['municipality'],
            'deliveryBarangay' => $validated['barangay'],
            'deliveryIsDefault' => $validated['default']
        ]);
    
        return response()->json([
            'message' => 'Delivery address updated', 
            'status' => 'success'
        ]);
    }
}
