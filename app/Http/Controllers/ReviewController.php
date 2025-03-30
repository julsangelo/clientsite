<?php

namespace App\Http\Controllers;

use App\Http\Repositories\Reviews;
use App\Models\ProductReview;
use Illuminate\Http\Request;
use Laravel\Sanctum\PersonalAccessToken;

class ReviewController extends Controller
{
    public $review;

    public function __construct(Reviews $review) {
        $this->review = $review;
    }

    public function productReview (Request $request) {
        $token = $request->cookie('auth_token');
        $accessToken = PersonalAccessToken::findToken($token);
        $customer = $accessToken->tokenable;
        $customerID = $customer->customerID;

        ProductReview::create([
            'customerID' => $customerID,
            'orderID' => $request->data['orderID'],
            'productID' => $request->data['productID'],
            'reviewRating' => $request->data['rating'],
            'reviewFeedback' => $request->data['feedback'],
            'reviewDate' => now(),
        ]);

        return response()->json([
            'message' => 'Review submitted successfully',
            'status' => 'success'
        ]);
    }

    public function getReview (Request $request) {
        $token = $request->cookie('auth_token');
        $accessToken = PersonalAccessToken::findToken($token);
        $customer = $accessToken->tokenable;
        $customerID = $customer->customerID;

        $data = $this->review->getReview($customerID);

        return response()->json($data);
    }

    public function getAllReview () {
        $data = $this->review->getAllReview();

        return response()->json($data);
    }

    public function getProductReview (Request $request) {
        $data = $this->review->getProductReivew($request->productID);

        return response()->json($data);
    }
}
