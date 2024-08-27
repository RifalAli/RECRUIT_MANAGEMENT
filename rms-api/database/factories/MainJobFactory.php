<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Company;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MainJob>
 */
class MainJobFactory extends Factory
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
            'slug'=>fake()->unique()->slug(),
            'salary'=>fake()->numberBetween(30000, 45000),
            'expire_at'=>fake()->dateTimeBetween('+1 month', '+2 month'),
            'cat_id'=>fake()->randomElement(Category::where('status', 'active')->pluck('id')->toArray()),
            'company_id'=>fake()->randomElement(Company::where('id', 1)->pluck('id')->toArray()),
            'icon'=>fake()->randomElement(['http://localhost:8000/files/jobs/default.png', 'http://localhost:8000/files/jobs/default1.png', 'http://localhost:8000/files/jobs/default2.png', 'http://localhost:8000/files/jobs/default3.png']),
            'description'=>fake()->sentence(300),
            'status'=>fake()->randomElement(['active', 'inactive']),
            'type'=>fake()->randomElement(['full time', 'part time']),
            'is_featured'=>fake()->randomElement([true, false]),
            'created_at'=>now(),
            'updated_at'=>now()
        ];
    }
}
