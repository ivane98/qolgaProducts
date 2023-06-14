<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;

Route::get('/products',[App\Http\Controllers\ProductController::class, 'index']);

Route::get('/products/{id}/show',[App\Http\Controllers\ProductController::class, 'show']);

Route::post('/products/save',[App\Http\Controllers\ProductController::class, 'store']);

Route::put('/products/update/{id}',[App\Http\Controllers\ProductController::class, 'update']);

Route::delete('/products/delete/{id}',[App\Http\Controllers\ProductController::class, 'destroy']);


Route::get('/categories',[App\Http\Controllers\CategoryController::class, 'index']);

Route::post('/categories/save',[App\Http\Controllers\CategoryController::class, 'store']);

Route::put('/categories/update/{id}',[App\Http\Controllers\CategoryController::class, 'update']);

Route::delete('/categories/delete/{id}',[App\Http\Controllers\CategoryController::class, 'destroy']);


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
