<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    use HasFactory;

    protected $fillable = ['fullname', 'slug', 'age', 'address', 'description', 'last_education', 'user_id', 'dream_job', 'status'];
}
