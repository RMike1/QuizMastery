<?php

namespace Database\Factories;

use App\Models\Level;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Question>
 */
class QuestionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $levels=Level::pluck('id')->toArray();
        return [
            'question' => fake()->sentence(),
            'marks' => fake()->numberBetween(1, 10),
            'level_id'=>fake()->randomElement($levels)
        ];
    }
}
