<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Level extends Model
{
    /** @use HasFactory<\Database\Factories\LevelFactory> */
    use HasFactory, HasUlids;
    protected $guarded = [];

    public function questions(){
        return $this->hasMany(Question::class);
    }
    public function answers(){
        return $this->hasManyThrough(Answer::class,Question::class);
    }
}
