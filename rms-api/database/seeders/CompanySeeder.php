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
            'name'=>'PT. Tes Migrasi',
            'slug'=>Str::slug(Str::random(20)),
            'location'=>'Sidoarjo, Jawa Timur',
            'description'=>fake()->sentence(10, true),
            'user_id'=>1,
            'created_at'=>now(),
            'updated_at'=>now()
        ]);

        \App\Models\Company::factory(5)->create();
    }
}
