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
        // fake()->randomElement(['http://localhost:8000/files/categories/default.png', 'http://localhost:8000/files/categories/default1.png', 'http://localhost:8000/files/categories/default2.png', 'http://localhost:8000/files/categories/default3.png'])
        DB::table('categories')->insert([
            'name'=>'Software Development',
            'slug'=>Str::slug(Str::random(20)),
            'status'=>'active',
            'icon'=>'http://localhost:8000/files/categories/seeder/softwaredev.jpeg',
            'created_at'=>now(),
            'updated_at'=>now()
        ]);
        DB::table('categories')->insert([
            'name'=>'Data Science',
            'slug'=>Str::slug(Str::random(20)),
            'status'=>'active',
            'icon'=>'http://localhost:8000/files/categories/seeder/accounting.jpeg',
            'created_at'=>now(),
            'updated_at'=>now()
        ]);
        DB::table('categories')->insert([
            'name'=>'Network Administration',
            'slug'=>Str::slug(Str::random(20)),
            'status'=>'active',
            'icon'=>'http://localhost:8000/files/categories/seeder/networkadministration.jpeg',
            'created_at'=>now(),
            'updated_at'=>now()
        ]);
        DB::table('categories')->insert([
            'name'=>'Cyber Security',
            'slug'=>Str::slug(Str::random(20)),
            'status'=>'active',
            'icon'=>'http://localhost:8000/files/categories/seeder/cyber.jpeg',
            'created_at'=>now(),
            'updated_at'=>now()
        ]);
        DB::table('categories')->insert([
            'name'=>'Healthcare Management',
            'slug'=>Str::slug(Str::random(20)),
            'status'=>'active',
            'icon'=>'http://localhost:8000/files/categories/seeder/health.jpeg',
            'created_at'=>now(),
            'updated_at'=>now()
        ]);
        DB::table('categories')->insert([
            'name'=>'Nursing',
            'slug'=>Str::slug(Str::random(20)),
            'status'=>'active',
            'icon'=>'http://localhost:8000/files/categories/seeder/nursing.jpeg',
            'created_at'=>now(),
            'updated_at'=>now()
        ]);
        DB::table('categories')->insert([
            'name'=>'Accounting',
            'slug'=>Str::slug(Str::random(20)),
            'status'=>'active',
            'icon'=>'http://localhost:8000/files/categories/seeder/accounting.jpeg',
            'created_at'=>now(),
            'updated_at'=>now()
        ]);
        DB::table('categories')->insert([
            'name'=>'Financial Analysis',
            'slug'=>Str::slug(Str::random(20)),
            'status'=>'active',
            'icon'=>'http://localhost:8000/files/categories/seeder/finance.jpeg',
            'created_at'=>now(),
            'updated_at'=>now()
        ]);
        DB::table('categories')->insert([
            'name'=>'Marketing',
            'slug'=>Str::slug(Str::random(20)),
            'status'=>'active',
            'icon'=>'http://localhost:8000/files/categories/seeder/marketing.jpeg',
            'created_at'=>now(),
            'updated_at'=>now()
        ]);
        DB::table('categories')->insert([
            'name'=>'Sales',
            'slug'=>Str::slug(Str::random(20)),
            'status'=>'active',
            'icon'=>'http://localhost:8000/files/categories/seeder/sales.jpeg',
            'created_at'=>now(),
            'updated_at'=>now()
        ]);
        DB::table('categories')->insert([
            'name'=>'Human Resource',
            'slug'=>Str::slug(Str::random(20)),
            'status'=>'active',
            'icon'=>'http://localhost:8000/files/categories/seeder/humanresource.jpeg',
            'created_at'=>now(),
            'updated_at'=>now()
        ]);
        DB::table('categories')->insert([
            'name'=>'Civil Engineering',
            'slug'=>Str::slug(Str::random(20)),
            'status'=>'active',
            'icon'=>'http://localhost:8000/files/categories/seeder/civil.jpeg',
            'created_at'=>now(),
            'updated_at'=>now()
        ]);
        DB::table('categories')->insert([
            'name'=>'Electrical Engineering',
            'slug'=>Str::slug(Str::random(20)),
            'status'=>'active',
            'icon'=>'http://localhost:8000/files/categories/seeder/electro.jpeg',
            'created_at'=>now(),
            'updated_at'=>now()
        ]);
        DB::table('categories')->insert([
            'name'=>'Mechanical Engineering',
            'slug'=>Str::slug(Str::random(20)),
            'status'=>'active',
            'icon'=>'http://localhost:8000/files/categories/seeder/mechanicalengineering.jpeg',
            'created_at'=>now(),
            'updated_at'=>now()
        ]);
        DB::table('categories')->insert([
            'name'=>'Architecture',
            'slug'=>Str::slug(Str::random(20)),
            'status'=>'active',
            'icon'=>'http://localhost:8000/files/categories/seeder/architecture.jpeg',
            'created_at'=>now(),
            'updated_at'=>now()
        ]);
        DB::table('categories')->insert([
            'name'=>'Customer Service',
            'slug'=>Str::slug(Str::random(20)),
            'status'=>'active',
            'icon'=>'http://localhost:8000/files/categories/seeder/customer.jpeg',
            'created_at'=>now(),
            'updated_at'=>now()
        ]);
        DB::table('categories')->insert([
            'name'=>'Supply Chain Management',
            'slug'=>Str::slug(Str::random(20)),
            'status'=>'active',
            'icon'=>'http://localhost:8000/files/categories/seeder/supplychain.jpeg',
            'created_at'=>now(),
            'updated_at'=>now()
        ]);
        DB::table('categories')->insert([
            'name'=>'Education and Teaching',
            'slug'=>Str::slug(Str::random(20)),
            'status'=>'active',
            'icon'=>'http://localhost:8000/files/categories/seeder/eduteach.jpeg',
            'created_at'=>now(),
            'updated_at'=>now()
        ]);
        DB::table('categories')->insert([
            'name'=>'Project Management',
            'slug'=>Str::slug(Str::random(20)),
            'status'=>'active',
            'icon'=>'http://localhost:8000/files/categories/seeder/projectmanagement.jpeg',
            'created_at'=>now(),
            'updated_at'=>now()
        ]);
        DB::table('categories')->insert([
            'name'=>'Business Analysis',
            'slug'=>Str::slug(Str::random(20)),
            'status'=>'active',
            'icon'=>'http://localhost:8000/files/categories/seeder/businessanalysis.jpeg',
            'created_at'=>now(),
            'updated_at'=>now()
        ]);

        //\App\Models\Category::factory(25)->create();
        // \App\Models\Category::factory(2)->create();
    }
}
