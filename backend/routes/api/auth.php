<?php

use Illuminate\Support\Facades\Route;

// Public OTP endpoints (rate limited)
Route::post('otp/send', []);
Route::post('otp/verify', []);
