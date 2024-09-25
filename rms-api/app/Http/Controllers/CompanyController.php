<?php

namespace App\Http\Controllers;

use App\Http\Controllers\auth\AuthController;
use App\Jobs\PasswordResetJob;
use App\Jobs\VerifyUserJobs;
use App\Models\Company;
use App\Models\User;
use App\Traits\ApiResponseWithHttpStatus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Str;

use JWTAuth;

class CompanyController extends Controller
{
    use ApiResponseWithHttpStatus;
    
    public function getCompany($user_id) {
        $data['company'] = Company::where([['user_id', $user_id]])->first();
        return $this->apiResponse('success', $data, Response::HTTP_OK, true);
    }

    public function changeCompany($company_id, Request $request) {
        $data['company'] = Company::where([['id', $company_id]])->first();
        $data['user'] = User::where([['id', $data['company']['user_id']]])->first();
        
        $data['company']['name'] = $request['name'];
        //
        $data['user']['email'] = $request['email'];
        $data['user']['name'] = $request['username'];
        //
        $data['company']['location'] = $request['location'];
        $data['company']['description'] = $request['description'];

        if ($request->hasFile('image')) {
            $image = $request['image'];
            $imagename = time().'_'.$image->getClientOriginalName();
            $path = $image->move(public_path('files/users/photo'), $imagename);
            $data['user']['image'] = 'http://localhost:8000/files/users/photo/'.$imagename;
        }

        $data['company']->save();
        $data['user']->save();
        return $this->apiResponse('success', $data, Response::HTTP_OK, true);
    }

    public function adminCreateCompany(Request $request) {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|between:2,100',
            'email' => 'required|string|email|max:100|unique:users',
            'password' => 'required|string|min:6',
        ]);
        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        if (!($request['password'] === $request['confirmPassword'])) {
            return $this->apiResponse('Password and Confirm Password are not same', null, Response::HTTP_BAD_REQUEST, false);
        }

        $user = User::create(array_merge(
                    $validator->validated(),
                    [
                    'password' => bcrypt($request->password),
                    'slug'=>Str::random(15),
                    'token'=>Str::random(20),
                    'status'=>$request['status'], 
                    'image'=>'http://localhost:8000/files/users/default.png',
                    'role'=>'company'
                    ]
                ));
        if ($user) {
            $details = ['name'=>$user->name, 'email'=>$user->email, 'hashEmail'=>Crypt::encryptString($user->email), 'token'=>$user->token];
            dispatch(new VerifyUserJobs($details));
        }

        $data['user'] = $user;

        $data['company'] = Company::create([
            'slug'=>Str::random(15),
            'name' => $request['companyName'],
            'location' => $request['companyLocation'], 
            'description' => $request['companyDescription'],
            'image' => 'http://localhost:8000/files/companies/default.png',
            'user_id' => $data['user']['id'],
            'job_count' => 0,
        ]);

        if ($request->hasFile('image')) {
            $image = $request['image'];
            $imagename = time().'_'.$image->getClientOriginalName();
            $path = $image->move(public_path('files/users/photo'), $imagename);
            $data['user']['image'] = 'http://localhost:8000/files/users/photo/'.$imagename;
        }

        $data['company']->save();
        $data['user']->save();

        if (! $token = JWTAuth::attempt($validator->validated())) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        return $this->createNewToken($token);
    }

    public function adminEditCompany($company_id, Request $request) {
        $data['company'] = Company::where([['id', $company_id]])->first();
        $data['user'] = User::where([['id', $data['company']['user_id']]])->first();

        $data['user']['name'] = $request['username'];
        $data['user']['email'] = $request['email'];
        $data['user']['status'] = $request['status'];
        $data['company']['name'] = $request['companyName'];
        $data['company']['location'] = $request['companyLocation'];
        $data['company']['description'] = $request['companyDescription'];

        if ($request['companyVerify'] == 1) {
            $data['user']['verify'] = $request['companyVerify'];
        }

        if ($request->hasFile('companyImage')) {
            $image = $request['companyImage'];
            $imagename = time().'_'.$image->getClientOriginalName();
            $path = $image->move(public_path('files/users/photo'), $imagename);
            $data['user']['image'] = 'http://localhost:8000/files/users/photo/'.$imagename;
        }

        $data['user'] -> save();
        $data['company'] -> save();

        return $this->apiResponse('Success edit company', $data, Response::HTTP_OK, true);
    }

    public function adminDeleteCompany($user_id, $company_id) {
        $data['company'] = Company::where([['id', $company_id]])->delete();
        $data['user'] = User::where([['id', $user_id]])->delete();

        return $this->apiResponse('Success delete company', $data, Response::HTTP_OK, true);
    }

    protected function createNewToken($token){
        $data['token'] = $token;
        $data['token_type'] = 'bearer';
        $data['expires_in'] = JWTAuth::factory()->getTTL() * 60;
        $data['user'] = auth() -> user();
        return $this->apiResponse('success',$data,Response::HTTP_OK, true);
    }

    public function forgotPassword(Request $request) {
        $user = User::where('email', $request->email)->first();
        if ($user) {
            $token = Str::random(15);
            $details = ['name' => $user->name, 'token' => $token, 'email' => $user->email, 'hashEmail' => Crypt::encryptString($user->email)];
            if (dispatch(new PasswordResetJob($details))) {
                DB::table('password_resets')->insert([
                    'email'=>$user->email,
                    'token'=>$token, 
                    'created_at'=>now()
                ]);
                return $this->apiResponse('Password reset link has been sent to your email address',null,Response::HTTP_OK, true);
            }
        } else {
            return $this->apiResponse('Invalid email',null,Response::HTTP_OK, true);
        }
    }
}
