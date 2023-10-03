<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends BaseController
{
    //register
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'lastName' => 'required',
            'email' => 'required|email|unique:users,email',
            'phone' => 'required',
            'role' => 'required',
            'password' => 'required',
            'c_password' => 'required|same:password',
        ]);
   
        if($validator->fails()){
            return $this->sendError($validator->errors(),422);       
        }
      
        $user = User::create([
            'name' => $request->name,
            'lastName' => $request->lastName,
            'phone' => $request->phone,
            'role' => $request->role,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);
       
        $token = JWTAuth::fromUser($user);

          return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => JWTAuth::factory()->getTTL() * 60,
            'user' => $user, // Include the user data in the response
        ], 201); 
    }

    //login
    public function login(Request $request)
    {
        // dd($request);
        try {
            $credentials = $request->only('email', 'password');
    
            if (! $token = JWTAuth::attempt($credentials)) {
                // Authentication failed
                throw new \Exception('Invalid email or password.');
            }
    
            return $this->respondWithToken($token);
        } catch (\Exception $e) {
            // Catch and display the error message
            return $this->sendError($e->getMessage(), 401);
        }
    }
 
    //logout 
    public function logout()
    {
        
        Auth::guard('api')->logout();
        return $this->sendResponse('message' ,'Successfully logged out');
    }

    //
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => JWTAuth::factory()->getTTL() * 60,
            'user'=>auth()->user()
        ]);
    }

}
