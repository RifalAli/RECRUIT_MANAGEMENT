<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
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
            'icon'=>fake()->randomElement(['http://localhost:8000/files/categories/default.png', 'http://localhost:8000/files/categories/default1.png', 'http://localhost:8000/files/categories/default2.png', 'http://localhost:8000/files/categories/default3.png']),
            'status'=>fake()->randomElement(['active', 'inactive']),
            'job_count'=>fake()->numberBetween(0,10),
            'created_at'=>fake()->dateTimeThisYear(),
            'updated_at'=>fake()->dateTimeThisYear(),
        ];
    }
}
