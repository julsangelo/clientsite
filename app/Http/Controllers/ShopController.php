<?php

namespace App\Http\Controllers;

use App\Http\Repositories\Products;
use Illuminate\Http\Request;

class ShopController extends Controller
{
    public $products;
    public function __construct(Products $products) {
        $this->products = $products;
    }

    public function getAllProducts () {
        $data = $this->products->allProducts();

        return response()->json($data);
    }

    public function getCategorizedProducts(Request $request) {
        $categoryID = $request->input('categoryID');
        $data = $this->products->categorizedProducts($categoryID);

        return response()->json($data);
    }

    public function getProductDetail (Request $request) {
        $productCode = $request->input('productCode');
        $data = $this->products->productDetail($productCode);

        return response()->json($data);
    }
}
