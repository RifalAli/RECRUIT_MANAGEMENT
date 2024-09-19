<?php

namespace App\Http\Controllers;

use App\Jobs\VerifyUserJobs;
use App\Mail\VerifyUserMail;
use App\Models\Category;
use App\Models\Profile;
use App\Models\User;
use App\Traits\ApiResponseWithHttpStatus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Redis;
use Symfony\Component\HttpFoundation\Response;

class ProfileController extends Controller
{
    use ApiResponseWithHttpStatus;

    public function getProfile($user_id) {
        $data['profile'] = Profile::where([['user_id', $user_id]])->first();
        return $this->apiResponse('success', $data, Response::HTTP_OK, true);
    }

    public function changeProfile($profile_id, Request $request) {
        $data['profile'] = Profile::where([['id', $profile_id]])->first();
        $data['user'] = User::where([['id', $data['profile']['user_id']]])->first();
        
        $data['profile']['fullname'] = $request['fullname'];
        $data['user']['name'] = $request['name'];
        $data['profile']['age'] = $request['age'];
        $data['profile']['address'] = $request['address'];
        $data['profile']['description'] = $request['description'];
        $data['profile']['last_education'] = $request['lastEducation'];

        if ($request->hasFile('file')) {
            $file = $request['file'];
            $filename = time().'_'.$file->getClientOriginalName();
            $path = $file->move(public_path('files/users/cv'), $filename);
            $data['profile']['document_url'] = 'http://localhost:8000/files/users/cv/'.$filename;
        }

        if ($request->hasFile('image')) {
            $image = $request['image'];
            $imagename = time().'_'.$image->getClientOriginalName();
            $path = $image->move(public_path('files/users/photo'), $imagename);
            $data['user']['image'] = 'http://localhost:8000/files/users/photo/'.$imagename;
        }

        if ($data['user']['email'] != $request['email']) {
            $data['user']['email'] = $request['email'];
            $data['user']['verify'] = false;
            $data['user']['otp'] = random_int(100000, 999999);

            $details = ['name'=>$data['user']['name'], 'email'=>$data['user']['email'], 'token'=>$data['user']['token'], 'otp'=>$data['user']['otp']];
            VerifyUserJobs::dispatchSync($details);
        }

        $data['profile']->save();
        $data['user']->save();
        return $this->apiResponse('success', $data, Response::HTTP_OK, true);
    }
}