<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Company>
 */
class CompanyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name'=>fake()->sentence(2, true),
            'slug'=>fake()->unique()->slug(),
            'location'=>fake()->address(),
            'description'=>fake()->sentence(10, true),
            'image'=>fake()->randomElement(['http://localhost:8000/files/companies/default.png', 'http://localhost:8000/files/companies/default1.png', 'http://localhost:8000/files/companies/default2.png', 'http://localhost:8000/files/companies/default3.png']),
            'user_id'=>fake()->randomElement(User::where('role', 'company')->pluck('id')->toArray()),
            'created_at'=>fake()->dateTimeThisYear(),
            'updated_at'=>fake()->dateTimeThisYear(),
        ];
    }
}
