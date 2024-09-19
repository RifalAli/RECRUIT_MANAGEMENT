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
            'image' => 'http://localhost:8000/files/users/profileGuest.png',
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
            'image' => 'http://localhost:8000/files/users/photo/companyGuest.png',
            'status' => 'active',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('users')->insert([
            'slug' => Str::slug(Str::random(20)),
            'name' => "User",
            'email' => "user@gmail.com",
            'password' => '$2y$12$6p8EEyTbhmafFN9YU5bkFOIFFe/IJ6/ziFcvJ1bcJwm./SOT5r7R6', //password: user123
            'role' => 'job seeker',
            'verify' => 1,
            'otp' => null,
            'image' => 'http://localhost:8000/files/users/photo/profileGuest.png',
            'status' => 'active',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('users')->insert([
            'slug' => Str::slug(Str::random(20)),
            'name' => "Lestari",
            'email' => "lestari@gmail.com",
            'password' => '$2y$12$DlprnQyrfAkNFkV4A0KY7eLj3ZD0w4SIPzR/XsxMIA3TCWoAsK8/a', //password: lestari123
            'role' => 'company',
            'verify' => 1,
            'otp' => null,
            'image' => 'http://localhost:8000/files/users/photo/companyGuest.png',
            'status' => 'active',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('users')->insert([
            'slug' => Str::slug(Str::random(20)),
            'name' => "Sinarmas",
            'email' => "sinarmas@gmail.com",
            'password' => '$2y$12$hAKQhH/In.1.5hdW6eUblO/GdvZU8tPSa01zPBZJO4viGGz0Zp7Ta', //password: sinarmas123
            'role' => 'company',
            'verify' => 1,
            'otp' => null,
            'image' => 'http://localhost:8000/files/users/photo/companyGuest.png',
            'status' => 'active',
            'created_at' => now(),
            'updated_at' => now()
        ]);
        
        DB::table('users')->insert([
            'slug' => Str::slug(Str::random(20)),
            'name' => "Raymond",
            'email' => "raymond@gmail.com",
            'password' => '$2y$12$cHvK2rxjGfiELKPMKh/jZOLmm0Jcufw/S4adS1LHUeJnpHRVdut0O', //password: sinarmas123
            'role' => 'job seeker',
            'verify' => 1,
            'otp' => null,
            'image' => 'http://localhost:8000/files/users/photo/profileGuest.png',
            'status' => 'active',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('users')->insert([
            'slug' => Str::slug(Str::random(20)),
            'name' => "john@gmail",
            'email' => "john@gmail.com",
            'password' => '$2y$12$7HONLX3t9c41J89GCJdoVOftMf5aE0pIr26weJL/q3wWOzvNGQA9e', //password: john123
            'role' => 'job seeker',
            'verify' => 1,
            'otp' => null,
            'image' => 'http://localhost:8000/files/users/photo/profileGuest.png',
            'status' => 'active',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        // \App\Models\User::factory(10)->create();
    }
}
