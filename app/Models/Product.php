<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $table = 'product';

    protected $primaryKey = 'productID';

    public function reviews()
{
    return $this->hasOne(ProductReview::class, 'productID', 'productID')
        ->select('productID')
        ->selectRaw('AVG(reviewRating) as reviewRating, COUNT(*) as reviewCount')
        ->groupBy('productID');
}

}
