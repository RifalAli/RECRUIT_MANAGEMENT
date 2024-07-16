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
        DB::table('job_applications')->insert([
            'title'=>'Hello',
            'description'=>'Test Description',
            'document_url'=>'http://localhost:8000/files/applications/default.pdf',
            'status'=>'pending',
            'application_date'=>now(),
            'profile_id'=>1,
            'company_id'=>1,
            'job_id'=>1,
            'created_at'=>now(),
            'updated_at'=>now()
        ]);

        \App\Models\JobApplication::factory(5)->create();
    }
}
