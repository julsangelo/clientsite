<?php

namespace App\Http\Services;

use Illuminate\Support\Facades\Http;

class XenditService
{
    protected $apiKey;

    public function __construct() {
        $this->apiKey = env('XENDIT_SECRET_KEY');
    }

    public function createInvoice($externalID, $amount, $email, $desc, $currency, $items) {
        $response = Http::withBasicAuth($this->apiKey, '')
            ->post("https://api.xendit.co/v2/invoices", [
                'external_id' => $externalID,
                'amount' => $amount,
                'payer_email' => $email,
                'description' => $desc,
                'currency' => $currency,
                'items' => array_map(function ($item) {
                    return [
                        'name' => $item['name'],
                        'quantity' => $item['quantity'],
                        'price' => $item['price'],
                        'item' => $item,
                    ];
                }, $items)
            ]);
    
        return $response->json();
    }

    public function getInvoice($invoiceId) {
        $response = Http::withBasicAuth($this->apiKey, '')
            ->get("https://api.xendit.co/v2/invoices/{$invoiceId}");

        if ($response->successful()) {
            $data = $response->json();
            return $data['invoice_url'] ?? null;
        }

        return null;
    }
}
