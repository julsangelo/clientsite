<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $table = 'order';

    protected $primaryKey = 'orderID';

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

    public function orderDeliveryDetails() {
        return $this->belongsTo(OrderDelivery::class, 'orderDeliveryID', 'orderDeliveryID');
    }

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'customerID');
    }

    protected $fillable = [
        'customerID',
        'orderPaymentStatus',
        'orderFulfillmentStatus',
        'orderStatus',
        'orderDeliveryID',
        'orderPaymentMethod',
        'orderInvoiceID',
        'orderDateTime',
        'orderTotal'
    ];
}
