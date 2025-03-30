<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class OrderPaidMail extends Mailable
{
    use Queueable, SerializesModels;

    public $order;
    public $customer;
    public $items;
    public $payment;
    public function __construct($order, $customer, $items, $payment)
    {
        $this->order = $order;
        $this->customer = $customer;
        $this->items = $items;
        $this->payment = $payment;
    }

    public function build()
    {
        return $this->subject("Cliff Motorshop - Order #{$this->order->orderID} Paid")
                    ->view('emails.orderpaid');
    }
}
