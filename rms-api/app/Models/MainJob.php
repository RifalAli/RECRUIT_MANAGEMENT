<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MainJob extends Model
{
    use HasFactory;
    protected $fillable = ['title', 'slug', 'company', 'location', 'email', 'salary', 'expire_at', 'cat_id', 'company_id', 'description', 'status', 'type', 'is_featured'];

    public function category() 
    {
        return $this->belongsTo(Category::class, 'cat_id');
    }

    public function company()
    {
        return $this->belongsTo(Company::class, 'company_id');
    }
}