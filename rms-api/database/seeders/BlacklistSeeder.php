<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BlacklistSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('blacklists')->insert([
            'user_profile_id' => 3, 
            'user_company_id' => 2, 
            'created_at' => now(),
            'updated_at' => now()
        ]);

        // \App\Models\Blacklist::factory(10)->create();
    }
}
