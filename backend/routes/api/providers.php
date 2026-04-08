<?php

use Illuminate\Support\Facades\Route;

Route::prefix('availabilities')->group(function () {
    Route::post('/', []);
    Route::get('/', []);
    Route::put('/{id}', []);
    Route::delete('/{id}', []);
});
