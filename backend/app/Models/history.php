<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class history extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'category',
        'audience',
        'front_page',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
