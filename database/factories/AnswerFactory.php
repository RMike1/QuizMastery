<?php

namespace Database\Factories;

use App\Models\Question;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Answer>
 */
class AnswerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $questionIds = Question::pluck('id')->toArray();
        return [
            'answer' => fake()->sentence(),
            'question_id' => fake()->randomElement($questionIds), 
            'is_correct' => fake()->boolean()
        ];
    }
}
