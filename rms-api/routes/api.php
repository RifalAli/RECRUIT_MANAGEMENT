<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\ApplicationAnswerController;
use App\Http\Controllers\auth\AuthController;
use App\Http\Controllers\BlacklistController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\JobApplicationController;
use App\Http\Controllers\MainJobController;
use App\Http\Controllers\ProfileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
 
Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    //Authentication
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/user-profile', [AuthController::class, 'userProfile']);
    Route::get('/verify/{token}/{email}', [AuthController::class, 'accountVerify']);
    Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
    Route::post('/update-password', [AuthController::class, 'updatePassword']);
    Route::post('/verify-otp', [AuthController::class, 'compareOTP']);
    Route::post('/send-otp', [AuthController::class, 'sendOTP']);

    //Home
});

Route::group(['middleware' => 'api'], function ($router) {
    Route::resource('/categories', CategoryController::class);
});

Route::get('/home', [HomeController::class, 'index']);
Route::post('/homepage', [HomeController::class, 'homepage']);
Route::get('/home/browse/{count}', [HomeController::class, 'getAllJobs']);
Route::post('/home/browseJobs/{page}', [HomeController::class, 'getPaginationJobs']);
Route::get('/home/{slug}', [HomeController::class, 'getSingleJobDetails']);

Route::get('/allCategories', [CategoryController::class, 'getAllCategories']);
Route::get('/categories/jobs/{slug}', [HomeController::class, 'sameCategory']);
Route::post('/category/jobs/{slug}/{page}', [HomeController::class, 'sameCategoryPagination']);

// Route::get('/user-complete-profile/{user_id}', [ProfileController::class, 'getProfile']);

Route::group([
    'middleware' => 'api', 
], function ($router) {
    Route::get('/user-complete-profile/{user_id}', [ProfileController::class, 'getProfile']);
    Route::post('/changeProfile/{profile_id}', [ProfileController::class, 'changeProfile']);
    Route::get('/user-complete-company/{user_id}', [CompanyController::class, 'getCompany']);
    Route::post('/changeCompany/{company_id}', [CompanyController::class, 'changeCompany']);
    Route::post('/companyCreateJob/{company_id}', [MainJobController::class, 'companyCreateJob']);
    Route::get('/getCompanyJob/{company_id}', [MainJobController::class, 'getCompanyJob']);
    Route::get('/getCompanyJob/{company_id}/{page}', [MainJobController::class, 'getCompanyPaginationJob']);
    Route::post('/companyDeleteJob/{company_id}/{job_id}', [MainJobController::class, 'companyDeleteJob']);
    Route::post('/companyEditJob/{company_id}/{job_id}', [MainJobController::class, 'companyEditJob']);
    Route::get('/loadCategory', [AdminController::class, 'loadCategory']);
    Route::get('/loadCompany', [AdminController::class, 'loadCompany']);
    Route::get('/loadJob', [AdminController::class, 'loadJob']);
    Route::get('/loadJob/{page}', [AdminController::class, 'getAdminPaginationJob']);
    Route::post('/adminCreateCategory', [CategoryController::class, 'adminCreateCategory']);
    Route::post('/adminEditCategory/{category_id}', [CategoryController::class, 'adminEditCategory']);
    Route::post('/adminDeleteCategory/{category_id}', [CategoryController::class, 'adminDeleteCategory']);
    Route::post('/adminCreateCompany', [CompanyController::class, 'adminCreateCompany']);
    Route::post('/adminEditCompany/{company_id}', [CompanyController::class, 'adminEditCompany']);
    Route::post('/adminDeleteCompany/{user_id}/{company_id}', [CompanyController::class, 'adminDeleteCompany']);
    Route::post('/adminCreateJob', [MainJobController::class, 'adminCreateJob']);
    Route::post('/adminEditJob/{job_id}', [MainJobController::class, 'adminEditJob']);
    Route::post('/adminDeleteJob/{job_id}', [MainJobController::class, 'adminDeleteJob']);
    Route::post('/applyJob', [JobApplicationController::class, 'applyJob']);
    Route::get('/companyViewApplier/{company_id}', [JobApplicationController::class, 'companyViewApplier']);
    Route::post('/answerJobApplication/{jobApplication_id}', [ApplicationAnswerController::class, 'answerJobApplication']);
    Route::get('/getAppliedJobs/{profile_id}', [JobApplicationController::class, 'getProfileJobApplication']);
    // Route::post('/filterJobs/{count}', [MainJobController::class, 'filterJobs']);
    Route::post('/filterJobs/{page}', [MainJobController::class, 'filterPaginationJobs']);
    Route::get('/getUsers/{user_company_id}', [BlacklistController::class, 'getAllUsers']);
    Route::get('/getBlacklist/{user_company_id}', [BlacklistController::class, 'getAllBlacklists']);
    Route::post('/blacklistUser', [BlacklistController::class, 'createBlacklist']);
    Route::post('/unblacklistUser', [BlacklistController::class, 'removeBlacklist']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    // return $request -> user();
    // Route::resource('/categories', CategoryController::class);
    // Route::get('/home', [HomeController::class, 'index']);
});