<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SafeInfo extends Model
{
    use HasFactory;

    protected $table = 'safe_infos'; // to‘g‘ri jadval nomi
    // Qaysi field’lar mass assignment bo‘lishiga ruxsat berish
    protected $fillable = [
        'full_name',
        'email',
        'phone',
        'subject',
        'message',
    ];
}
