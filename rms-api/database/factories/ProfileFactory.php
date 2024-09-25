<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Profile>
 */
class ProfileFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'fullname'=>fake()->sentence(3, true),
            'slug'=>fake()->unique()->slug(),
            'age'=>fake()->numberBetween(20, 40),
            'address'=>fake()->address(),
            'description'=>fake()->sentence(20, true),
            'last_education'=>fake()->randomElement(['S3', 'S2', 'S1', 'SMA/Sederajat']),
            'document_url'=>'http://localhost:8000/files/applications/default.pdf',
            'image'=>fake()->randomElement(['http://localhost:8000/files/profiles/default.png', 'http://localhost:8000/files/profiles/default1.png', 'http://localhost:8000/files/profiles/default2.png', 'http://localhost:8000/files/profiles/default3.png']),
            'user_id'=>fake()->randomElement(User::where('role', 'job seeker')->pluck('id')->toArray()),
            // 'dream_job'=>fake()->randomElement(Category::where('status', 'active')->pluck('id')->toArray()),
            // 'status'=>fake()->randomElement(['unemployed', 'employed']),
            'created_at'=>fake()->dateTimeThisYear(),
            'updated_at'=>fake()->dateTimeThisYear(),
        ];
    }
}
