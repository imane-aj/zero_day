<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        static  $count = 0;
        $users = [
            ['name' => fake()->name(), 'lastName'=>fake()->name(), 'email' => 'admin@exemple.com', 'email_verified_at' => now(), 'password' => bcrypt('admin'), 'remember_token' => Str::random(10), 'role' => 'admin'],
            ['name' => fake()->name(), 'lastName'=>fake()->name(), 'email' => 'user@user.com', 'email_verified_at' => now(), 'password' => bcrypt('user'), 'remember_token' => Str::random(10)],
            ['name' => fake()->name(), 'lastName'=>fake()->name(), 'email' => 'imane@user.com', 'email_verified_at' => now(), 'password' => bcrypt('user'), 'remember_token' => Str::random(10)],
            ['name' => fake()->name(), 'lastName'=>fake()->name(), 'email' => 'oumaima@user.com', 'email_verified_at' => now(), 'password' => bcrypt('user'), 'remember_token' => Str::random(10)],
            ['name' => fake()->name(), 'lastName'=>fake()->name(), 'email' => 'soufiane@user.com', 'email_verified_at' => now(), 'password' => bcrypt('user'), 'remember_token' => Str::random(10)],
            ['name' => fake()->name(), 'lastName'=>fake()->name(), 'email' => 'dareen@user.com', 'email_verified_at' => now(), 'password' => bcrypt('user'), 'remember_token' => Str::random(10)],
            ['name' => fake()->name(), 'lastName'=>fake()->name(), 'email' => 'jalila@user.com', 'email_verified_at' => now(), 'password' => bcrypt('user'), 'remember_token' => Str::random(10)],
            ['name' => fake()->name(), 'lastName'=>fake()->name(), 'email' => 'walid@user.com', 'email_verified_at' => now(), 'password' => bcrypt('user'), 'remember_token' => Str::random(10)],
            ['name' => fake()->name(), 'lastName'=>fake()->name(), 'email' => 'mohammed@user.com', 'email_verified_at' => now(), 'password' => bcrypt('user'), 'remember_token' => Str::random(10)],
            ['name' => fake()->name(), 'lastName'=>fake()->name(), 'email' => 'reda@user.com', 'email_verified_at' => now(), 'password' => bcrypt('user'), 'remember_token' => Str::random(10)],
        ];
        
        $user = $users[$count % count($users)];
        $count++;

        return $user;
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
