<?php

use Illuminate\Support\Facades\Route;

Route::get('/profile', []);
Route::put('/profile', []);
Route::delete('/account', []);

Route::get('/addresses', []);
Route::post('/addresses', []);
Route::get('/addresses/{address}', []);
Route::put('/addresses/{address}', []);
Route::delete('/addresses/{address}', []);
