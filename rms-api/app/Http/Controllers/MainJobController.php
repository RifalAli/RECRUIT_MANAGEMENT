<?php

namespace App\Http\Controllers;

use App\Models\Blacklist;
use App\Models\Company;
use App\Models\MainJob;
use App\Models\User;
use App\Traits\ApiResponseWithHttpStatus;
use Exception;
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

    public function getCompanyPaginationJob($company_id, $page) {
        $query['job'] = MainJob::where([['company_id', $company_id]])->with('company')->get();

        $jobCount = sizeof($query['job']);
        $totalPage = ceil($jobCount / 6);
        
        $pageDestination = $page;

        for ($i = ($pageDestination - 1) * 6, $num = 0; $i < ($pageDestination) * 6; $i++, $num++) {
            try {
                $data['job'][$num] = $query['job'][$i];
            } catch (Exception $err) {
                // 
            }
        }

        try {
            $finalData = ['job' => $data['job'], 'jobCount' => $jobCount, 'totalPage' => $totalPage, 'currentPage' => $pageDestination];
        } catch(Exception $err) {
            $finalData = ['job' => 'Nothing', 'jobCount' => $jobCount, 'totalPage' => $totalPage, 'currentPage' => $pageDestination];
        }

        return $this -> apiResponse('success', $finalData, Response::HTTP_OK, true);
    }

    public function companyCreateJob($company_id, Request $request) {
        $data['company'] = Company::where([['id', $company_id]])->first();
        if (!$data['company']['name'] || !$data['company']['location'] || !$data['company']['description']) {
            return response()->json('Empty profile', 200);
        }

        $data['user'] = User::where([['id', $data['company']['user_id']]])->first();

        if ($data['user']['isBanned'] == 1) {
            return response()->json('Banned user', 200);
        }

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
            'expire_at' => $request['jobCloseDate'],
            'cat_id' => $request['jobCategory'],
            'company_id' => $company_id, 
            'icon'=>'http://localhost:8000/files/jobs/default.png',
            'description' => $request['jobDescription'],
            'status' => 'active', 
            'type' => $request['jobType']
        ]);

        if ($request->hasFile('jobImage')) {
            $image = $request['jobImage'];
            $imagename = time().'_'.$image->getClientOriginalName();
            $path = $image->move(public_path('files/jobs'), $imagename);
            $data['job']['icon'] = 'http://localhost:8000/files/jobs/'.$imagename;
        }

        $data['job']->save();

        return $this->apiResponse('Success create new job', $data, Response::HTTP_OK, true);
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
        $data['job']['expire_at'] = $request['jobCloseDate'];
        $data['job']['cat_id'] = $request['jobCategory'];
        $data['job']['description'] = $request['jobDescription'];
        $data['job']['type'] = $request['jobType'];

        if ($request->hasFile('jobImage')) {
            $image = $request['jobImage'];
            $imagename = time().'_'.$image->getClientOriginalName();
            $path = $image->move(public_path('files/jobs'), $imagename);
            $data['job']['icon'] = 'http://localhost:8000/files/jobs/'.$imagename;
        }

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
            'expire_at' => $request['jobCloseDate'],
            'cat_id' => $request['category_id'],
            'company_id' => $data['company']['id'], 
            'icon'=>'http://localhost:8000/files/jobs/default.png',
            'description' => $request['jobDescription'],
            'status' => $request['jobStatus'], 
            'type' => $request['jobType']
        ]);

        if ($request->hasFile('jobImage')) {
            $image = $request['jobImage'];
            $imagename = time().'_'.$image->getClientOriginalName();
            $path = $image->move(public_path('files/jobs'), $imagename);
            $data['job']['icon'] = 'http://localhost:8000/files/jobs/'.$imagename;
        }

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
        $data['job']['expire_at'] = $request['jobCloseDate'];
        $data['job']['company_id'] = $request['company_id'];
        $data['job']['cat_id'] = $request['category_id'];
        $data['job']['description'] = $request['jobDescription'];
        $data['job']['status'] = $request['jobStatus'];
        $data['job']['type'] = $request['jobType'];

        if ($request->hasFile('jobImage')) {
            $image = $request['jobImage'];
            $imagename = time().'_'.$image->getClientOriginalName();
            $path = $image->move(public_path('files/jobs'), $imagename);
            $data['job']['icon'] = 'http://localhost:8000/files/jobs/'.$imagename;
        }

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
            ['status', 'active']
        ])->whereHas(
            'category', function ($query) use ($request) {
                if ($request['category'] != '') $query->where('name', $request['category']);
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

    public function filterPaginationJobs($page, Request $request) {
        $blacklist = [];
        if ($request['user_id']) {
            $user = User::where([['id', $request['user_id']]])->first();
            $blacklist = Blacklist::where([['user_profile_id', $request['user_id']]])->get();
        }

        $bannedUsers = [];
        $bannedUsers = User::where([['role', 'company'], ['isBanned', 1]])->get();

        $query['job'] = MainJob::where([
            ['title', 'LIKE', '%'.$request['title'].'%'], 
            ['status', 'active']
        ])->whereHas(
            'company', function ($query) use ($blacklist) {
                if ($blacklist) {
                    for ($a = 0; $a < sizeof($blacklist); $a++) {
                        $query->whereNot('user_id', $blacklist[$a]['user_company_id']);
                    }
                }
            }
        )->whereHas(
            'company', function ($query) use ($request) {
                $query->where('location', 'LIKE', '%'.$request['location'].'%');
            }
        )->whereHas(
            'company', function ($query) use ($bannedUsers) {
                if ($bannedUsers) {
                    for ($a = 0; $a < sizeof($bannedUsers); $a++) {
                        $query->whereNot('user_id', $bannedUsers[$a]['id']);
                    }
                }
            }
        )->get();

        $jobCount = sizeof($query['job']);
        $totalPage = ceil($jobCount / 6);

        $pageDestination = $page;

        for ($i = ($pageDestination - 1) * 6, $num = 0; $i < ($pageDestination) * 6; $i++, $num++) {
            try {
                $query['company'][$i] = Company::where([['id', $query['job'][$i]['company_id']]])->get();
    
                $data['job'][$num]['title'] = $query['job'][$i]['title'];
                $data['job'][$num]['type'] = $query['job'][$i]['type'];
                $data['job'][$num]['slug'] = $query['job'][$i]['slug'];
                $data['job'][$num]['description'] = $query['job'][$i]['description'];
                $data['job'][$num]['icon'] = $query['job'][$i]['icon'];
                $data['job'][$num]['company'] = $query['company'][$i];
            } catch (Exception $err) {
                // 
            }
        }

        try {
            $finalData = ['jobs' => $data['job'], 'jobCount' => $jobCount, 'totalPage' => $totalPage, 'currentPage' => $pageDestination];
        } catch(Exception $err) {
            $finalData = ['jobs' => 'Nothing', 'jobCount' => $jobCount, 'totalPage' => $totalPage, 'currentPage' => $pageDestination];
        }

        return $this -> apiResponse('success', $finalData, Response::HTTP_OK, true);
    }
}
