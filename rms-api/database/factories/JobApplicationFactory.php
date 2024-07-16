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
            'title'=>fake()->sentence(3, false),
            'description'=>fake()->sentence(300),
            'status'=>fake()->randomElement(['pending', 'accepted', 'rejected']),
            'document_url'=>'http://localhost:8000/files/applications/default.pdf',
            'application_date'=>now(),
            'profile_id'=>fake()->randomElement(Profile::where('id', 1)->pluck('id')->toArray()),
            'company_id'=>fake()->randomElement(Company::where('id', 1)->pluck('id')->toArray()),
            'job_id'=>fake()->randomElement(MainJob::where('id', 1)->pluck('id')->toArray()),
            'created_at'=>now(),
            'updated_at'=>now()
        ];
    }
}
