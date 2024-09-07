<?php

namespace Database\Factories;

use App\Models\JobApplication;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ApplicationAnswer>
 */
class ApplicationAnswerFactory extends Factory
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
            'message'=>fake()->sentence(300),
            // 'meeting_date'=>now(),
            // 'meeting_link'=>fake()->url(),
            'application_id'=>fake()->randomElement(JobApplication::where('id', 1)->pluck('id')->toArray()),
            'created_at'=>now(),
            'updated_at'=>now()
        ];
    }
}
