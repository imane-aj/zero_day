<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class LongtripFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            //
            'title' => fake()->sentence,
            // 'img' => fake()->imageUrl(640, 480, 'nature'), // Generate a random image URL
            'desc' => fake()->paragraph,
            'price' => fake()->randomFloat(2, 100, 1000),
            'trip' => fake()->word,
            'options' => 'option1, option2, option3', // Example JSON data
        ];
    }
}
