<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $table = 'order';

    public $timestamps = false;

    public function orderItems() {
        return $this->hasMany(OrderItem::class, 'orderID', 'orderID');
    }

    public function paymentStatus()
    {
        return $this->belongsTo(OrderPaymentStatus::class, 'orderPaymentStatus', 'orderPaymentStatusID');
    }

    public function fulfillmentStatus()
    {
        return $this->belongsTo(OrderFulfillmentStatus::class, 'orderFulfillmentStatus', 'orderFulfillmentStatusID');
    }

    public function orderStatus()
    {
        return $this->belongsTo(OrderStatus::class, 'orderStatus', 'orderStatusID');
    }
}
