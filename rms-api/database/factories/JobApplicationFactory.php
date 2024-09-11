<?php

namespace Database\Factories;

use App\Models\Company;
use App\Models\MainJob;
use App\Models\Profile;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\JobApplication>
 */
class JobApplicationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'status'=>fake()->randomElement(['pending', 'accepted', 'rejected']),
            'profile_id'=>fake()->randomElement(Profile::where('id', random_int(1, 2))->pluck('id')->toArray()),
            'company_id'=>fake()->randomElement(Company::where('id', random_int(1, 3))->pluck('id')->toArray()),
            'job_id'=>fake()->randomElement(MainJob::where('id', 1)->pluck('id')->toArray()),
            'created_at'=>now(),
            'updated_at'=>now()
        ];
    }
}
