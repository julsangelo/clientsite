<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Customer extends Authenticatable
{
    use HasApiTokens;
    protected $table = 'customer';

    protected $primaryKey = "customerID";

    public $timestamps = false;

    protected $fillable = [
        'customerFirstName',
        'customerLastName',
        'customerEmail',
        'customerContactNo',
        'customerPassword',
    ];

    protected $hidden = [
        'customerPassword',
    ];

    public function getAuthPassword()
    {
        return $this->customerPassword;
    }
}