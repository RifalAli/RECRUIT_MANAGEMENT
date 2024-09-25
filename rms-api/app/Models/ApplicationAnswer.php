<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ApplicationAnswer extends Model
{
    use HasFactory;
    protected $fillable = ['title', 'message', 'application_id'];

    public function application() 
    {
        return $this->belongsTo(JobApplication::class, 'application_id');
    }
}
