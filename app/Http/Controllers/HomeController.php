<?php

namespace App\Http\Controllers;

use App\Http\Repositories\Products;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public $products;
    public function __construct(Products $products) {
        $this->products = $products;
    }

    public function getProducts () {
        $data = $this->products->products();

        return response()->json($data);
    }
}
