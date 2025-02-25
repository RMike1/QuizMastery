<?php

namespace Database\Seeders;

use App\Models\User;
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
        $user=User::first()->id;
        DB::table('levels')->insert([
            [
                'id'=>Str::ulid(),
                'level'=>1,
                'total_questions'=>5,
                'user_id'=>$user
            ],
            [
                'id'=>Str::ulid(),
                'level'=>2,
                'total_questions'=>10,
                'user_id'=>$user
            ],
            [
                'id'=>Str::ulid(),
                'level'=>3,
                'total_questions'=>15,
                'user_id'=>$user
            ],
            [
                'id'=>Str::ulid(),
                'level'=>4,
                'total_questions'=>20,
                'user_id'=>$user
            ],
        ]);
    }
}
