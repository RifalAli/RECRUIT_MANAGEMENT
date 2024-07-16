<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('categories')->insert([
            'name'=>'Software Engineer',
            'slug'=>Str::slug(Str::random(20)),
            'status'=>'active',
            'icon'=>'http://localhost:8000/files/categories/default.png',
            'job_count'=>2,
            'created_at'=>now(),
            'updated_at'=>now()
        ]);
        DB::table('categories')->insert([
            'name'=>'Graphics Designer',
            'slug'=>Str::slug(Str::random(20)),
            'status'=>'active',
            'icon'=>'http://localhost:8000/files/categories/default1.png',
            'job_count'=>2,
            'created_at'=>now(),
            'updated_at'=>now()
        ]);
        DB::table('categories')->insert([
            'name'=>'Web Developer',
            'slug'=>Str::slug(Str::random(20)),
            'status'=>'active',
            'icon'=>'http://localhost:8000/files/categories/default2.png',
            'job_count'=>2,
            'created_at'=>now(),
            'updated_at'=>now()
        ]);

        //\App\Models\Category::factory(25)->create();
        \App\Models\Category::factory(2)->create();
    }
}
