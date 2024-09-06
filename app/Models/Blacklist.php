<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blacklist extends Model
{
    use HasFactory;
    protected $fillable = ['user_profile_id', 'user_company_id'];

    public function userProfile() 
    {
        return $this->belongsTo(User::class, 'user_profile_id');
    }

    public function userCompany()
    {
        return $this->belongsTo(User::class, 'user_company_id');
    }
}
