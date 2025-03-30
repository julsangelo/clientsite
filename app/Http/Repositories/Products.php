<?php

namespace App\Http\Repositories;

use App\Models\Product;

class Products
{
    public function products(){
        $allProducts = Product::select('productID', 'branchID', 'productCode', 'productName', 'productCategory', 'productImage', 'productStockQuantity', 'productPrice')
            ->with([
                'reviews' => function ($query) {
                    $query->select('productID')
                        ->selectRaw('AVG(reviewRating) as reviewRating, COUNT(*) as reviewCount')
                        ->groupBy('productID');
                }
            ])
            ->distinct('productCode')
            ->get();

        $categorized = $allProducts->groupBy('productCategory');

        return [
            'allProducts' => $allProducts,
            'categorized' => $categorized,
        ];
    }

    public function allProducts () {
        $products = Product::select('productID', 'branchID', 'productCode', 'productName', 'productCategory', 'productImage', 'productStockQuantity', 'productPrice')
        ->with([
            'reviews' => function ($query) {
                $query->select('productID')
                    ->selectRaw('AVG(reviewRating) as reviewRating, COUNT(*) as reviewCount')
                    ->groupBy('productID');
            }
        ])
        ->distinct('productCode')
        ->get();

        return [
            'products' => $products
        ];
    }

    public function categorizedProducts ($categoryID) {
        $products = Product::select('productID', 'branchID', 'productCode', 'productName', 'productCategory', 'productImage', 'productStockQuantity', 'productPrice')->where('productCategory', $categoryID)->with([
            'reviews' => function ($query) {
                $query->select('productID')
                    ->selectRaw('AVG(reviewRating) as reviewRating, COUNT(*) as reviewCount')
                    ->groupBy('productID');
            }
        ])
        ->distinct('productCode')
        ->get();;

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
