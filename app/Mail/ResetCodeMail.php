<?php 

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ResetCodeMail extends Mailable
{
    use Queueable, SerializesModels;

    public $resetCode;
    public $user;
    public function __construct($resetCode, $user){
        $this->resetCode = $resetCode;
        $this->user = $user;
    }

    public function build(){
        return $this->subject("Cliff Motorshop - Password Reset Code")
                    ->view('emails.resetcode');
    }
}
