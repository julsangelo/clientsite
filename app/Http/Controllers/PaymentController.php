<?php

namespace App\Http\Controllers;

use App\Http\Services\XenditService;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    protected $xenditService;

    public function __construct(XenditService $xenditService) {
        $this->xenditService = $xenditService;
    }

    public function createInvoice(Request $request) {   
        $data = $request['data'];

        $externalID = $data['externalID'];
        $amount = $data['amount'];
        $email = $data['email'];
        $desc = $data['desc'];
        $duration = $data['duration'];
        $currency = $data['currency'];
        
        $invoice = $this->xenditService->createInvoice($externalID, $amount, $email, $desc, $duration, $currency);

        return response()->json($invoice);
    }
    
}
