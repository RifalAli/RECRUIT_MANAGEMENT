<?php

namespace App\Http\Controllers;

use App\Models\ApplicationAnswer;
use App\Models\JobApplication;
use App\Traits\ApiResponseWithHttpStatus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response;


class ApplicationAnswerController extends Controller
{
    use ApiResponseWithHttpStatus;

    public function answerJobApplication($jobApplication_id, Request $request) {
        $data['jobApplication'] = JobApplication::where([['id', $jobApplication_id]])->first();
        $data['jobApplication']['status'] = $request['status'];
        
        $data['applicationAnswer'] = ApplicationAnswer::create([
            'title' => $request['title'],
            'description' => $request['description'],
            'meeting_date' => $request['meeting_date'],
            'meeting_link' => $request['meeting_link'],
            'application_id' => $data['jobApplication']['id']
        ]);
        
        $data['jobApplication'] -> save();
        
        return $this->apiResponse('Success Answer Job Application', $data, Response::HTTP_OK, true);
    }
}
