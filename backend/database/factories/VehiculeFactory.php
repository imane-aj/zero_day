<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Vehicule>
 */
class VehiculeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $type = fake()->randomElement([
            'waycab green', 'waycab Break', 'waycab Van', 'waycab Business'
        ]);
        $coefPrice = ($type === 'waycab green' || $type === 'waycab Break') ? 1.0 : 1.5;
    
        return [
            'type' => $type,
            'title' => fake()->words(2, true),
            'options' => 'option1, option2, option3',
            'img' => fake()->imageUrl(), // Generate a placeholder image URL
            'coefPrice' => $coefPrice,
            'taxe' => fake()->numberBetween(5, 20),
        ];
    }
}
