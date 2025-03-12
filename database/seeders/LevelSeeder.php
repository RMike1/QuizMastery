<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Level;
use App\Models\Question;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class LevelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Level::factory()->count(4)->has(Question::factory()->count(5)->hasAnswers(4))->create();
    }
}
