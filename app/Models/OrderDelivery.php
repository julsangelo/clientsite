<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderDelivery extends Model
{
    protected $table = 'orderDelivery';

    protected $primaryKey = 'orderDeliveryID';

    public $timestamps = false;

    protected $fillable = [
        'customerID',
        'deliveryFullName',
        'deliveryPhoneNo',
        'deliveryAddress',
        'deliveryAddressExtra',
        'deliveryRegion',
        'deliveryProvince',
        'deliveryCity',
        'deliveryBarangay',
        'deliveryIsDefault'
    ];
}
