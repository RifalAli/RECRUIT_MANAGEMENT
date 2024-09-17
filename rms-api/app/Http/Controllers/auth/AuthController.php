<?php

namespace App\Http\Controllers\auth;

use App\Http\Controllers\Controller;
use App\Jobs\PasswordResetJob;
use App\Jobs\VerifyUserJobs;
use App\Mail\VerifyUserMail;
use App\Models\Company;
use App\Models\Profile;
use App\Models\User;
use App\Traits\ApiResponseWithHttpStatus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use JWTAuth;

use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{
    use ApiResponseWithHttpStatus;
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['login', 'register', 'accountVerify', 'forgotPassword', 'updatePassword']]);
    }
    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request){
    	$validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ], [
            'password.min' => 'Password min'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->first(), 200);
            // return response()->json($validator->errors(), 422);
        }

        $userByEmail = User::where([['email', $request['email']]])->first();
        if (!$userByEmail) {
            return response()->json('Invalid email', 200);
        }
        
        if ($userByEmail['isBanned'] == 1) {
            return response()->json('Banned', 200);
        }

        if (! $token = JWTAuth::attempt($validator->validated())) {
            // return response()->json(['error' => 'Unauthorized'], 401);
            return response()->json('Unauthorized', 200);
        }

        return $this->createNewToken($token);

    	// $validator = Validator::make($request->all(), [
        //     'email' => 'required|email',
        //     'password' => 'required|string|min:6',
        // ]);
        // if ($validator->fails()) {
        //     return response()->json($validator->errors(), 422);
        // }
        // if (! $token = JWTAuth::attempt($validator->validated())) {
        //     // return response()->json(['error' => 'Unauthorized'], 401);
        //     return response()->json('Unauthorized', 200);
        // }
        // return $this->createNewToken($token);
    }
    /**
     * Register a User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request) {
        // $validator = Validator::make($request->all(), [
        //     'name' => 'required|string|between:2,100',
        //     'email' => 'required|string|email|max:100|unique:users',
        //     'password' => 'required|string|confirmed|min:6',
        // ]);
        // if($validator->fails()){
        //     return response()->json($validator->errors()->toJson(), 400);
        // }
        // $user = User::create(array_merge(
        //             $validator->validated(),
        //             ['password' => bcrypt($request->password),'slug'=>Str::random(15),'token'=>Str::random(20),'status'=>'active', 'image'=>'http://localhost:8000/files/users/default.png']
        //         ));
        // if ($user) {
        //     $details = ['name'=>$user->name, 'email'=>$user->email, 'hashEmail'=>Crypt::encryptString($user->email), 'token'=>$user->token];
        //     dispatch(new VerifyUserJobs($details));
        // }
        // return $this->apiResponse('User succesfully registered',$data=$user,Response::HTTP_OK, true);

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|between:2,100',
            'email' => 'required|string|email|max:100|unique:users',
            'password' => 'required|string|min:6',
        ], [
            'email.unique' => 'Email taken',
            'name.between' => 'Name between', 
            'password.min' => 'Password min',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->first(), 200);
        }

        if (!($request['password'] === $request['confirmPassword'])) {
            return $this->apiResponse('Password and Confirm Password are not same', null, Response::HTTP_BAD_REQUEST, false);
        }

        $user = User::create(array_merge(
                    $validator->validated(),
                    ['password' => bcrypt($request->password),
                    'slug'=>Str::random(15),
                    'token'=>Str::random(20),
                    'status'=>'active', 
                    'otp'=>random_int(100000, 999999),
                    'image'=>'http://localhost:8000/files/users/default.png',
                    'role'=>$request['role']]
                ));
        if ($user) {
            $details = ['name'=>$user->name, 'email'=>$user->email, 'hashEmail'=>Crypt::encryptString($user->email), 'token'=>$user->token, 'otp'=>$user->otp];
            VerifyUserJobs::dispatchSync($details);
            // // dispatch(new VerifyUserJobs($details));
            // VerifyUserJobs::dispatchSync(Mail::to($details['email'])->send(new VerifyUserMail($details)));
            // Mail::to($details['email'])->send(new VerifyUserMail($details));
            // $details = ['slug' => $user->slug, 'role' => $user->role];
            // $asyncMail = Http::async()->post(url('/send-otp'), $details);
        }

        $data['user'] = $user;
        
        if ($data['user']['role'] === 'job seeker') {
            $data['profile'] = Profile::create([
                'slug'=>Str::random(15),
                // 'fullname' => 'Guest'.Str::random(5),
                // 'age' => 19, 
                // 'address' => 'No Address', 
                // 'description' => 'No Description', 
                // 'last_education' => 'SMA/Sederajat',
                // 'document_url' => 'http://localhost:8000/files/applications/default.pdf',
                'image' => 'http://localhost:8000/files/profiles/default.png',
                'user_id' => $data['user']['id'],
            ]);
            
            $data['profile']->save();
        }else if ($data['user']['role'] === 'company') {
            $data['company'] = Company::create([
                'slug'=>Str::random(15),
                // 'name' => 'Company'.Str::random(5),
                // 'location' => 'No Location', 
                // 'description' => 'No Description',
                'image' => 'http://localhost:8000/files/companies/default.png',
                'user_id' => $data['user']['id'],
            ]);

            $data['company']->save();
        }

        if (! $token = JWTAuth::attempt($validator->validated())) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        
        return $this->createNewToken($token);

        // return $this->apiResponse('User succesfully registered',$data=$user,Response::HTTP_OK, true);
    }

    public function compareOTP(Request $request) {
        $data['user'] = User::where([['slug', $request['slug']], ['role', $request['role']]])->first();
        // $data['user'] = \App\Models\User::where([['slug', $request['slug']]])->first();
        // return $this->apiResponse('Success Verify', $data['user'], Response::HTTP_OK, true);

        if ($data['user']['otp'] == $request['otp']) {
            $data['user']['verify'] = true;
            $data['user']['otp'] = null;

            $data['user']->save();

            return $this->apiResponse('Success Verify', $data['user'], Response::HTTP_OK, true);
        }else {
            return $this->apiResponse('Invalid OTP', $data='Invalid', Response::HTTP_OK, true);
        }
    }
    
    public function sendOTP(Request $request) {
        $data['user'] = User::where([['slug', $request['slug']], ['role', $request['role']]])->first();
        
        if ($data['user']['otp'] != null) {
            $details = ['name'=>$data['user']['name'], 'email'=>$data['user']['email'], 'hashEmail'=>Crypt::encryptString($data['user']['email']), 'token'=>$data['user']['token'], 'otp'=>$data['user']['otp']];
            // dispatch(new VerifyUserJobs($details));
            Mail::to($details['email'])->send(new VerifyUserMail($details));

            return $this->apiResponse('Success send OTP', $data['user'], Response::HTTP_OK, true);
        }else {
            return $this->apiResponse('User already verified', $data['user'], Response::HTTP_OK, true);
        }
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function accountVerify($token, $email) {
        $user = User::where([['email',Crypt::decryptString($email)],['token', $token]])->first();
        if ($user->token == $token) {
            $user->update([
                'verify'=>true,
                'token'=>null
            ]);
            return redirect()->to('http://127.0.0.1:8000/verify/success');
        }
        return redirect()->to('http://127.0.0.1:8000/verify/invalid_token');
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout() {
        auth()->logout();
        return $this->apiResponse('Sign out success',null,Response::HTTP_OK, true);
    }
    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh() {
        return $this->createNewToken(auth()->refresh());
    }
    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function userProfile() {
        return $this->apiResponse('User Profile Success',$data=auth()->user(),Response::HTTP_OK, true);
    }
    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function createNewToken($token){
        $data['token'] = $token;
        $data['token_type'] = 'bearer';
        // $data['expires_in'] = JWTAuth::factory()->getTTL() * 60;
        $data['expires_in'] = JWTAuth::factory()->getTTL() * 120;
        $data['user'] = auth() -> user();
        return $this->apiResponse('success',$data,Response::HTTP_OK, true);
    }

    public function forgotPassword(Request $request) {
        $user = User::where('email', $request->email)->first();
        if ($user) {
            $token = Str::random(15);
            $details = ['name' => $user->name, 'token' => $token, 'email' => $user->email, 'hashEmail' => Crypt::encryptString($user->email)];
            // if (dispatch(new PasswordResetJob($details))) {
            if ($details) {
                DB::table('password_resets')->insert([
                    'email'=>$user->email,
                    'token'=>$token, 
                    'created_at'=>now()
                ]);
                PasswordResetJob::dispatchSync($details);
                return $this->apiResponse('Link sent',null,Response::HTTP_OK, true);
                // return $this->apiResponse('Password reset link has been sent to your email address',null,Response::HTTP_OK, true);
            }
        } else {
            return $this->apiResponse('Invalid email',null,Response::HTTP_OK, true);
        }
    }

    public function updatePassword(Request $request) {
        $validator = Validator::make($request->all(), [
            'email' => 'required',
            'password' => 'required|string|min:6',
            'token'=>'required'
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        $email = Crypt::decryptString($request->email);
        $user = DB::table('password_resets')->where([['email', $email], ['token', $request->token]])->first();
        if (!$user) {
            return $this->apiResponse('Invalid email address or token',null,Response::HTTP_OK, true);
        }else {
            $data = User::where('email', $email)->first();
            $data -> update([
                'password'=>Hash::make($request->password)
            ]);
            DB::table('password_resets')->where('email', $email)->delete();
            return $this->apiResponse('Password Updated',null,Response::HTTP_OK, true);
        }
    }
}
