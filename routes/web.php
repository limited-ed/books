<?php

use App\Http\Controllers\BookController;
use App\Http\Controllers\ReviewsController;
use Illuminate\Support\Facades\Route;

Route::get('{reactRoutes}', function () {
    return view('welcome');
})->where('reactRoutes', '^((?!api).)*$');


Route::get('/api/books', [BookController::class, 'index']);
Route::get('/api/books/{id}', [BookController::class, 'show']);
Route::post('/api/books/{id}/reviews', [ReviewsController::class, 'store']);
