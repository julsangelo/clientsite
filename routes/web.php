<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ReferenceController;
use App\Http\Controllers\ShopController;
use Illuminate\Support\Facades\Route;

Route::get('/getReferences', [ReferenceController::class, 'getReferences']);
Route::get('/getProducts', [HomeController::class, 'getProducts']);
Route::get('/getAllProducts', [ShopController::class, 'getAllProducts']);
Route::post('/getCategorizedProducts', [ShopController::class, 'getCategorizedProducts']);
Route::post('/getProductDetail', [ShopController::class, 'getProductDetail']);
Route::post('/addToCart', [CartController::class, 'addToCart']);

Route::view('/{path?}', 'index')->where('path', '.*');
