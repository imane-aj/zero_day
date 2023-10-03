<?php

namespace App\Http\Controllers;

use App\Models\Clients;
use App\Models\Requestservice;
use App\Models\Requesttrip;
use App\Models\Reservation;
use App\Models\Transfer;
use App\Models\Vehicule;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class ReservationController extends BaseController
{
    //
    public function index(){
         // Get all Transfer records
         $transfers = Transfer::all();
         // Create an array to store the 'startPoint' values from Transfer records
         $startPoints = $transfers->pluck('startPoint')->toArray();

        $reservLate = Reservation::where('deactivate', 'active')->where('disp', 'Plus tard')
            ->where(function ($query) {
                $query->where('status', 'Confirmé')
                    ->orWhere('status', 'Encore');
            })->whereNotIn('startPoint', $startPoints)->OrderBy('status' , 'desc')->OrderBy('id' , 'desc')->with('vehicule')->paginate('5');
        $reservNow = Reservation::where('deactivate', 'active')->where('status', 'Confirmé')
            ->orWhere('status', 'Encore')->where('disp', 'Immédiate')->OrderBy('status' , 'desc')->whereNotIn('startPoint', $startPoints)
            ->OrderBy('id' , 'desc')->with('vehicule')->paginate('5');
        $valide = Reservation::where('deactivate', 'active')->where('status', 'Confirmé')->OrderBy('status' , 'desc')
            ->OrderBy('id' , 'desc')->with('vehicule')->paginate('5');

       
        $transfer = Reservation::where('deactivate', 'active')
            ->where(function ($query) {
                $query->where('status', 'Confirmé')
                    ->orWhere('status', 'Encore');
            })
            ->whereIn('startPoint', $startPoints) // Use the $startPoints array from Transfer records
            ->orderBy('status', 'desc')
            ->orderBy('id', 'desc')
            ->with('vehicule')
            ->paginate(5);
        $archive = Reservation::where('deactivate', 'active')->with('vehicule')->where('status', 'Validé ')->OrderBy('id' ,'desc')->paginate('5');
        try{ 
        return $this->sendResponse(['reservLate' => $reservLate, 'reservNow' => $reservNow, 'archive'=>$archive, 'valide'=>$valide, 'transfer'=>$transfer], 200);
        }catch(\Exception $e){
        return $this->sendError($e);
        };
    }

    // public function calculateDistance($startPoint, $endPoint){
    //     // Replace with your Google Distance Matrix API key
    //     $apiKey = 'AIzaSyBzicnv66AK3T5mIVZgakYxhBSneuCySGY';

    //     // Initialize the Guzzle HTTP client
    //     $client = new Client();

    //     // Build the Distance Matrix API request URL
    //     $url = "https://maps.googleapis.com/maps/api/distancematrix/json?origins=$startPoint&destinations=$endPoint&key=$apiKey";

    //     try {
    //         // Send the API request
    //         $response = $client->get($url);

    //         // Parse the JSON response
    //         $data = json_decode($response->getBody(), true);

    //         // Check if the API request was successful
    //         if ($data['status'] === 'OK') {
    //             // Extract the distance value (in meters) from the response
    //             $distanceInMeters = $data['rows'][0]['elements'][0]['distance']['value'];

    //             // Convert the distance to a more readable format (e.g., kilometers)
    //             $distanceInKilometers = $distanceInMeters / 1000;

    //             return $distanceInKilometers;
    //         } else {
    //             // Handle API error here if needed
    //             return 'API Error';
    //         }
    //     } catch (\Exception $e) {
    //         // Handle any exceptions (e.g., network errors)
    //         return 'Exception: ' . $e->getMessage();
    //     }
    // }

    public function calcul(Request $request){
        $vehicles = Vehicule::all();

        // Initialize an empty array to store the results for each vehicle
        $results = [];
    
        foreach ($vehicles as $vehicule) {
            // Calculate price and other details based on inputs
            $coefPrice = $vehicule->coefPrice;
            $taxe = $vehicule->taxe;
            $distance = $request->input('distance');//distance
            $disp = $request->input('disp'); // type
            $tripType = $request->input('tripType');// selectedTrajet
            $heure = $request->input('heure');// selected Datetime
            $min = $request->input('min');// selected min
            $basePrice = 0;
    
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
                // Calculate total price, amount to pay, and remaining
                $totalPrice = $basePrice + $taxe; // Just an example, adjust accordingly
                $amountToPay = $totalPrice * 0.25;
                $rest = $totalPrice - $amountToPay;
            }
    
            // Calculate total price, amount to pay, and remaining
            // $totalPrice = $basePrice + $taxe;
            // $amountToPay = $totalPrice * 0.25;
            // $rest = $totalPrice - $amountToPay;
            $amountToPay = number_format($amountToPay, 2, '.', '');
            // Create a result array for the current vehicle
            $result = [
                'vehicle' => $vehicule->type,
                'vehicle_id' => $vehicule->id,
                'price' => $amountToPay,
                'vehicle_taxe' => $vehicule->taxe,
            ];
    
            // Add the result to the results array
            $results[] = $result;
        }
    
        // Return the results as a JSON response
        return response()->json($results);
    }

    public function store(Request $request, $startPoint = null){

        $vehiculeId = $request->input('vehicule_id');
        $vehicule = Vehicule::findOrFail($vehiculeId);

        $reservation = new Reservation([
            // 'startPoint' => $request->input('startPoint'),
            'endPoint' => $request->input('endPoint'),
            'disp' => $request->input('disp'),
            'tripType' => $request->input('tripType'),
            'date' => $request->input('date'),
            'price' => $request->input('price'),
            'distance' => $request->input('distance'),
            'heure' => $request->input('heure'),
            'min' => $request->input('min'),
            'vehicule_id' => $vehicule->id,
        ]);

        if (!empty($startPoint)) {
            $reservation['startPoint'] = $startPoint;
        } elseif ($request->has('startPoint')) {
            $reservation['startPoint'] = $request->input('startPoint');
        }
    
            $reservation->save();
     
        $clt = new Clients();
        $clt->fullName = $request->input('fullName');
        $clt->email = $request->input('email'); 
        $clt->phone = $request->input('phone'); 
        $clt->reservation_id = $reservation->id;
        

        try{ 
            $clt->save();
            return $this->sendResponse($reservation, 200);
        }catch(\Exception $e){
            return $this->sendError($e);
        };

    }

    public function storeByType(Request $request, $id){

        $vehicule = Vehicule::findOrFail($id);

        // Calculate price and other details based on inputs
        $coefPrice = $vehicule->coefPrice;
        $taxe = $vehicule->taxe;
        $distance = $request->input('distance');
        $disp = $request->input('disp');
        $tripType = $request->input('tripType');
        $heure = $request->input('heure');
        $basePrice = 0;

        if($disp == 'Immédiate' && !$tripType){
            if($distance <= 8){
                $basePrice = 20*$coefPrice;
            }elseif($distance > 8 && $distance <= 50){
                $basePrice = (20 + ($distance - 8) * 2.5) * $coefPrice;
            }elseif($distance > 50){
                $basePrice = (20 + ($distance - 8) * 2) * $coefPrice;
            }
            $amountToPay = $basePrice + $taxe ;
        }elseif($disp == 'Immédiate' && $tripType){
            if($distance <= 8){
                $basePrice = (20 * $coefPrice) + (30 * $heure);
            }elseif($distance > 8 && $distance <= 50){
                $basePrice = ((20 + ($distance - 8) * 2.5) * $coefPrice) + (30 * $heure);
            }elseif($distance > 50){
                $basePrice = ((20 + ($distance - 8) * 2) * $coefPrice) + (30 *  $heure);
            }
            $amountToPay = $basePrice + $taxe ;
        }elseif ($disp == 'plus tard' && !$tripType) {
            if ($distance <= 8) {
                $basePrice = 20 * $coefPrice;
            } elseif ($distance > 8 && $distance <= 50) {
                $basePrice = (20 + ($distance - 8) * 2.5) * $coefPrice;
            } elseif ($distance > 50) {
                $basePrice = (20 + ($distance - 8) * 2) * $coefPrice;
            }
            // Calculate total price, amount to pay, and remaining
            $totalPrice = $basePrice + $taxe; // Just an example, adjust accordingly
            $amountToPay = $totalPrice * 0.25;
            $rest = $totalPrice - $amountToPay;
        }elseif ($disp == 'plus tard' && $tripType) {
            if($distance <= 8){
                $basePrice = (20 * $coefPrice) + (30 * $heure);
            }elseif($distance > 8 && $distance <= 50){
                $basePrice = ((20 + ($distance - 8) * 2.5) * $coefPrice) + (30 * $heure);
            }elseif($distance > 50){
                $basePrice = ((20 + ($distance - 8) * 2) * $coefPrice) + (30 *  $heure);
            }
            // Calculate total price, amount to pay, and remaining
            $totalPrice = $basePrice + $taxe; // Just an example, adjust accordingly
            $amountToPay = $totalPrice * 0.25;
            $rest = $totalPrice - $amountToPay;
        }

        $reservation = new Reservation([
            'startPoint' => $request->input('startPoint'),
            'endPoint' => $request->input('endPoint'),
            'disp' => $request->input('disp'),
            'tripType' => $request->input('tripType'),
            'date' => $request->input('date'),
            'price' => $amountToPay,
            'distance' => $request->input('distance'),
            'heure' => $request->input('heure'),
            'vehicule_id' => $vehicule->id,
        ]);
        try{ 
            $reservation->save();
            return $this->sendResponse($reservation, 200);
        }catch(\Exception $e){
            return $this->sendError($e);
        };

    }

    public function updateStatus(Request $request, $id){
        $reservation = Reservation::findOrFail($id);
        try{
            // Validate the incoming request data
            $request->validate([
                'status' => 'required',
            ]);

            // Update the status
            $reservation->update([
                'status' => $request->status,
            ]);
      
            return $this->sendResponse($reservation, 200);
        } catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    }

    public function search(Request $request){
        $query = $request->get('query');
        $reserv = Reservation::where('startPoint', 'like', '%' . $query . '%')
                              ->orWhere('endPoint', 'like', '%' . $query . '%')  
                              ->orWhere('tripType', 'like', '%' . $query . '%')  
                              ->orWhere('status', 'like', '%' . $query . '%')  
                              ->get();
        try{
            return $this->sendResponse($reserv, 200);
        }catch(\Exception $e){
            return $this->sendError($e);
        }
    }

    public function deactivate($id) {
        try {
            $reservation = Reservation::findOrFail($id);
            $reservation->deactivate = 'inactive'; // Or whatever status represents deactivation
            $reservation->save();
    
            return $this->sendResponse(['message' => 'Reservation deactivated successfully'], 200);
        } catch (\Exception $e) {
            return $this->sendError($e);
        }
    }

    public function calculateStatistics(Request $request)
{
    // $user = JWTAuth::parseToken()->authenticate();
    // if($user){

    // }
    $transfers = Transfer::all();
    // Create an array to store the 'startPoint' values from Transfer records
    $startPoints = $transfers->pluck('startPoint')->toArray();

    $totalReservations = Reservation::where('deactivate', 'active')->count();
    $totalImmediateReservations = Reservation::where('deactivate', 'active')->whereNotIn('startPoint', $startPoints)->where('disp', 'Immédiate')->count();
    $totalFutureReservations = Reservation::where('deactivate', 'active')->where('disp', 'Plus tard')->whereNotIn('startPoint', $startPoints)->count();
    $transferReservations = Reservation::where('deactivate', 'active')->whereIn('startPoint', $startPoints)->count();
    $averageDistance = Reservation::where('deactivate', 'active')->avg('distance');
    $tripReq = Requesttrip::count();
    $serviceReq = Requestservice::count();

    $revenueByMonth = Reservation::where('deactivate', 'active')
    ->where('status', 'Valide')
    ->selectRaw('LPAD(MONTH(created_at), 2, "0") as month')
    ->selectRaw('SUM(price) as revenue')
    ->groupBy('month')
    ->orderBy('month')
    ->get();

    $transfers = Transfer::all();
    $startPoints = $transfers->pluck('startPoint')->toArray();

    $revenueByDisp = Reservation::where('deactivate', 'active')
    ->where('status', 'Valide')
    ->whereNotIn('startPoint', $startPoints)
    ->whereIn('disp', ['immediate', 'plus tard'])
    ->selectRaw('disp, SUM(price) as revenue')
    ->groupBy('disp')
    ->get();

    $revenueByTransfer = Reservation::where('deactivate', 'active')
    ->where('status', 'Valide')
    ->whereIn('startPoint', $startPoints)
    ->selectRaw('SUM(price) as revenue')
    ->get();
    
    // Create a common structure for the merged data
    $mergedData = [
        'revenueByDisp' => $revenueByDisp->toArray(),
        'revenueByTransfer' => $revenueByTransfer->toArray(),
    ];

    // Convert the merged data to JSON
    // $mergedDataJson = json_encode($mergedData);

    $vehicles = Vehicule::all();
    $results = [];

    foreach ($vehicles as $vehicule) {
        $totalReservationsByType = Reservation::where('deactivate', 'active')->where('vehicule_id', $vehicule->id)->count();

        $result = [
            'vehicle' => $vehicule->type,
            'totalReservations' => $totalReservationsByType,
        ];

        $results[] = $result;
    }

    return $this->sendResponse([
        'totalReservations' => $totalReservations,
        'totalImmediateReservations' => $totalImmediateReservations,
        'totalFutureReservations' => $totalFutureReservations,
        'averageDistance' => $averageDistance,
        'reservationsByVehicleType' => $results,
        'transferReservations' => $transferReservations,
        'tripReq' => $tripReq,
        'serviceReq'=>$serviceReq,
        'revenueByMonth'=>$revenueByMonth,
        'mergedData'=>$mergedData
        // 'revenueByDisp'=>$revenueByDisp,
        // 'revenueByTransfer'=>$revenueByTransfer
    ], 200);
}

    public function show($id){
        $reserv = Reservation::with('client', 'vehicule')->findOrFail($id);
        try{ 
        return $this->sendResponse($reserv, 200);
        }catch(\Exception $e){
        return $this->sendError($e);
        };
    }



    public function getReservationsByEmail($email)
    {
        try {
            // Find the client by email
            $clients = Clients::where('email', $email)->get();
    
            if ($clients->isEmpty()) {
                // If no clients were found, return an empty response or an error as needed
                return $this->sendResponse([], 200);
            }
            $reservationsIds = $clients->map(function ($client) {
                return $client->reservation_id;
            })->flatten()->toArray();


    // Loop through each reservation ID and fetch the corresponding reservation
    $reservations = [];

    // Loop through each reservation ID and fetch the corresponding reservation
    foreach ($reservationsIds as $reservationId) {
        $reservation = Reservation::find($reservationId);
        if ($reservation) {
            $reservations[] = $reservation;
        }
    }
            return $this->sendResponse($reservations, 200);
        } catch (\Exception $e) {
            return $this->sendError($e);
        }
    }
    
}
