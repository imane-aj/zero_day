<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Image\Manipulations;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Transfer  extends Model implements HasMedia
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

    // public function registerMediaCollections(): void
    // {
    //     $this->addMediaCollection('images')
    //         ->useDisk('public') // Set the disk to 'public'
    //         ->singleFile(); // Optionally, set to single file upload
    // }

    protected $fillable = ['title', 'desc', 'deactivate', 'startPoint'];

}
