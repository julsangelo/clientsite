<?php

namespace App\Http\Services;

use Illuminate\Support\Facades\Http;

class XenditService
{
    protected $apiKey;

    public function __construct()
    {
        $this->apiKey = env('XENDIT_SECRET_KEY');
    }

    public function createInvoice($externalID, $amount, $email, $desc, $duration, $currency)
    {
        $response = Http::withBasicAuth($this->apiKey, '')
            ->post("https://api.xendit.co/v2/invoices", [
                'external_id' => $externalID,
                'amount' => $amount,
                'payer_email' => $email,
                'description' => $desc,
                'invoice_duration' => $duration,
                'currency' => $currency,
            ]);

        return $response->json();
    }
}
