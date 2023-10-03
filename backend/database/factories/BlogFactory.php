<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Blog>
 */
class BlogFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $faker = \Faker\Factory::create();
        static $count = 0;
        $articles = [
            [ 'user_id' => 1,'title' => 'Évènements Mémorables : La Flotte WayCab au Service de Vos Besoins','article' => "Lorsque vous organisez un évènement spécial, la logistique des déplacements peut être un facteur
                    clé de son succès. C'est là que WayCab intervient, en mettant à votre disposition une flotte de
                    véhicules professionnels pour garantir des déplacements fluides et mémorables. Découvrez
                    comment notre service de taxi peut contribuer à faire de votre évènement un moment inoubliable.", 'img' => 'article1.jpg'],
            [ 'user_id' => 1,'title' => 'Gestion Sans Stress pour Vos Invités','article' => "Des mariages aux conférences d'entreprise, assurer le transport de vos invités peut être un véritable
                    défi. Avec WayCab, cette tâche devient simple. Notre équipe expérimentée gère les déplacements en
                    coordonnant les horaires et en veillant à ce que chaque invité arrive à destination en toute
                    tranquillité.", 'img' => 'article2.webp'],
            [ 'user_id' => 1,'title' => 'Flotte Adaptée à Votre Évènement','article' => "Nous comprenons que chaque évènement est unique. C'est pourquoi notre flotte de véhicules peut
                    être adaptée en fonction de la taille de votre groupe et de vos préférences. Des voitures élégantes
                    pour les évènements intimes aux vans spacieux pour les groupes plus importants, nous avons la
                    solution de transport parfaite pour vous.
                    ", 'img' => 'article3.jpg'],
            [ 'user_id' => 1,'title' => 'Service Personnalisé pour Vos Invités','article' => "Offrez à vos invités un service personnalisé qui reflète le prestige de votre évènement. Nos
                    chauffeurs professionnels assurent un accueil chaleureux et un voyage confortable. Vos invités se
                    sentiront pris en charge et apprécieront le luxe de se laisser guider sans souci.", 'img' => 'article3.jpg'],
            [ 'user_id' => 1,'title' => 'Profitez de Chaque Instant de Votre Évènement', 'article' => "Avec WayCab à vos côtés, vous pourrez vous concentrer sur l'essentiel : profiter de votre évènement
                    et créer des souvenirs précieux. Que ce soit pour un évènement corporatif ou une célébration
                    personnelle, notre service de taxi personnalisé vous permettra de vivre chaque instant en toute
                    sérénité.<br> Lorsque vous planifiez un évènement mémorable, chaque détail compte. Le transport de vos invités
                    ne devrait pas être une source de préoccupation. Faites confiance à WayCab pour gérer les
                    déplacements avec professionnalisme, élégance et efficacité, afin que vous puissiez vous concentrer
                    sur ce qui compte vraiment : créer des moments inoubliables.
                    ", 'img' => 'article3.jpg'],
        ];
        $article = $articles[$count % count($articles)];
        $count++;

        return $article;
    }
}
