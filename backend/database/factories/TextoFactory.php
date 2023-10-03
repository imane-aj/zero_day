<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Texto>
 */
class TextoFactory extends Factory
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
            'fullName' =>fake()->name,
            'email' =>fake()->email,
            'subject' =>fake()->sentence,
            'msg' =>fake()->paragraph,
        ];
    }
}
