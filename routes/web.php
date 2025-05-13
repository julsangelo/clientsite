<?php

use App\Http\Controllers\AddressController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\DetailsController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ReferenceController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\ShopController;
use App\Http\Controllers\XenditWebhookController;
use GlennRaya\Xendivel\Xendivel;
use Illuminate\Support\Facades\Route;

Route::get('/getReferences', [ReferenceController::class, 'getReferences']);
Route::get('/getProducts', [HomeController::class, 'getProducts']);
Route::get('/featuredProduct', [HomeController::class, 'featuredProduct']);
Route::get('/getAllProducts', [ShopController::class, 'getAllProducts']);
Route::post('/getCategorizedProducts', [ShopController::class, 'getCategorizedProducts']);
Route::post('/getProductDetail', [ShopController::class, 'getProductDetail']);
Route::post('/addToCart', [CartController::class, 'addToCart']);
Route::get('/getCart', [CartController::class, 'getCart']);
Route::post('/updateItemQuantity', [CartController::class, 'updateItemQuantity']);
Route::post('/paymentIntent', [CheckoutController::class, 'paymentIntent']);
Route::post('/placeOrder', [CheckoutController::class, 'placeOrder']);
Route::post('/signIn', [AuthController::class, 'signIn']);
Route::post('/signUp', [AuthController::class, 'signUp']);
Route::post('/updateProfile', [AuthController::class, 'updateProfile']);
Route::get('/signOut', [AuthController::class, 'signOut']);
Route::get('/authCheck', [AuthController::class, 'authCheck']);
Route::post('/getResetCode', [AuthController::class, 'getResetCode']);
Route::post('/checkResetCode', [AuthController::class, 'checkResetCode']);
Route::post('/resetPassword', [AuthController::class, 'resetPassword']);
Route::get('/getOrders', [DetailsController::class, 'getOrders']);
Route::post('/addAddress', [AddressController::class, 'addAddress']);
Route::get('/getAllAddress', [AddressController::class, 'getAllAddress']);
Route::post('/removeItem', [CartController::class, 'removeItem']);
Route::post('/deleteAddress', [AddressController::class, 'deleteAddress']);
Route::post('/editAddress', [AddressController::class, 'editAddress']);
Route::post('/getAddress', [AddressController::class, 'getAddress']);
Route::post('/webhook/xendit', [XenditWebhookController::class, 'handleWebhook']);
Route::post('/productReview', [ReviewController::class, 'productReview']);
Route::post('/getReview',[ReviewController::class, 'getReview']);
Route::get('/getAllReview',[ReviewController::class, 'getAllReview']);
Route::post('/getProductReview',[ReviewController::class, 'getProductReview']);

Route::view('/{path?}', 'index')->where('path', '.*');
