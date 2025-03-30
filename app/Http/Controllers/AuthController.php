<?php

namespace App\Http\Controllers;

use App\Mail\ResetCodeMail;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Validator;
use Laravel\Sanctum\PersonalAccessToken;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function signIn (Request $request) {
        $validatedForm = $request->validate([
            'emailUsername' => 'required|string',
            'password' => 'required|string|min:8',
        ]);

        $credentials = [
            'password' => $validatedForm['password']
        ];
    
        if (filter_var($validatedForm['emailUsername'], FILTER_VALIDATE_EMAIL)) {
            $credentials['customerEmail'] = $validatedForm['emailUsername'];
        } else {
            $credentials['customerUsername'] = $validatedForm['emailUsername'];
        }
        
        if (Auth::attempt($credentials)) {
            $customer = Auth::user();
            $token = $customer->createToken('clientAuth')->plainTextToken;

            $customerID = $customer->customerID;
            $cartKey = "cart:$customerID";

            Redis::select(1);

            $redisCart = json_decode(Redis::get($cartKey), true) ?? [];

            $cookieCart = json_decode($request->cookie('cart'), true) ?? [];

            foreach ($cookieCart as $cookieItem) {
                $found = false;
                foreach ($redisCart as &$redisItem) {
                    if ($redisItem['productCode'] === $cookieItem['productCode']) {
                        $redisItem['quantity'] += $cookieItem['quantity'];
                        $found = true;
                        break;
                    }
                }

                if (!$found) {
                    $redisCart[] = $cookieItem;
                }
            }

            Redis::set($cartKey, json_encode($redisCart));

            Cookie::queue(Cookie::forget('cart'));
            
            return response()->json([
                'message' => 'Login successful',
                'status' => 'success',
                'user' => $customer,
            ])->cookie('auth_token', $token, 60 * 24, '/', null, false, true)
            ->cookie('is_auth', true, 60 * 24, '/', null, false, false);
        } else {
            return response()->json([
                'message' => "Email or password is incorrect",
                'status' => 'error'
            ]);
        }
    }

    public function signUp(Request $request) {
        $validatedData = $request->validate([
            'username' => 'required|string|max:15|unique:customer,customerUsername',
            'email' => 'required|email|unique:customer,customerEmail',
            'phoneNumber' => 'required|digits:11',
            'password' => 'required|string|min:8',
        ]);

        $signUp = Customer::create([
            'customerUsername' => $validatedData['username'],
            'customerEmail' => $validatedData['email'],
            'customerContactNo' => $validatedData['phoneNumber'],
            'customerPassword' => Hash::make($validatedData['password']),
        ]);

        if ($signUp) {
            $cart = json_decode(request()->cookie('cart'), true) ?? [];
    
            if (!empty($cart)) {
                Redis::select(1);
                Redis::set('cart:' . $signUp->customerID, json_encode($cart));
            }
    
            Cookie::queue(Cookie::forget('cart'));
    
            return response()->json([
                'message' => 'Sign up successful',
                'status' => 'success',
            ]);
        }
    }

    public function authCheck(Request $request) {
        $token = $request->cookie('auth_token');

        if (!$token) {
            return response()->json([
                'loggedIn' => false,
                'csrfToken' => csrf_token()
            ]);
        }
    
        $accessToken = PersonalAccessToken::findToken($token);
    
        if (!$accessToken) {
            return response()->json([
                'loggedIn' => false,
                'csrfToken' => csrf_token()
            ]);
        }
    
        $customer = $accessToken->tokenable;
    
        return response()->json([
            'loggedIn' => true,
            'user' => $customer,
            'csrfToken' => csrf_token()
        ]);    
    }

    public function signOut(Request $request) {
        $token = $request->cookie('auth_token');
    
        if ($token) {
            $accessToken = PersonalAccessToken::findToken($token);
    
            if ($accessToken) {
                $accessToken->delete();
            }
        }
    
        Cookie::queue(Cookie::forget('auth_token'));
        Cookie::queue(Cookie::forget('is_auth'));
        Session::flush();
    
        return response()->json([
            'message' => 'Logged out', 
            'status' => 'success'
        ]);
    }

    public function getResetCode(Request $request) {
        $request->validate([
            'emailUsername' => 'required',
        ]);
    
        $user = DB::table('customer')
            ->where('customerUsername', $request->emailUsername)
            ->orWhere('customerEmail', $request->emailUsername)
            ->first();

        if (!$user) {
            return response()->json([
                'message' => "Account doesn't exist", 
                'status' => 'error'
            ]);
        }

        $resetCode = random_int(100000, 999999);
        $resetToken = Str::random(64);

        DB::table('passwordResetCode')->updateOrInsert(
            ['customerEmail' => $user->customerEmail],
            ['resetCode' => $resetCode, 
            'resetToken' => hash('sha256', $resetToken),
            'createdAt' => now()]
        );

        Mail::to($user->customerEmail)->send(new ResetCodeMail($resetCode, $user));

        return response()->json([
            'message' => 'Reset code sent to your email', 
            'status' => 'success'
        ]);
    }

    public function checkResetCode(Request $request) {
        $request->validate([
            'otp' => 'required|digits:6',
        ]);
    
        $resetRecord = DB::table('passwordResetCode')
            ->where('resetCode', $request->otp)
            ->first();
    
        if (!$resetRecord) {
            return response()->json([
                'message' => 'Invalid reset code',
                'status' => 'error'
            ]);
        }
        
        $resetToken = Str::random(64);

        DB::table('passwordResetCode')
            ->where('customerEmail', $resetRecord->customerEmail)
            ->update(['resetToken' => hash('sha256', $resetToken)]);
    
        return response()->json([
            'message' => 'Enter your new password',
            'status' => 'success',
            'token' => $resetToken
        ]);
    }

    public function resetPassword(Request $request) {
        $data = $request->input('data');

        $resetRecord = DB::table('passwordResetCode')
            ->where('resetToken', hash('sha256', $request->token))
            ->first();

        DB::table('customer')
            ->where('customerEmail', $resetRecord->customerEmail)
            ->update(['customerPassword' => Hash::make($data['password'])]);

        DB::table('passwordResetCode')
            ->where('customerEmail', $resetRecord->customerEmail)
            ->delete();
        
        return response()->json([
            'message' => 'Password has been reset successfully',
            'status' => 'success'
        ]);
    }

    public function updateProfile(Request $request){
        $data = $request->input('data');
        $token = $request->cookie('auth_token');
        $accessToken = PersonalAccessToken::findToken($token);
        $customer = $accessToken->tokenable;
        $customerID = $customer->customerID;
        $validatedData = validator($data, [
            'customerUsername' => 'required|string|max:15|unique:customer,customerUsername,' . $customerID . ',customerID',
            'customerEmail' => 'required|email|unique:customer,customerEmail,' . $customerID . ',customerID',
            'customerContactNo' => 'required|regex:/^09\d{9}$/',
            'currentPassword' => 'nullable|required_with:newPassword',
            'newPassword' => 'nullable|required_with:currentPassword|min:8',
        ])->validate();

        if (! $customer) {
            return response()->json([
                'message' => 'Unauthorized',
                'status' => 'error'
            ]);
        }

        if (!empty($validatedData['newPassword']) && !Hash::check($validatedData['currentPassword'], $customer->password)) {
            return response()->json([
                'message' => 'Current password is incorrect', 
                'status' => 'error'
            ]);
        }

        $customer->update([
            'customerUsername' => $validatedData['customerUsername'],
            'customerEmail' => $validatedData['customerEmail'],
            'customerContactNo' => $validatedData['customerContactNo'],
            'customerPassword' => !empty($validatedData['newPassword']) ? Hash::make($validatedData['newPassword']) : $customer->customerPassword,
        ]);

        return response()->json([
            'message' => 'Profile updated successfully',
            'status' => 'success',
        ]);
    }
}
