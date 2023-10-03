<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\DriverController;
use App\Http\Controllers\LangtripController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\RequestsController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\TextoController;
use App\Http\Controllers\TransferController;
use App\Http\Controllers\VehiculeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Spatie\Permission\Models\Permission;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::group(['middleware' => ['api'], 'namespace' => 'Api'], function(){

    Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:api');
    Route::post('login', [AuthController::class, 'login'])->name('login');
    Route::post('signup', [AuthController::class, 'register'])->name('register');
    Route::post('store_message', [TextoController::class, 'store']);
    Route::post('messages_client', [TextoController::class, 'messages']);

   //reservation
    Route::post('calcul_reservation', [ReservationController::class, 'calcul']);
    Route::post('reservation', [ReservationController::class, 'store']);
    Route::post('reservation/{id}', [ReservationController::class, 'storeByType']);
    Route::get('reservations/{email}', [ReservationController::class, 'getReservationsByEmail']);

    //blog
    Route::get('blog', [BlogController::class, 'index']);
    Route::get('blog/article/{id}', [BlogController::class, 'show']);

    //services
    Route::get('services', [ServiceController::class, 'index']);
    Route::get('services/service/{id}', [ServiceController::class, 'show']);
    
    //LongTrip
    Route::get('trips', [LangtripController::class, 'index']);
    Route::get('trips/trip/{id}', [LangtripController::class, 'show']);
   

    //Requests
    Route::post('service_request_store', [RequestsController::class, 'store_service_request']);
    Route::post('trip_request_store', [RequestsController::class, 'store_trip_request']);
   

    //messages
    Route::get('chats', [MessageController::class, 'index']);
    Route::post('chat/{chat_id}/', [MessageController::class, 'store']);
    Route::post('chat', [MessageController::class, 'chatStore']);
    Route::get('chats/chat/{id}', [MessageController::class, 'show']);

    //transfer
    Route::get('transfers', [TransferController::class, 'index']);
    Route::get('transfers/transfer/{id}', [TransferController::class, 'show']);
    
   

    //vehicule 
    Route::get('vehicules', [VehiculeController::class, 'index']);
    Route::get('vehicules/{id}', [VehiculeController::class, 'show']);
   
    Route::post('store_driver', [DriverController::class, 'store']);

    Route::middleware('auth:api', 'role:admin')->group(function () {
        Route::middleware(['role:admin'])->group(function () {

        Route::get('admins-permissions', [AdminController::class, 'getUserPermissions']);
        //reservation
        Route::get('reservations', [ReservationController::class, 'index']);
        Route::post('reservation/{id}/status', [ReservationController::class, 'updateStatus']);
        Route::post('reservation/search', [ReservationController::class, 'search']);
        Route::post('reservation/{id}/deactivate', [ReservationController::class, 'deactivate']);
        Route::get('show_reservation/{id}', [ReservationController::class, 'show']);
        Route::get('statistics', [ReservationController::class, 'calculateStatistics']);

        //request
        Route::get('service_request', [RequestsController::class, 'service']);
        Route::get('trip_request', [RequestsController::class, 'trip']); 
        Route::post('trip_request/{id}', [RequestsController::class, 'updateStatusTrip']);
        Route::post('service_request/{id}', [RequestsController::class, 'updateStatusService']);
        Route::post('service_request_search', [RequestsController::class, 'search_service']);
        Route::post('trip_request_search', [RequestsController::class, 'search_trip']);
        Route::get('service_request/{id}/display', [RequestsController::class, 'service_show']);
        Route::get('trip_request/{id}/display', [RequestsController::class, 'trip_show']);
        Route::post('service/{id}/price', [RequestsController::class, 'storePriceServce']);
        Route::post('trip/{id}/price', [RequestsController::class, 'storePriceTrip']);

        //vehicule
        Route::post('new_vehicules', [VehiculeController::class, 'store']);
        Route::post('search_vehicule', [VehiculeController::class, 'search_vehicule']);
        Route::post('vehicule/update/{id}', [VehiculeController::class, 'update']);
        Route::delete('vehicule/{id}', [VehiculeController::class, 'delete']);

        //services
        Route::post('new_service', [ServiceController::class, 'store']);
        Route::delete('service/{id}', [ServiceController::class, 'destroy']);
        Route::post('search_service', [ServiceController::class, 'search']);
        Route::post('service/update/{id}', [ServiceController::class, 'update']);
        Route::post('service/{id}/desctivate', [ServiceController::class, 'deactivate']);

        //longTrip
        Route::post('new_trip', [LangtripController::class, 'store']);
        Route::delete('trip/{id}', [LangtripController::class, 'destroy']);
        Route::post('search_trip', [LangtripController::class, 'search']);
        Route::post('trip/update/{id}', [LangtripController::class, 'update']);
        Route::post('trip/{id}/desctivate', [LangtripController::class, 'deactivate']);

        //transfer
        Route::post('new_transfer', [TransferController::class, 'store']);
        Route::delete('transfer/{id}', [TransferController::class, 'destroy']);
        Route::post('search_transfer', [TransferController::class, 'search']);
        Route::post('transfer/update/{id}', [TransferController::class, 'update']);
        Route::post('transfer/{id}/desctivate', [TransferController::class, 'deactivate']);

        //blog
        Route::post('addNewPost', [BlogController::class, 'store']);
        Route::delete('post/{id}', [BlogController::class, 'delete']);
        Route::post('search_post', [BlogController::class, 'search_post']);
        Route::post('post/update/{id}', [BlogController::class, 'update']);

        //clients
        Route::get('clients', [ClientController::class, 'index']);
        Route::post('search/client', [ClientController::class, 'searchClient_admin']);
        Route::delete('client/{id}', [ClientController::class, 'delete']);

        //msgs
        Route::get('messages', [TextoController::class, 'index']);
        Route::delete('message/{id}', [TextoController::class, 'delete']);
        Route::post('search/message', [TextoController::class, 'search_msg']);
        Route::get('message/{id}', [TextoController::class, 'show']);

        Route::post('/create-sub-admin', [AdminController::class, 'createSubAdmin']);
        Route::post('update-sub-admin/{id}', [AdminController::class, 'updateSubAdmin']);
        Route::get('get-sub-admin/{id}', [AdminController::class, 'getSubAdmin']);
        Route::get('/permissions', function () {
            return response()->json(Permission::all());
        });
        Route::get('permissions', [AdminController::class, 'getPermissions']);
        Route::get('getUsersWithPermissions', [AdminController::class, 'getUsersWithPermissions']);
        Route::get('users', [AdminController::class, 'users']);
        Route::delete('users/{id}', [AdminController::class, 'deleteUser']);

        //driver

        Route::delete('driver/{id}', [DriverController::class, 'delete']);
        Route::post('searchDriver_admin', [DriverController::class, 'searchDriver_admin']);
        Route::post('driver/update/{id}', [DriverController::class, 'updateStatus']);
        Route::get('drivers_demande', [DriverController::class, 'index']);
        Route::get('drivers', [DriverController::class, 'indexT']);
        Route::get('drivers_refuse', [DriverController::class, 'indexR']);
        Route::post('driver/commit/{id}', [DriverController::class, 'storeCommit']);
        });
    });
});
