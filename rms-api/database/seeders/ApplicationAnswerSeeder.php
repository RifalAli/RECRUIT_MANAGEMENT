<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ApplicationAnswerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('application_answers')->insert([
            'title'=>'Hello',
            'description'=>'Test Description',
            'meeting_date'=>now(),
            'meeting_link'=>'http://www.zoom.com/qwerty',
            'application_id'=>1,
            'created_at'=>now(),
            'updated_at'=>now()
        ]);

        // \App\Models\ApplicationAnswer::factory(5)->create();
    }
}
