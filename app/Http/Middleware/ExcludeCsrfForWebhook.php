<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class ExcludeCsrfForWebhook
{
    public function handle(Request $request, Closure $next)
    {
        // Disable CSRF for the webhook route
        if ($request->is('xendit-webhook')) {
            return $next($request);
        }

        // Apply CSRF for all other routes
        return app(\Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class)->handle($request, $next);
    }
}
