<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Level;
use Illuminate\Database\Seeder;
use Database\Seeders\LevelSeeder;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'first_name' => 'Jon',
            'last_name' => 'Snow',
            'email' => 'jonsnow@gmail.com',
            'password' => 1234,
        ]);
        $this->call(([
            LevelSeeder::class,
        ]));
    }
}
