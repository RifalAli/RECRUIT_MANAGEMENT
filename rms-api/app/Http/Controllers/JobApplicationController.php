<?php

namespace App\Http\Controllers;

use App\Models\JobApplication;
use App\Traits\ApiResponseWithHttpStatus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response;

class JobApplicationController extends Controller
{
    use ApiResponseWithHttpStatus;
    
    public function applyJob(Request $request) {
        if (!$request->hasFile('file')) {
            return $this->apiResponse('Document not inserted', $request['title'], Response::HTTP_OK, true);
        }

        $file = $request['file'];
        $filename = time().'_'.$file->getClientOriginalName();
        $path = $file->move(public_path('files/applications'), $filename);

        // $data['jobApllication'] = JobApplication::create([
        $data['jobApplication'] = JobApplication::create([
            'title' => $request['title'],
            'description' => $request['description'],
            'document_url' => 'http://localhost:8000/files/applications/'.$filename,
            'profile_id' => $request['profile_id'],
            'company_id' => $request['company_id'],
            'job_id' => $request['job_id'],
        ]);

        return $this->apiResponse('Success apply job', $data, Response::HTTP_OK, true);
    }
    
    public function companyViewApplier($company_id) {
        $data['applier'] = JobApplication::where([['company_id', $company_id]])->with('profile')->with('company')->with('main_job')->get();

        return $this->apiResponse('Success apply job', $data, Response::HTTP_OK, true);
    }
}
