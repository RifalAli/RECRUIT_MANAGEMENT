<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Profile;
use App\Models\User;
use App\Traits\ApiResponseWithHttpStatus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;
use Symfony\Component\HttpFoundation\Response;

class ProfileController extends Controller
{
    use ApiResponseWithHttpStatus;

    public function getProfile($user_id) {
        $data['profile'] = Profile::where([['user_id', $user_id]])->first();
        //$data['categories'] = Category::where([['slug', $slug]])->first();
        //$data['same'] = MainJob::where([['status', 'active'], ['cat_id', $data['categories']->id]])->get();
        return $this->apiResponse('success', $data, Response::HTTP_OK, true);
    }

    public function changeProfile($profile_id, Request $request) {
        $data['profile'] = Profile::where([['id', $profile_id]])->first();
        $data['user'] = User::where([['id', $data['profile']['user_id']]])->first();
        
        $data['profile']['fullname'] = $request['fullname'];
        // $data['profile']['fullname'] = $request['fullname']; Email is belong to the user
        $data['user']['email'] = $request['email'];
        $data['user']['name'] = $request['name'];
        //
        $data['profile']['age'] = $request['age'];
        $data['profile']['address'] = $request['address'];
        $data['profile']['description'] = $request['description'];
        $data['profile']['last_education'] = $request['lastEducation'];
        $data['profile']['dream_job'] = $request['dreamJob'];
        // $data['profile']['dream_job'] = $request['dream_job']; dream job is need to take category id instead of category name
        $data['profile']['status'] = $request['status'];

        if ($request->hasFile('file')) {
            $file = $request['file'];
            $filename = time().'_'.$file->getClientOriginalName();
            $path = $file->move(public_path('files/applications'), $filename);
            $data['profile']['document_url'] = 'http://localhost:8000/files/applications/'.$filename;
        }

        $data['profile']->save();
        $data['user']->save();
        return $this->apiResponse('success', $data, Response::HTTP_OK, true);
    }
}