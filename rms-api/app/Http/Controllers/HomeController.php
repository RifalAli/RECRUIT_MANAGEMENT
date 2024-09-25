<?php

namespace App\Http\Controllers;

use App\Models\Blacklist;
use App\Models\Category;
use App\Models\Company;
use App\Models\MainJob;
use App\Models\User;
use App\Traits\ApiResponseWithHttpStatus;
use Exception;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class HomeController extends Controller
{
    use ApiResponseWithHttpStatus;
    public function index() 
    {
        $data['categories'] = Category::where([['status', 'active']])->take(8)->get();
        $query['job'] = [];
        try {
            $query['job'] = MainJob::where([['status', 'active'], ['is_featured', true]])->get()->random(6);
        } catch(Exception $e) {
            $query['job'] = MainJob::where([['status', 'active'], ['is_featured', true]])->get();
        }

        for ($i = 0; $i < count($query['job']); $i++) {
            $query['company'][$i] = Company::where([['id', $query['job'][$i]['company_id']]])->get();

            $data['featured_job'][$i]['title'] = $query['job'][$i]['title'];
            $data['featured_job'][$i]['type'] = $query['job'][$i]['type'];
            $data['featured_job'][$i]['slug'] = $query['job'][$i]['slug'];
            $data['featured_job'][$i]['icon'] = $query['job'][$i]['icon'];
            $data['featured_job'][$i]['company'] = $query['company'][$i];
        }

        return $this -> apiResponse('success', $data, Response::HTTP_OK, true);
    }

    public function homepage(Request $request) {
        $blacklist = [];
        if ($request['user_id']) {
            $user = User::where([['id', $request['user_id']]])->first();
            $blacklist = Blacklist::where([['user_profile_id', $request['user_id']]])->get();
        }

        $bannedUsers = [];
        $bannedUsers = User::where([['role', 'company'], ['isBanned', 1]])->get();

        
        $data['categories'] = [];
        $allCateg = Category::where([['status', 'active']])->get();
        for ($i = 0, $j = 0; $i < sizeof($allCateg); $i++) {
            $job = MainJob::where([
                ['status', 'active'], 
                ['cat_id', $allCateg[$i]['id']]
            ])->whereHas(
                'company', function ($query) use ($blacklist) {
                    if ($blacklist) {
                        for ($a = 0; $a < sizeof($blacklist); $a++) {
                            $query->whereNot('user_id', $blacklist[$a]['user_company_id']);
                        }
                    }
                }
            )->whereHas(
                'company', function ($query) use ($bannedUsers) {
                    if ($bannedUsers) {
                        for ($a = 0; $a < sizeof($bannedUsers); $a++) {
                            $query->whereNot('user_id', $bannedUsers[$a]['id']);
                        }
                    }
                }
            )->first();

            if ($job != null) {
                $data['categories'][$j] = $allCateg[$i];
                ++$j;
            }

            if (sizeof($data['categories']) == 8) {
                break;
            }
        }

        try {
            $query['job'] = MainJob::where([
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
                'company', function ($query) use ($bannedUsers) {
                    if ($bannedUsers) {
                        for ($a = 0; $a < sizeof($bannedUsers); $a++) {
                            $query->whereNot('user_id', $bannedUsers[$a]['id']);
                        }
                    }
                }
            )->get()->random(6);
        } catch(Exception $err) {
            $query['job'] = MainJob::where([
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
                'company', function ($query) use ($bannedUsers) {
                    if ($bannedUsers) {
                        for ($a = 0; $a < sizeof($bannedUsers); $a++) {
                            $query->whereNot('user_id', $bannedUsers[$a]['id']);
                        }
                    }
                }
            )->get();
        }

        for ($i = 0; $i < count($query['job']); $i++) {
            $query['company'][$i] = Company::where([['id', $query['job'][$i]['company_id']]])->get();

            $data['featured_job'][$i]['title'] = $query['job'][$i]['title'];
            $data['featured_job'][$i]['type'] = $query['job'][$i]['type'];
            $data['featured_job'][$i]['slug'] = $query['job'][$i]['slug'];
            $data['featured_job'][$i]['icon'] = $query['job'][$i]['icon'];
            $data['featured_job'][$i]['description'] = $query['job'][$i]['description'];
            $data['featured_job'][$i]['company'] = $query['company'][$i];
        }

        try {
            $finalData = ['categories' => $data['categories'], 'featured_job' => $data['featured_job']];
        } catch(Exception $err) {
            $finalData = ['categories' => $data['categories'], 'featured_job' => 'Nothing'];
        }
        return $this -> apiResponse('success', $finalData, Response::HTTP_OK, true);
    }

    public function getAllJobs($count) 
    {
        $query['job'] = MainJob::where([['status', 'active']])->get()->take($count);
        for ($i = 0; $i < count($query['job']); $i++) {
            $query['company'][$i] = Company::where([['id', $query['job'][$i]['company_id']]])->get();

            $data['job'][$i]['title'] = $query['job'][$i]['title'];
            $data['job'][$i]['type'] = $query['job'][$i]['type'];
            $data['job'][$i]['slug'] = $query['job'][$i]['slug'];
            $data['job'][$i]['icon'] = $query['job'][$i]['icon'];
            $data['job'][$i]['company'] = $query['company'][$i];
        }
        return $this -> apiResponse('success', $data, Response::HTTP_OK, true);
    }

    public function getPaginationJobs(Request $request, $page) {
        $blacklist = [];
        if ($request['user_id']) {
            $user = User::where([['id', $request['user_id']]])->first();
            $blacklist = Blacklist::where([['user_profile_id', $request['user_id']]])->get();
        }

        $bannedUsers = [];
        $bannedUsers = User::where([['role', 'company'], ['isBanned', 1]])->get();

        $query['job'] = MainJob::where([
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
                $data['job'][$num]['description'] = $query['job'][$i]['description'];
                $data['job'][$num]['slug'] = $query['job'][$i]['slug'];
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

    public function getSingleJobDetails($slug) 
    {
        $query['job'] = MainJob::where([['slug', $slug]])->with('category')->first();
        $query['similar'] = MainJob::where([['status', 'active'], ['cat_id', $query['job']->cat_id]])->whereNot([['slug', $slug]])->get()->take(3);
        $query['job_company'] = Company::where([['id', $query['job']['company_id']]])->get();

        $data['job']['id'] = $query['job']['id'];
        $data['job']['title'] = $query['job']['title'];
        $data['job']['icon'] = $query['job']['icon'];
        $data['job']['salary'] = $query['job']['salary'];
        $data['job']['description'] = $query['job']['description'];
        $data['job']['type'] = $query['job']['type'];
        $data['job']['expire_at'] = $query['job']['expire_at'];
        $data['job']['company'] = $query['job_company'];
        $data['job']['category'] = $query['job']['category'];
        $data['job']['created_at'] = $query['job']['created_at'];

        for ($i = 0; $i < count($query['similar']); $i++) {
            $query['company'][$i] = Company::where([['id', $query['similar'][$i]['company_id']]])->get();

            $data['similar'][$i]['title'] = $query['similar'][$i]['title'];
            $data['similar'][$i]['type'] = $query['similar'][$i]['type'];
            $data['similar'][$i]['slug'] = $query['similar'][$i]['slug'];
            $data['similar'][$i]['icon'] = $query['similar'][$i]['icon'];
            $data['similar'][$i]['description'] = $query['similar'][$i]['description'];
            $data['similar'][$i]['company'] = $query['company'][$i];
        }
        return $this -> apiResponse('success', $data, Response::HTTP_OK, true);
    }

    public function sameCategory($slug) {
        $data['categories'] = Category::where([['slug', $slug]])->first();
        $query['same'] = MainJob::where([['status', 'active'], ['cat_id', $data['categories']->id]])->get();

        for ($i = 0; $i < count($query['same']); $i++) {
            $query['company'][$i] = Company::where([['id', $query['same'][$i]['company_id']]])->get();

            $data['same'][$i]['title'] = $query['same'][$i]['title'];
            $data['same'][$i]['type'] = $query['same'][$i]['type'];
            $data['same'][$i]['slug'] = $query['same'][$i]['slug'];
            $data['same'][$i]['icon'] = $query['same'][$i]['icon'];
            $data['same'][$i]['description'] = $query['same'][$i]['description'];
            $data['same'][$i]['company'] = $query['company'][$i];
        }
        return $this->apiResponse('success', $data, Response::HTTP_OK, true);
    }

    public function sameCategoryPagination(Request $request, $slug, $page) {
        $data['categories'] = Category::where([['slug', $slug]])->first();

        $blacklist = [];
        if ($request['user_id']) {
            $user = User::where([['id', $request['user_id']]])->first();
            $blacklist = Blacklist::where([['user_profile_id', $request['user_id']]])->get();
        }

        $bannedUsers = [];
        $bannedUsers = User::where([['role', 'company'], ['isBanned', 1]])->get();

        $query['same'] = MainJob::where([
            ['status', 'active'], 
            ['cat_id', $data['categories']->id]
        ])->whereHas(
            'company', function ($query) use ($blacklist) {
                if ($blacklist) {
                    for ($a = 0; $a < sizeof($blacklist); $a++) {
                        $query->whereNot('user_id', $blacklist[$a]['user_company_id']);
                    }
                }
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

        $jobCount = sizeof($query['same']);
        $totalPage = ceil($jobCount / 6);

        $pageDestination = $page;

        for ($i = ($pageDestination - 1) * 6, $num = 0; $i < ($pageDestination) * 6; $i++, $num++) {
            try {
                $query['company'][$i] = Company::where([['id', $query['same'][$i]['company_id']]])->get();

                $data['same'][$num]['title'] = $query['same'][$i]['title'];
                $data['same'][$num]['type'] = $query['same'][$i]['type'];
                $data['same'][$num]['slug'] = $query['same'][$i]['slug'];
                $data['same'][$num]['icon'] = $query['same'][$i]['icon'];
                $data['same'][$num]['description'] = $query['same'][$i]['description'];
                $data['same'][$num]['company'] = $query['company'][$i];
            } catch (Exception $err) {
                // 
            }
        }

        try {
            $finalData = ['categories' => $data['categories'], 'same' => $data['same'], 'jobCount' => $jobCount, 'totalPage' => $totalPage, 'currentPage' => $pageDestination];
        } catch(Exception $err) {
            $finalData = ['categories' => $data['categories'], 'same' => [], 'jobCount' => $jobCount, 'totalPage' => $totalPage, 'currentPage' => $pageDestination];
        }

        return $this -> apiResponse('success', $finalData, Response::HTTP_OK, true);
    }
}
