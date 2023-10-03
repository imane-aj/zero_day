<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vehicule extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'title',
        'options',
        'img',
        'coefPrice',
        'taxe',
    ];

    public function reservation(){
        return $this->belongsTo(Reservation::class);
    }
}
