<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Evento extends Model
{
    use HasFactory;

    protected $table = 'events';

    protected $fillable = [
        'name_event',
        'description',
        'rules',
        'awards',
        'admin_id',
    ];
}
