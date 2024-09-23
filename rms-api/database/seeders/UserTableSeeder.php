<?php

namespace Database\Seeders;

use Carbon\Carbon;
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
            'password' => bcrypt('aDm1n?'),
            'role' => 'admin',
            'verify' => 1,
            'otp' => null,
            'nik'=>'0065123456789123',
            'phone'=>'081234567891',
            'birthdate'=>Carbon::createFromFormat('d/m/Y', '25/09/1993'),
            'image' => 'http://localhost:8000/files/users/photo/seeder/admin.png',
            'status' => 'active',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('users')->insert([
            'slug' => Str::slug(Str::random(20)),
            'name' => "Company",
            'email' => "company@gmail.com",
            'password' => bcrypt('c0Mp4ny?'),
            'role' => 'company',
            'verify' => 1,
            'otp' => null,
            'nik'=>'0065123456789123',
            'phone'=>'081234567891',
            'birthdate'=>Carbon::createFromFormat('d/m/Y', '25/09/1993'),
            'image' => 'http://localhost:8000/files/users/photo/seeder/company.png',
            'status' => 'active',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('users')->insert([
            'slug' => Str::slug(Str::random(20)),
            'name' => "User",
            'email' => "user@gmail.com",
            'password' => bcrypt('uS3er?'),
            'role' => 'job seeker',
            'verify' => 1,
            'otp' => null,
            'nik'=>'0065123456789123',
            'phone'=>'081234567891',
            'birthdate'=>Carbon::createFromFormat('d/m/Y', '25/09/2003'),
            'image' => 'http://localhost:8000/files/users/photo/seeder/user.jpg',
            'status' => 'active',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('users')->insert([
            'slug' => Str::slug(Str::random(20)),
            'name' => "Lestari",
            'email' => "lestari@gmail.com",
            'password' => bcrypt('L3st4r1?'),
            'role' => 'company',
            'verify' => 1,
            'otp' => null,
            'nik'=>'0065123456789123',
            'phone'=>'081234567891',
            'birthdate'=>Carbon::createFromFormat('d/m/Y', '25/09/1993'),
            'image' => 'http://localhost:8000/files/users/photo/seeder/lestari.jpg',
            'status' => 'active',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('users')->insert([
            'slug' => Str::slug(Str::random(20)),
            'name' => "Sinarmas",
            'email' => "sinarmas@gmail.com",
            'password' => bcrypt('sin4Rm4s?'),
            'role' => 'company',
            'verify' => 1,
            'otp' => null,
            'nik'=>'0065123456789123',
            'phone'=>'081234567891',
            'birthdate'=>Carbon::createFromFormat('d/m/Y', '25/09/1993'),
            'image' => 'http://localhost:8000/files/users/photo/seeder/sinarmas.jpeg',
            'status' => 'active',
            'created_at' => now(),
            'updated_at' => now()
        ]);
        
        DB::table('users')->insert([
            'slug' => Str::slug(Str::random(20)),
            'name' => "Raymond",
            'email' => "raymond@gmail.com",
            'password' => bcrypt('r4yMond?'),
            'role' => 'job seeker',
            'verify' => 1,
            'otp' => null,
            'nik'=>'0065123456789123',
            'phone'=>'081234567891',
            'birthdate'=>Carbon::createFromFormat('d/m/Y', '25/09/2003'),
            'image' => 'http://localhost:8000/files/users/photo/seeder/raymond.jpg',
            'status' => 'active',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('users')->insert([
            'slug' => Str::slug(Str::random(20)),
            'name' => "John",
            'email' => "john@gmail.com",
            'password' => bcrypt('j0HnD03?'),
            'role' => 'job seeker',
            'verify' => 1,
            'otp' => null,
            'nik'=>'0065123456789123',
            'phone'=>'081234567891',
            'birthdate'=>Carbon::createFromFormat('d/m/Y', '25/09/2003'),
            'image' => 'http://localhost:8000/files/users/photo/seeder/john.jpg',
            'status' => 'active',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        // \App\Models\User::factory(10)->create();
    }
}
