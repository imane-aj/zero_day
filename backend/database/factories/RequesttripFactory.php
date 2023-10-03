<?php

namespace Database\Factories;

use App\Models\Longtrip;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Requesttrip>
 */
class RequesttripFactory extends Factory
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
            'name' => fake()->name,
            'email' => fake()->unique()->safeEmail,
            'phone' => fake()->phoneNumber,
            'message' => fake()->paragraph,
            'longtrip_id' => function () {
                return Longtrip::factory()->create()->id;
            }
        ];
    }
}
