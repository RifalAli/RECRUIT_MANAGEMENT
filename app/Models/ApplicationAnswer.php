<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ApplicationAnswer extends Model
{
    use HasFactory;
    protected $fillable = ['title', 'description', 'meeting_date', 'meeting_link', 'application_id'];

    public function application() 
    {
        return $this->belongsTo(JobApplication::class, 'application_id');
    }
}
