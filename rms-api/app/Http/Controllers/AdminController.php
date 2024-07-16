<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Company;
use App\Models\MainJob;
use App\Traits\ApiResponseWithHttpStatus;
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
        // $data['company'] = Company::with('user')->first();
        $data['company'] = DB::table("companies")->join("users", "companies.user_id", "=", "users.id")->select("users.*", "companies.*", "users.name as username")->get();
        // $data['company'] = DB::table('companies')->all();
        return $this -> apiResponse('success', $data, Response::HTTP_OK, true);
    }

    public function loadJob() {
        $query['job'] = MainJob::all();

        for ($i = 0; $i < count($query['job']); $i++) {
            $query['company'][$i] = Company::where([['id', $query['job'][$i]['company_id']]])->get();

            $data['job'][$i]['title'] = $query['job'][$i]['title'];
            $data['job'][$i]['type'] = $query['job'][$i]['type'];
            $data['job'][$i]['slug'] = $query['job'][$i]['slug'];
            $data['job'][$i]['icon'] = $query['job'][$i]['icon'];
            $data['job'][$i]['status'] = $query['job'][$i]['status'];
            $data['job'][$i]['company'] = $query['company'][$i];
        }

        return $this -> apiResponse('success', $data, Response::HTTP_OK, true);
    }
}
