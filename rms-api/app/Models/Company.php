<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'slug', 'location', 'description', 'user_id'];

    public function jobs() 
    {
        return $this->belongsToMany('App\Models\MainJob')->withTimestamps();
    }

    public function user() 
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
