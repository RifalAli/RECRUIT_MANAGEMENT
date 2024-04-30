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
            'name' => "Mahedi Hasan",
            'email' => "mahedisr@gmail.com",
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llc/.og/at2.uheWG/igi', //password
            'is_Admin' => true,
            'image' => 'http://localhost:8000/files/users/default.png',
            'status' => 'active',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        \App\Models\User::factory(10)->create();
    }
}
