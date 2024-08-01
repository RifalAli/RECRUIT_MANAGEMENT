<?php

namespace App\Http\Controllers;

use App\Models\ApplicationAnswer;
use App\Models\JobApplication;
use App\Models\MainJob;
use App\Traits\ApiResponseWithHttpStatus;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response;

use function PHPUnit\Framework\isEmpty;
use function PHPUnit\Framework\isNull;

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

    public function getProfileJobApplication($profile_id) {
        $query['jobApplication'] = JobApplication::where([['profile_id', $profile_id]])->get();

        for ($i = 0; $i < count($query['jobApplication']); $i++) {
            $query['applicationAnswer'][$i] = ApplicationAnswer::where([['application_id', $query['jobApplication'][$i]['id']]])->get();
            $query['job'][$i] = MainJob::where([['id', $query['jobApplication'][$i]['job_id']]])->get();

            $data['jobApplication'][$i] = $query['jobApplication'][$i];
            $data['jobApplication'][$i]['job'] = $query['job'][$i];
            $data['jobApplication'][$i]['applicationAnswer'] = $query['applicationAnswer'][$i];
        }

        return $this->apiResponse('Success Fetch Applied Jobs', $data, Response::HTTP_OK, true);
    }
}
