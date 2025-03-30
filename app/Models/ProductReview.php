<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductReview extends Model
{
    protected $table = 'productReview';

    protected $primaryKey = 'reviewID';

    public $timestamps = false;

    protected $fillable = [
        'customerID',
        'orderID',
        'productID',
        'reviewRating',
        'reviewFeedback',
        'reviewDate'
    ];
}
