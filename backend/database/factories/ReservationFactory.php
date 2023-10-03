<?php

namespace Database\Factories;

use App\Models\Vehicule;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Reservation>
 */
class ReservationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $vehicule = Vehicule::first();
        $coefPrice = $vehicule->coefPrice;
        $taxe = $vehicule->taxe;
        $faker = \Faker\Factory::create('fr_FR');
        $disp = fake()->randomElement(['Immédiate', 'plus tard']);
        $distance = fake()->numberBetween(8, 50);
        $tripType = fake()->boolean;
        $date = (($tripType && ( $disp == 'plus tard' || $disp == 'Immédiate')) || (!$tripType && $disp == 'plus tard') ) ? fake()->dateTimeBetween('now','2023-10-01') : null ;
        $heure = ($tripType) ? fake()->numberBetween(1, 5) : null ;
        $min = fake()->randomFloat(2, 0, 100);

        $basePrice = 0;
        $amountToPay = 0;

        if($disp == 'Immédiate' && !$tripType){
            if($distance <= 6){
                $basePrice = (20*$coefPrice)+($min*0.3);
            }elseif($distance > 6 && $distance <= 50){
                $basePrice = ((20 + ($distance - 6) * 2.5) * $coefPrice)+($min*0.3);
            }elseif($distance > 50){
                $basePrice = ((20 + ($distance - 6) * 2) * $coefPrice)+($min*0.3);
            }
            $amountToPay = $basePrice + $taxe ;
        }elseif($disp == 'Immédiate' && $tripType){
            if($distance <= 6){
                $basePrice = (20 * $coefPrice) + (30 * $heure) + ($min*0.3);
            }elseif($distance > 6 && $distance <= 50){
                $basePrice = ((20 + ($distance - 6) * 2.5) * $coefPrice) + (30 * $heure)+($min*0.3);
            }elseif($distance > 50){
                $basePrice = ((20 + ($distance - 6) * 2) * $coefPrice) + (30 *  $heure)+($min*0.3);
            }
            $amountToPay = $basePrice + $taxe ;
        }elseif ($disp == 'plus tard' && !$tripType) {
            if ($distance <= 6) {
                $basePrice = (20 * $coefPrice) +($min*0.3);
            } elseif ($distance > 6 && $distance <= 50) {
                $basePrice = (20 + ($distance - 6) * 2.5) * $coefPrice + ($min*0.3);
            } elseif ($distance > 50) {
                $basePrice = (20 + ($distance - 6) * 2) * $coefPrice + ($min*0.3);
            }
            // Calculate total price, amount to pay, and remaining
            $totalPrice = $basePrice + $taxe; // Just an example, adjust accordingly
            $amountToPay = $totalPrice * 0.25;
            $rest = $totalPrice - $amountToPay;
        }elseif ($disp == 'plus tard' && $tripType) {
            if($distance <= 6){
                $basePrice = (20 * $coefPrice) + (30 * $heure)+($min*0.3);
            }elseif($distance > 6 && $distance <= 50){
                $basePrice = ((20 + ($distance - 6) * 2.5) * $coefPrice) + (30 * $heure)+($min*0.3);
            }elseif($distance > 50){
                $basePrice = ((20 + ($distance - 6) * 2) * $coefPrice) + (30 *  $heure)+($min*0.3);
            }
            $totalPrice = $basePrice + $taxe; // Just an example, adjust accordingly
            $amountToPay = $totalPrice * 0.25;
            $rest = $totalPrice - $amountToPay;
        }
             
        return [
            'startPoint' => $faker->city,
            'endPoint' => $faker->city,
            'disp' => $disp,
            'tripType' => $tripType,
            'date' => $date,
            'price' => $amountToPay,
            'distance' => $distance,
            'heure' => $heure,
            'min'=>$min,
            'vehicule_id' => $vehicule->id,
        ];
    }
}
