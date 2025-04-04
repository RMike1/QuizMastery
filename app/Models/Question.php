<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    /** @use HasFactory<\Database\Factories\QuestionFactory> */
    use HasFactory, HasUlids;

    protected $guarded = [];

    public function answers()
    {
        return $this->hasMany(Answer::class);
    }

    public function level()
    {
        return $this->belongsTo(Level::class);
    }
}
