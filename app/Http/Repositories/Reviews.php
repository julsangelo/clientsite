<?php

namespace App\Http\Repositories;

use App\Models\ProductReview;

class Reviews
{
    public function getReview ($customerID) {
        $reviews = ProductReview::where('customerID', $customerID)->get();

        return [
            'reviews' => $reviews
        ];
    }

    public function getAllReview () {
        $allReviews = ProductReview::select()->get();

        return [
            'allReviews' => $allReviews
        ];
    }

    public function getProductReivew ($productID) {
        $productReview = ProductReview::where('productID', $productID)
            ->latest('reviewDate')
            ->join('customer', 'customer.customerID', '=', 'productReview.customerID')
            ->select('productReview.*', 'customer.customerUsername')   
            ->get()
            ->unique('customerID');

        return [
            'productReview' => $productReview
        ];
    }
}
