<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CompanySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('companies')->insert([
            'name'=>'PT. Kompeni',
            'slug'=>Str::slug(Str::random(20)),
            'location'=>'Sidoarjo, Jawa Timur',
            'description'=>fake()->sentence(10, true),
            'user_id'=>2,
            'created_at'=>now(),
            'updated_at'=>now()
        ]);

        DB::table('companies')->insert([
            'name'=>'PT. Eka Lestari',
            'slug'=>Str::slug(Str::random(20)),
            'location'=>'Sidoarjo, Jawa Timur',
            'description'=>fake()->sentence(10, true),
            'user_id'=>4,
            'created_at'=>now(),
            'updated_at'=>now()
        ]);

        DB::table('companies')->insert([
            'name'=>'PT. Sinar Mas',
            'slug'=>Str::slug(Str::random(20)),
            'location'=>'Sidoarjo, Jawa Timur',
            'description'=>fake()->sentence(10, true),
            'user_id'=>5,
            'created_at'=>now(),
            'updated_at'=>now()
        ]);

        // \App\Models\Company::factory(5)->create();
    }
}
