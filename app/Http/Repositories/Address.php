<?php

namespace App\Http\Repositories;

use App\Models\Branch;
use App\Models\OrderDelivery;
use App\Models\ProductCategory;
use Illuminate\Support\Facades\DB;

class Address
{
    public function getAddress($region, $province, $municipality, $barangay){
        $region = DB::table('region')
            ->select("regionName")
            ->where("regionID", $region)
            ->get();
        
        $province = DB::table('province')
            ->select("provinceName")   
            ->where("provinceID", $province)
            ->get();
        
        $municipality = DB::table('municipality')
            ->select("municipalityName")
            ->where("municipalityID", $municipality)
            ->get();

        $barangay = DB::table('barangay')
            ->select("barangayName")
            ->where("barangayID", $barangay)
            ->get();
        
        return [
            'region' => $region,
            'province' => $province,
            'municipality' => $municipality,
            'barangay' => $barangay
        ];
    }

    public function getAllAddress($customerID) {
        $allAddress = OrderDelivery::select()
            ->where('customerID', $customerID)
            ->get();

        $defaultAddress = OrderDelivery::select('orderDeliveryID')
        ->where('customerID', $customerID)
        ->where('deliveryIsDefault', '1')
        ->get();

        return [
            'allAddress' => $allAddress,
            'defaultAddress' => $defaultAddress
        ];
    }
}
