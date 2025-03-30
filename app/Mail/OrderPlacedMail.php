<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class OrderPlacedMail extends Mailable
{
    use Queueable, SerializesModels;

    public $order;
    public $customer;
    public $orderItems;
    public $invoiceUrl;

    public function __construct($order, $customer, $orderItems, $invoiceUrl = null)
    {
        $this->order = $order;
        $this->customer = $customer;
        $this->orderItems = $orderItems;
        $this->invoiceUrl = $invoiceUrl;
    }

    public function build()
    {
        return $this->subject("Cliff Motorshop - Order #{$this->order->orderID} Confirmation")
                    ->view('emails.orderplaced');
    }
}