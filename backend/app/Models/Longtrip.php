<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Image\Manipulations;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Longtrip extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    public function registerMediaConversions(Media $media = null): void
    {
        $this->addMediaConversion('cover')
            ->format(Manipulations::FORMAT_WEBP)
            ->width(320)
            ->height(200)
            ->nonQueued();
    }

    protected $fillables = [  
        'title',
        'desc',
        'price',
        'trip',
        'options',
        'deactivate'
    ];

    public function requesttrips(){
        return $this->hasMany(Requesttrip::class);
    }
}
