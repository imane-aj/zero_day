<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;

    protected $fillable = [
        'startPoint',
        'endPoint',
        'disp',
        'tripType',
        'date',
        'heure',
        'price',
        'distance',
        'vehicule_id',
        'status',
        'deactivate',
        'min'
    ];

    public function vehicule()
    {
        return $this->belongsTo(Vehicule::class, 'vehicule_id');
    }

    public function client()
    {
        return $this->hasOne(Clients::class);
    }
    
}
