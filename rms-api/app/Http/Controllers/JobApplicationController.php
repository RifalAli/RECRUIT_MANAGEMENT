<?php

namespace App\Http\Controllers;

use App\Models\ApplicationAnswer;
use App\Models\Company;
use App\Models\JobApplication;
use App\Models\MainJob;
use App\Models\Profile;
use App\Models\User;
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
        $profile = Profile::where([['id', $request['profile_id']]])->first();
        if (!$profile['fullname'] || !$profile['age'] || !$profile['address'] || !$profile['description'] || !$profile['document_url']) {
            return response()->json('Empty profile', 200);
        }
        
        $user = User::where([['id', $profile['user_id']]])->first();
        if ($user['isBanned'] == 1) {
            return response()->json('Banned user', 200);
        }

        $jobPending = JobApplication::where([['profile_id', $request['profile_id']], ['job_id', $request['job_id']], ['status', 'pending']])->first();

        if ($jobPending) {
            return response()->json('Already apply', 200);
        }

        $data['jobApplication'] = JobApplication::create([
            'profile_id' => $request['profile_id'],
            'company_id' => $request['company_id'],
            'job_id' => $request['job_id'],
        ]);

        return $this->apiResponse('Success apply job', $data, Response::HTTP_OK, true);
    }
    
    public function companyViewApplier($option, $company_id) {
        if ($option == 'normal') {
            $data['applier'] = JobApplication::where([['company_id', $company_id], ['company_archived', 0]])->with('profile')->with('company')->with('main_job')->get();
        }else if ($option == 'archive') {
            $data['applier'] = JobApplication::where([['company_id', $company_id], ['company_archived', 1]])->with('profile')->with('company')->with('main_job')->get();
        }

        if ($data['applier'] != null && sizeof($data['applier'])) {
            for ($i = 0; $i < sizeof($data['applier']); $i++) {
                $profile = Profile::where([['id', $data['applier'][$i]['profile_id']]])->first();
                $user = User::where([['id', $profile->user_id]])->first();

                $data['applier'][$i]['image'] = $user['image'];
            }
        }

        return $this->apiResponse('Success apply job', $data, Response::HTTP_OK, true);
    }

    public function getProfileJobApplication($option, $profile_id) {
        if ($option == 'normal') {
            $query['jobApplication'] = JobApplication::where([['profile_id', $profile_id], ['profile_archived', 0]])->get();
        }else if ($option == 'archive') {
            $query['jobApplication'] = JobApplication::where([['profile_id', $profile_id], ['profile_archived', 1]])->get();
        }

        $data['jobApplication'][0] = 'Nothing';

        for ($i = 0; $i < count($query['jobApplication']); $i++) {
            $query['applicationAnswer'][$i] = ApplicationAnswer::where([['application_id', $query['jobApplication'][$i]['id']]])->get();
            $query['job'][$i] = MainJob::where([['id', $query['jobApplication'][$i]['job_id']]])->get();
            $query['company'][$i] = Company::where([['id', $query['jobApplication'][$i]['company_id']]])->get();

            $data['jobApplication'][$i] = $query['jobApplication'][$i];
            $data['jobApplication'][$i]['job'] = $query['job'][$i];
            $data['jobApplication'][$i]['applicationAnswer'] = $query['applicationAnswer'][$i];
            $data['jobApplication'][$i]['company'] = $query['company'][$i];
        }

        return $this->apiResponse('Success Fetch Applied Jobs', $data, Response::HTTP_OK, true);
    }

    public function archiveApplication($instance, $option, $job_application_id) {
        $data['jobApplication'] = JobApplication::where([['id', $job_application_id]])->first();

        if ($data['jobApplication'] == null) {
            return $this->apiResponse('Failed archive job application', 'failed', Response::HTTP_OK, true);
        }
        
        if ($instance == 'profile') {
            if ($option == 'archive') {
                $data['jobApplication']['profile_archived'] = 1;
            }else if ($option) {
                $data['jobApplication']['profile_archived'] = 0;
            }
        }else if ($instance == 'company') {
            if ($option == 'archive') {
                $data['jobApplication']['company_archived'] = 1;
            }else if ($option == 'unarchive') {
                $data['jobApplication']['company_archived'] = 0;
            }
        }

        $data['jobApplication']->save();
        return $this->apiResponse('Success archive job application', $data, Response::HTTP_OK, true);
    }
}
