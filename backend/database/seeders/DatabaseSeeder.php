<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Clients;
use App\Models\Driver;
use App\Models\Texto;
use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
        \App\Models\Vehicule::factory(4)->create();
        \App\Models\Reservation::factory(10)->create();
        \App\Models\User::factory(9)->create();
        \App\Models\Blog::factory(6)->create();
        \App\Models\Service::factory(3)->create();
        \App\Models\Longtrip::factory(6)->create();
        \App\Models\Requestservice::factory(6)->create();
        \App\Models\Requesttrip::factory(6)->create();
        // \App\Models\Chat::factory(3)->create();
        // \App\Models\Message::factory(12)->create();
         //texto
        Texto::factory()->count(10)->create();
        //client
        Clients::factory()->count(10)->create();
        //driver
        Driver::factory()->count(10)->create();

        //admin
        $adminPermissions = [
            'Reservations',
            'Messsages',
            'Client',
            'Blog',
            'Transfers','LongTrip',
            'Services','Vehicules',
            'Demandes',
            'Permissions',
        ];

        foreach($adminPermissions as $permission){
            Permission::create([
                'name' => $permission
            ]);
        }
        $admin = Role::create(['name' => 'Admin']);
        foreach($adminPermissions as $permission){
            $admin->givePermissionTo($permission);
        }
        $adminPer = User::where('email', 'admin@exemple.com')->first();
        foreach($adminPermissions as $permission){
            $adminPer->givePermissionTo($permission);
        }

        //client
         $userPermissions = [
            'index_reservation',
            'store_reservation',
            'calcul_reservation',
            'show_blog',
            'index_blog','show_service',
            'index_service','show_longTrip',
            'index_longTrip',
            'store_trip_request','store_service_request',
            'store_msg','show_msg','index_msg',
            'show_transfer','index_transfer',
            'show_vehicule','index_vehicule'

        ];
        $user = Role::create(['name' => 'user']);
         foreach($userPermissions as $permission){
            Permission::create([
                'name' => $permission
            ]);
        }
        foreach($userPermissions as $permission){
            $user->givePermissionTo($permission);
        }
    }
}
