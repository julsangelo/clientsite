<?php

namespace App\Http\Repositories;

use App\Models\Product;

class Products
{
    public function products () {
        $allProducts = Product::distinct('productCode')->get();
        $categorized = Product::distinct('productCode')->get()->groupBy('productCategory');

        return [
            'allProducts' => $allProducts,
            'categorized' => $categorized,
        ];
    }
}
