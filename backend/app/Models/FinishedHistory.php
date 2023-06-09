<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FinishedHistory extends Model
{
    use HasFactory;

    protected $fillable = [
        'front_page',
        'title',
        'description',
        'category',
        'audience',
        'user_id',
        'history_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function history()
    {
        return $this->belongsTo(History::class, 'history_id');
    }
}
