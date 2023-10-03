<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Message>
 */
class MessageFactory extends Factory
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
            'msg' => $this->faker->sentence, // Generate a random sentence for the message content
            'chat_id' => \App\Models\Chat::factory(), // Create a Chat model and associate it with this message
            'user_id' => User::pluck('id')->random(),
            'created_at' => now(), // Set the created_at timestamp to the current time
            'updated_at' => now(), // Set the updated_at timestamp to the current time
        ];
    }
}
