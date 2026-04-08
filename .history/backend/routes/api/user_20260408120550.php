<?php

use Illuminate\Support\Facades\Route;

Route::get('/profile', []);
Route::put('/profile', []);
Route::delete('/account', []);

Route::apiResource('addresses', []);
