<?php

namespace Database\Factories;

use App\Models\Vehicule;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Driver>
 */
class DriverFactory extends Factory
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
            'lastName' => $this->faker->name,
            'name' => $this->faker->name,
            'Matricule'=> $this->faker->randomNumber(4, false),
            'phone' => $this->faker->phoneNumber,
            'vehicule_id' => Vehicule::pluck('id')->random(),
        ];
    }
}
