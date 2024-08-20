<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            'slug' => Str::slug(Str::random(20)),
            'name' => "Admin",
            'email' => "admin@gmail.com",
            'password' => '$2y$12$oJPfTnyfRh1qLKPIwbwmUuO1To1IQwucPPK0RY7s3RiBbe1Ruvo56', //password: admin123
            'role' => 'admin',
            'verify' => 1,
            'otp' => null,
            'image' => 'http://localhost:8000/files/users/default.png',
            'status' => 'active',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('users')->insert([
            'slug' => Str::slug(Str::random(20)),
            'name' => "Company",
            'email' => "company@gmail.com",
            'password' => '$2y$12$Eilaj1G04vWIhfw8PZwtDe4n6inJJ9MPkVw.Wimk5ZWEV9hOdxQRm', //password: company123
            'role' => 'company',
            'verify' => 1,
            'otp' => null,
            'image' => 'http://localhost:8000/files/users/default.png',
            'status' => 'active',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('users')->insert([
            'slug' => Str::slug(Str::random(20)),
            'name' => "Fahri",
            'email' => "bizreave@gmail.com",
            'password' => '$2y$12$kuhfR4YQTQH6/wxhU0PcKueofBTJOGsUyk5yn1nsW85rPJTbm3Wbm', //password: bizreril
            'role' => 'job seeker',
            'verify' => 1,
            'otp' => null,
            'image' => 'http://localhost:8000/files/users/default.png',
            'status' => 'active',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        // \App\Models\User::factory(10)->create();
    }
}
