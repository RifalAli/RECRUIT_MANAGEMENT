<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Company;
use App\Models\MainJob;
use App\Models\Profile;
use App\Models\User;
use App\Traits\ApiResponseWithHttpStatus;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

use function Laravel\Prompts\select;

class AdminController extends Controller
{
    use ApiResponseWithHttpStatus;

    public function loadCategory() {
        $data['category'] = Category::all();
        return $this -> apiResponse('success', $data, Response::HTTP_OK, true);
    }

    public function loadCompany() {
        $data['company'] = DB::table("companies")->join("users", "companies.user_id", "=", "users.id")->select("users.*", "companies.*", "users.name as username")->get();
        return $this -> apiResponse('success', $data, Response::HTTP_OK, true);
    }

    public function loadJob() {
        $query['job'] = MainJob::all();

        for ($i = 0; $i < count($query['job']); $i++) {
            $query['company'][$i] = Company::where([['id', $query['job'][$i]['company_id']]])->get();

            $data['job'][$i]['id'] = $query['job'][$i]['id'];
            $data['job'][$i]['title'] = $query['job'][$i]['title'];
            $data['job'][$i]['closeDate'] = $query['job'][$i]['expire_at'];
            $data['job'][$i]['type'] = $query['job'][$i]['type'];
            $data['job'][$i]['count'] = $query['job'][$i]['count'];
            $data['job'][$i]['tag'] = $query['job'][$i]['tag'];
            $data['job'][$i]['salary'] = $query['job'][$i]['salary'];
            $data['job'][$i]['description'] = $query['job'][$i]['description'];
            $data['job'][$i]['slug'] = $query['job'][$i]['slug'];
            $data['job'][$i]['icon'] = $query['job'][$i]['icon'];
            $data['job'][$i]['status'] = $query['job'][$i]['status'];
            $data['job'][$i]['cat_id'] = $query['job'][$i]['cat_id'];
            $data['job'][$i]['company'] = $query['company'][$i];
        }

        return $this -> apiResponse('success', $data, Response::HTTP_OK, true);
    }

    public function getAdminPaginationJob($page) {
        $query['job'] = MainJob::all();

        $jobCount = sizeof($query['job']);
        $totalPage = ceil($jobCount / 6);
        
        $pageDestination = $page;

        for ($i = ($pageDestination - 1) * 6, $num = 0; $i < ($pageDestination) * 6; $i++, $num++) {
            try {
                $query['company'][$i] = Company::where([['id', $query['job'][$i]['company_id']]])->get();

                $data['job'][$num]['id'] = $query['job'][$i]['id'];
                $data['job'][$num]['title'] = $query['job'][$i]['title'];
                $data['job'][$num]['closeDate'] = $query['job'][$i]['expire_at'];
                $data['job'][$num]['type'] = $query['job'][$i]['type'];
                $data['job'][$num]['count'] = $query['job'][$i]['count'];
                $data['job'][$num]['tag'] = $query['job'][$i]['tag'];
                $data['job'][$num]['salary'] = $query['job'][$i]['salary'];
                $data['job'][$num]['description'] = $query['job'][$i]['description'];
                $data['job'][$num]['slug'] = $query['job'][$i]['slug'];
                $data['job'][$num]['icon'] = $query['job'][$i]['icon'];
                $data['job'][$num]['status'] = $query['job'][$i]['status'];
                $data['job'][$num]['cat_id'] = $query['job'][$i]['cat_id'];
                $data['job'][$num]['company'] = $query['company'][$i];
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

    public function getNormalUser() {
        $users = User::whereNot([['role', 'admin']])->where([['isBanned', 0]])->get();

        for ($i = 0; $i < sizeof($users); $i++) {
            if ($users[$i]['role'] == 'job seeker') {
                $profile = Profile::where([['user_id', $users[$i]['id']]])->first();
                $users[$i]['userDetail'] = $profile;
                $users[$i]['userRole'] = 'profile';
            }else if ($users[$i]['role'] == 'company') {
                $company = Company::where([['user_id', $users[$i]['id']]])->first();
                $users[$i]['userDetail'] = $company;
                $users[$i]['userRole'] = 'company';
            }
        }

        if (sizeof($users)) {
            return $this -> apiResponse('success', $users, Response::HTTP_OK, true);
        }else {
            return $this -> apiResponse('success', 'Nothing', Response::HTTP_OK, true);
        }
    }

    public function getBannedUser() {
        $users = User::whereNot([['role', 'admin']])->where([['isBanned', 1]])->get();

        for ($i = 0; $i < sizeof($users); $i++) {
            if ($users[$i]['role'] == 'job seeker') {
                $profile = Profile::where([['user_id', $users[$i]['id']]])->first();
                $users[$i]['userDetail'] = $profile;
                $users[$i]['userRole'] = 'profile';
            }else if ($users[$i]['role'] == 'company') {
                $company = Company::where([['user_id', $users[$i]['id']]])->first();
                $users[$i]['userDetail'] = $company;
                $users[$i]['userRole'] = 'company';
            }
        }

        if (sizeof($users)) {
            return $this -> apiResponse('success', $users, Response::HTTP_OK, true);
        }else {
            return $this -> apiResponse('success', 'Nothing', Response::HTTP_OK, true);
        }
    }

    public function banUser($option, $user_id) {
        $user = User::where([['id', $user_id]])->first();

        if ($option == 'ban') {
            $user['isBanned'] = 1;
        }else if ($option == 'unban') {
            $user['isBanned'] = 0;
        }

        $user->save();

        return $this -> apiResponse('Success', $option, Response::HTTP_OK, true);
    }
}
