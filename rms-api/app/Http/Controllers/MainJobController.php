<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\MainJob;
use App\Models\User;
use App\Traits\ApiResponseWithHttpStatus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Str;

use function PHPUnit\Framework\isEmpty;

class MainJobController extends Controller
{
    use ApiResponseWithHttpStatus;

    public function getCompanyJob($company_id) {
        $data['job'] = MainJob::where([['company_id', $company_id]])->with('company')->get();
        return $this->apiResponse('Success fetch all job that belong to this company', $data, Response::HTTP_OK, true);
    }

    public function companyCreateJob($company_id, Request $request) {
        $data['company'] = Company::where([['id', $company_id]])->first();
        $data['user'] = User::where([['id', $data['company']['user_id']]])->first();

        $validator = Validator::make($request->all(), [
            'jobTitle' => 'required|string', 
            'jobCloseDate' => 'required',
            'jobType' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        $data['job'] = MainJob::create([
            'title' => $request['jobTitle'],
            'slug' => Str::lower(str_replace('', '_', Str::random(15))),
            'salary' => $request['jobSalary'],
            'close_date' => $request['jobCloseDate'],
            'cat_id' => $request['jobCategory'],
            'company_id' => $company_id, 
            'icon'=>'http://localhost:8000/files/users/default.png',
            'description' => $request['jobDescription'],
            'status' => 'active', 
            'type' => $request['jobType']
        ]);

        $data['job']->save();

        return $this->apiResponse('Success create new job', $data, Response::HTTP_OK, true);
        
        // return $this->apiResponse('Check', $data, Response::HTTP_OK, true);
        // $data['profile'] = Profile::where([['user_id', $user_id]])->first();
        //$data['categories'] = Category::where([['slug', $slug]])->first();
        //$data['same'] = MainJob::where([['status', 'active'], ['cat_id', $data['categories']->id]])->get();

        // return $this->apiResponse('success', $data, Response::HTTP_OK, true);
    }

    public function companyDeleteJob($company_id, $job_id) {
        $data['job'] = MainJob::where([['company_id', $company_id], ['id', $job_id]])->delete();
        return response()->json(['message' => 'Job deleted succesfully'], 200);
    }

    public function companyEditJob($company_id, $job_id, Request $request) {
        $data['job'] = MainJob::where([['company_id', $company_id], ['id', $job_id]])->first();

        $validator = Validator::make($request->all(), [
            'jobTitle' => 'required|string', 
            'jobCloseDate' => 'required',
            'jobType' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        $data['job']['title'] = $request['jobTitle'];
        $data['job']['salary'] = $request['jobSalary'];
        $data['job']['close_date'] = $request['jobCloseDate'];
        $data['job']['cat_id'] = $request['jobCategory'];
        $data['job']['description'] = $request['jobDescription'];
        $data['job']['type'] = $request['jobType'];

        $data['job']->save();
        
        return $this->apiResponse('Success edit job', $data, Response::HTTP_OK, true);
    }

    public function adminCreateJob(Request $request) {
        $validator = Validator::make($request->all(), [
            'company_id' => 'required',
            'jobTitle' => 'required|string', 
            'jobCloseDate' => 'required',
            'jobType' => 'required',
        ]);
        
        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        $data['company'] = Company::where([['id', $request['company_id']]])->first();
        $data['user'] = User::where([['id', $data['company']['user_id']]])->first();
        
        $data['job'] = MainJob::create([
            'title' => $request['jobTitle'],
            'slug' => Str::lower(str_replace('', '_', Str::random(15))),
            'salary' => $request['jobSalary'],
            'close_date' => $request['jobCloseDate'],
            'cat_id' => $request['category_id'],
            'company_id' => $data['company']['id'], 
            'icon'=>'http://localhost:8000/files/users/default.png',
            'description' => $request['jobDescription'],
            'status' => $request['jobStatus'], 
            'type' => $request['jobType']
        ]);

        $data['job'] -> save();

        return $this->apiResponse('Success create job', $data, Response::HTTP_OK, true);
    }

    public function adminEditJob($job_id, Request $request) {
        $data['job'] = MainJob::where([['id', $job_id]])->first();

        $validator = Validator::make($request->all(), [
            'jobTitle' => 'required|string', 
            'jobCloseDate' => 'required',
            'jobType' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        $data['job']['title'] = $request['jobTitle'];
        $data['job']['salary'] = $request['jobSalary'];
        $data['job']['close_date'] = $request['jobCloseDate'];
        $data['job']['company_id'] = $request['company_id'];
        $data['job']['cat_id'] = $request['category_id'];
        $data['job']['description'] = $request['jobDescription'];
        $data['job']['status'] = $request['jobStatus'];
        $data['job']['type'] = $request['jobType'];

        $data['job']->save();
        
        return $this->apiResponse('Success edit job', $data, Response::HTTP_OK, true);
    }
    
    public function adminDeleteJob($job_id) {
        $data['job'] = MainJob::where([['id', $job_id]])->delete();
        return $this->apiResponse('Success delete job', $data, Response::HTTP_OK, true);
    }

    public function filterJobs($count, Request $request) {
        $data['job'] = MainJob::where([
            ['title', 'LIKE', '%'.$request['title'].'%'], 
            ['type', $request['type']], 
            ['status', 'active']
        ])->whereHas(
            'category', function ($query) use ($request) {
                $query->where('name', $request['category']);
            }
        )->whereHas(
            'company', function ($query) use ($request) {
                $query->where('location', 'LIKE', '%'.$request['location'].'%');
            }
        )->with('category')->with('company')->get()->take($count);

        if (empty($data['job']) || sizeof($data['job']) <= 0) {
            $data['job'] = 'Nothing Match';
        }

        return $this -> apiResponse('success', $data, Response::HTTP_OK, true);
    }
}
