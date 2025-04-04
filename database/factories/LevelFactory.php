<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Level>
 */
class LevelFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $user = User::first()->id;

        return [
            'level' => fake()->randomElement([1, 2, 3, 4]),
            'total_questions' => fake()->randomElement([1, 2, 3, 4]),
            'user_id' => $user,
        ];
    }
}
