<?php

use Illuminate\Support\Facades\Route;

// Auth
Route::prefix('auth')->group(function () {
    require __DIR__ . '/auth.php';
});

// Services
Route::prefix('services')->group(function () {
    require __DIR__ . '/services.php';
});

// Bookings
Route::prefix('bookings')->group(function () {
    require __DIR__ . '/bookings.php';
});

// Payments
Route::prefix('payments')->group(function () {
    require __DIR__ . '/payments.php';
});

// Wallet
Route::prefix('wallet')->group(function () {
    require __DIR__ . '/wallet.php';
});

// Providers
Route::prefix('providers')->group(function () {
    require __DIR__ . '/providers.php';
});

// Notifications
Route::prefix('notifications')->group(function () {
    require __DIR__ . '/notifications.php';
});

// User profile & addresses
Route::prefix('user')->group(function () {
    require __DIR__ . '/user.php';
});
