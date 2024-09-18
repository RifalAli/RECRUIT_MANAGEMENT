<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ProfileSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('profiles')->insert([
            'fullname'=>'Anwar Prasetya',
            'slug'=>Str::slug(Str::random(20)),
            'age'=>'20',
            'address'=>'Sidoarjo, Jawa Timur',
            'description'=>"As a highly motivated and dedicated professional, I am committed to delivering exceptional results that exceed expectations. With a passion for innovation and a strong focus on achieving success, I continuously seek opportunities to grow and contribute meaningfully in any role I undertake.
            \n\nSince starting my career, I have developed a deep understanding of the industry and honed my skills in providing cutting-edge solutions that meet the diverse needs of clients. I take pride in my ability to adapt to changing demands, utilizing strategic insights and the latest technology to deliver reliable and effective results.
            \n\nDriven by a desire to excel, I prioritize integrity, quality, and personalized service in every task I take on. I believe in building lasting relationships through collaboration and mutual respect. By maintaining a growth-oriented mindset, I foster an environment where challenges are embraced as opportunities for development.
            \n\nI am excited to explore new opportunities and partner with organizations that share my commitment to excellence. Together, I believe we can drive innovation and create meaningful impact for all.",
            'last_education'=>'S1',
            // 'user_id'=>fake()->randomElement(User::where('role', 'job seeker')->pluck('id')->toArray()),
            'document_url'=>'http://localhost:8000/files/users/cv/samplecvrifal.pdf',
            // 'image'=>'http://localhost:8000/files/profiles/default.png',
            // 'status'=>'unemployed',
            'user_id'=>3,
            // 'dream_job'=>fake()->randomElement(Category::where('status', 'active')->pluck('id')->toArray()),
            'created_at'=>now(),
            'updated_at'=>now()
        ]);
        
        DB::table('profiles')->insert([
            'fullname'=>'Raymond Arnold',
            'slug'=>Str::slug(Str::random(20)),
            'age'=>'20',
            'address'=>'Sidoarjo, Jawa Timur',
            'description'=>"As a highly motivated and dedicated professional, I am committed to delivering exceptional results that exceed expectations. With a passion for innovation and a strong focus on achieving success, I continuously seek opportunities to grow and contribute meaningfully in any role I undertake.
            \n\nSince starting my career, I have developed a deep understanding of the industry and honed my skills in providing cutting-edge solutions that meet the diverse needs of clients. I take pride in my ability to adapt to changing demands, utilizing strategic insights and the latest technology to deliver reliable and effective results.
            \n\nDriven by a desire to excel, I prioritize integrity, quality, and personalized service in every task I take on. I believe in building lasting relationships through collaboration and mutual respect. By maintaining a growth-oriented mindset, I foster an environment where challenges are embraced as opportunities for development.
            \n\nI am excited to explore new opportunities and partner with organizations that share my commitment to excellence. Together, I believe we can drive innovation and create meaningful impact for all.",
            'last_education'=>'S1',
            // 'user_id'=>fake()->randomElement(User::where('role', 'job seeker')->pluck('id')->toArray()),
            'document_url'=>'http://localhost:8000/files/users/cv/samplecvrifal.pdf',
            // 'image'=>'http://localhost:8000/files/profiles/default.png',
            // 'status'=>'unemployed',
            'user_id'=>6,
            // 'dream_job'=>fake()->randomElement(Category::where('status', 'active')->pluck('id')->toArray()),
            'created_at'=>now(),
            'updated_at'=>now()
        ]);

        // \App\Models\Profile::factory(2)->create();
    }
}
