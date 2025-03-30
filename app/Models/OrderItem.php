<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    protected $table = 'orderItem';

    public $timestamps = false;

    public function product() {
        return $this->belongsTo(Product::class, 'productID', 'productID');
    }

    protected $fillable = [
        'orderID',
        'productID',
        'orderItemPrice',
        'orderItemQuantity',
        'orderItemTotal'
    ];
}
