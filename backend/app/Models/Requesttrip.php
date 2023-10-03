<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Requesttrip extends Model
{
    use HasFactory;
    protected $guarded = ['id']; 

    public function longTrip(){
        return $this->belongsTo(Longtrip::class,'longtrip_id');
    }
}
