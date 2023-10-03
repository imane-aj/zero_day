<?php

namespace Database\Factories;

use App\Models\Service;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Service>
 */
class ServiceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Service::class;

    public function definition(): array
    {
        $faker = \Faker\Factory::create();
        
        return [
            'title' => $faker->sentence,
            'desc' => $faker->paragraphs(5, true),
        ];
    }

    public function configureMediaCollections(): void
    {
        $this->afterCreating(function (Service $service) {
            $fakeImageUrl = $this->faker->imageUrl(800, 600, 'cars');
            $convertedImage = Image::make($fakeImageUrl)->encode('webp');
            
            $service->addMedia($convertedImage)
                ->toMediaCollection('services', 'public');
        });
    }
}
