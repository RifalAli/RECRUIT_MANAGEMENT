<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\MainJob;
use App\Traits\ApiResponseWithHttpStatus;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    use ApiResponseWithHttpStatus;
    // public function __construct() {
    //     $this->middleware('auth:api', ['except' => ['index']]);
    // }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data['categories'] = Category::latest()->paginate(8);
        return $this->apiResponse('success', $data, Response::HTTP_OK, true);
    }

    public function getAllCategories() {
        $data['categories'] = Category::all();
        return $this->apiResponse('success', $data, Response::HTTP_OK, true);
    }

    public function adminCreateCategory(Request $request) {
        $data['categories'] = Category::create([
            'name' => $request['categoryName'], 
            'slug' => Str::lower(str_replace('', '_', Str::random(15))),
            'icon'=>fake()->randomElement(['http://localhost:8000/files/categories/default.png', 'http://localhost:8000/files/categories/default1.png', 'http://localhost:8000/files/categories/default2.png', 'http://localhost:8000/files/categories/default3.png']),
            'status' => $request['categoryStatus']
        ]);

        $data['categories']->save();
        return $this->apiResponse('Success create new category', $data, Response::HTTP_OK, true);
    }

    public function adminEditCategory($category_id, Request $request) {
        $data['categories'] = Category::where([['id', $category_id]])->first();

        $data['categories']['name'] = $request['categoryName'];
        $data['categories']['status'] = $request['categoryStatus'];
        
        $data['categories'] -> save();

        return $this->apiResponse('Success edit category', $data, Response::HTTP_OK, true);
    }
    
    public function adminDeleteCategory($category_id) {
        $data['category'] = Category::where([['id', $category_id]])->delete();
        return $this->apiResponse('Success delete category', $data, Response::HTTP_OK, true);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        //
    }
}
