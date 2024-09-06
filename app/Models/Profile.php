<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    use HasFactory;

    protected $fillable = ['fullname', 'slug', 'age', 'address', 'description', 'last_education', 'document_url', 'image', 'user_id'];
}
