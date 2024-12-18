<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\ReferenceController;
use Illuminate\Support\Facades\Route;

Route::get('/getReferences', [ReferenceController::class, 'getReferences']);
Route::get('/getProducts', [HomeController::class, 'getProducts']);

Route::view('/{path?}', 'index')->where('path', '.*');
