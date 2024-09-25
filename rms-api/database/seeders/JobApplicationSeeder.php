<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class JobApplicationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // DB::table('job_applications')->insert([
        //     'status'=>'accepted',
        //     'profile_id'=>1,
        //     'company_id'=>1,
        //     'job_id'=>1,
        //     'created_at'=>now(),
        //     'updated_at'=>now()
        // ]);

        // DB::table('job_applications')->insert([
        //     'status'=>'pending',
        //     'profile_id'=>1,
        //     'company_id'=>1,
        //     'job_id'=>1,
        //     'created_at'=>now(),
        //     'updated_at'=>now()
        // ]);

        \App\Models\JobApplication::factory(10)->create();
    }
}
