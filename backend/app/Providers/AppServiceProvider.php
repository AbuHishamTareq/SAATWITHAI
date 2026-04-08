<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->configureRateLimiting();
    }

    /**
     * Configure rate limiting for API endpoints.
     */
    protected function configureRateLimiting(): void
    {
        // General API rate limit: 60 requests per minute
        RateLimiter::for('api', function (Request $request) {
            return Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());
        });

        // OTP send: 5 requests per 15 minutes per phone number
        RateLimiter::for('otp-send', function (Request $request) {
            return Limit::perMinutes(15, 5)->by($request->input('phone') ?: $request->ip());
        });

        // OTP verify: 10 attempts per 15 minutes per phone number
        RateLimiter::for('otp-verify', function (Request $request) {
            return Limit::perMinutes(15, 10)->by($request->input('phone') ?: $request->ip());
        });

        // Login attempts: 5 per minute
        RateLimiter::for('login', function (Request $request) {
            return Limit::perMinute(5)->by($request->input('phone') ?: $request->ip());
        });
    }
}
