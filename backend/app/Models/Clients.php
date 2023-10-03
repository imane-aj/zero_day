<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Clients extends Model
{
    use HasFactory;
    protected $fillable = [
        'fullName',
        'email',
        'phone',
    ];

    public function reservation()
    {
        return $this->belongsTo(Reservation::class);
    }
}
