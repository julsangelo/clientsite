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

    public function allProducts () {
        $products = Product::distinct('productCode')->get();

        return [
            'products' => $products
        ];
    }

    public function categorizedProducts ($categoryID) {
        $products = Product::select()->where('productCategory', $categoryID)->distinct('productCode')->get();

        return [
            'products' => $products
        ];
    }

    public function productDetail ($productCode) {
        $product = Product::where('productCode', $productCode)->distinct('productCode')->get();

        return [
            'product' => $product
        ];
    }
}
