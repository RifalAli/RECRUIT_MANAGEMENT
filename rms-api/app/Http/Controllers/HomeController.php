<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Company;
use App\Models\MainJob;
use App\Traits\ApiResponseWithHttpStatus;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class HomeController extends Controller
{
    use ApiResponseWithHttpStatus;
    public function index() 
    {
        $data['categories'] = Category::where([['status', 'active']])->take(8)->get();
        $query['job'] = MainJob::where([['status', 'active'], ['is_featured', true]])->get()->random(6);
        // $data['company'] = Company::where([['id', $data['job'][0]['company_id']]])->get();

        // $data['latest'] = MainJob::where([['status', 'active']])->latest('created_at')->get()->random(6);
        // $data['featured_job'] = $data['job'];
        // $data['featured_job'] = $data['company'];

        // $data['featured_job'] = ([['name' => $data['company']['slug']]]);
        // $data['featured_job']['name'] = $data['job'][0]['title'];

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

    public function getSingleJobDetails($slug) 
    {
        // icon, title, company, salary, description
        // $data['job'] = MainJob::where([['slug', $slug]])->with('category')->first();
        // $data['similar'] = MainJob::where([['status', 'active'], ['cat_id', $data['job']->cat_id]])->get()->take(3);
        $query['job'] = MainJob::where([['slug', $slug]])->with('category')->first();
        $query['similar'] = MainJob::where([['status', 'active'], ['cat_id', $query['job']->cat_id]])->get()->take(3);
        $query['job_company'] = Company::where([['id', $query['job']['company_id']]])->get();

        $data['job']['title'] = $query['job']['title'];
        $data['job']['icon'] = $query['job']['icon'];
        $data['job']['salary'] = $query['job']['salary'];
        $data['job']['description'] = $query['job']['description'];
        $data['job']['company'] = $query['job_company'];
        $data['job']['category'] = $query['job']['category'];

        for ($i = 0; $i < count($query['similar']); $i++) {
            $query['company'][$i] = Company::where([['id', $query['similar'][$i]['company_id']]])->get();

            $data['similar'][$i]['title'] = $query['similar'][$i]['title'];
            $data['similar'][$i]['type'] = $query['similar'][$i]['type'];
            $data['similar'][$i]['slug'] = $query['similar'][$i]['slug'];
            $data['similar'][$i]['icon'] = $query['similar'][$i]['icon'];
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
            $data['same'][$i]['company'] = $query['company'][$i];
        }
        return $this->apiResponse('success', $data, Response::HTTP_OK, true);
    }
}
