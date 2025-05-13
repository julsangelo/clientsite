<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class ExcludeCsrfForWebhook
{
    public function handle(Request $request, Closure $next)
    {
        if ($request->is('xendit-webhook')) {
            return $next($request);
        }

        return app(\Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class)->handle($request, $next);
    }
}
