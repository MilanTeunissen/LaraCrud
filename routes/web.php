<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Public Routes
Route::get('/products/{product}/view-single', [\App\Http\Controllers\productController::class, 'view'])->name('products.viewSingle');
Route::post('/products/{product}/decrement-stock', [\App\Http\Controllers\productController::class, 'decrementStock'])->name('products.decrementStock');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [\App\Http\Controllers\Auth\RegisteredUserController::class, 'index'])->name('dashboard');
    Route::put('/users/{user}/rank', [\App\Http\Controllers\Auth\RegisteredUserController::class, 'updateRank'])->name('users.updateRank');

    Route::get('/products', [\App\Http\Controllers\productController::class, 'index'])->name('products.index');
    Route::get('/products/create', [\App\Http\Controllers\productController::class, 'create'])->name('products.create');
    Route::post('/products', [\App\Http\Controllers\productController::class, 'store'])->name('products.store');
    Route::get('/products/{product}/edit', [\App\Http\Controllers\productController::class, 'edit'])->name('products.edit');
    Route::put('/products/{product}', [\App\Http\Controllers\productController::class, 'update'])->name('products.update');
    Route::delete('/products/{product}', [\App\Http\Controllers\productController::class, 'destroy'])->name('products.destroy');

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
