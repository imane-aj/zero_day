<?php

namespace App\Http\Controllers;

use App\Http\Requests\Requests;
use App\Models\Longtrip;
use App\Models\Requestservice;
use App\Models\Requesttrip;
use App\Models\Service;
use GuzzleHttp\Psr7\ServerRequest;
use Illuminate\Http\Request;

class RequestsController extends BaseController
{
    //
    public function service(){
        $service = Requestservice::orderBy('status', 'asc')->orderBy('id', 'desc')
                    ->with('service')->paginate('4');
        try{
            return $this->sendResponse($service, 200);
        }catch(\Exception $e){
            return $this->sendError($e);
        }
    }

    public function trip(){
        $trip = Requesttrip::orderBy('status', 'asc')->orderBy('id', 'desc')
                ->with('longTrip')->paginate('4');
        try{
            return $this->sendResponse($trip, 200);
        }catch(\Exception $e){
            return $this->sendError($e);
        }
    }


    public function search_service(Request $request){
        $query = $request->get('query');
        $service = Requestservice::where('name', 'like', '%' . $query . '%')->with('service')->get();
        try{
            return $this->sendResponse($service, 200);
        }catch(\Exception $e){
            return $this->sendError($e);
        }
    }

    public function search_trip(Request $request){
        $query = $request->get('query');
        $trip = Requesttrip::where('name', 'like', '%' . $query . '%')->with('longTrip')->get();
        try{
            return $this->sendResponse($trip, 200);
        }catch(\Exception $e){
            return $this->sendError($e);
        }
    }

    public function service_show($id){
        $service = Requestservice::with('service')->findOrFail($id);
        try{
            return $this->sendResponse($service, 200);
        }catch(\Exception $e){
            return $this->sendError($e);
        }
    }

    public function trip_show($id){
        $trip = Requesttrip::with('longTrip')->findOrFail($id);
        try{
            return $this->sendResponse($trip, 200);
        }catch(\Exception $e){
            return $this->sendError($e);
        }
    }

    public function updateStatusService(Request $request, $id){
        $service = Requestservice::findOrFail($id);
        try{
            // Validate the incoming request data
            $request->validate([
                'status' => 'required',
            ]);

            // Update the status
            $service->update([
                'status' => $request->status,
            ]);
      
            return $this->sendResponse($service, 200);
        } catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    }

    public function updateStatusTrip(Request $request, $id){
        $trip = Requesttrip::findOrFail($id);
        try{
            // Validate the incoming request data
            $request->validate([
                'status' => 'required',
            ]);

            // Update the status
            $trip->update([
                'status' => $request->status,
            ]);
      
            return $this->sendResponse($trip, 200);
        } catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    }


    public function store_service_request(Requests $request){
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'message' => 'string',
            'service_id' => 'required|exists:services,id', // Make sure 'longtrip_id' exists in the 'longtrips' table
        ]);
    
        // Create a new request
        $requestservice = Requestservice::create($validatedData);
    
        // Optionally, you can return a response to indicate success
        return response()->json(['message' => 'Request created successfully', 'data' => $requestservice], 201);
        // $demande = Service::fincdOrFail($id);
        // try{
        //     $service_req = new Requestservice();
        //     $service_req->name = $request->input('name');
        //     $service_req->email = $request->input('email');
        //     $service_req->phone = $request->input('phone') ;
        //     $service_req->message = $request->input('message');
        //     $service_req->service_id = $demande;
        //     $service_req->save();
            
        //     return $this->sendResponse($service_req, 200);
        // }catch(\Exception $e){
        //     return $this->sendError($e);
        // }
    }

    public function store_trip_request(Requests $request){
          // Validate the incoming data
          $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'message' => 'string',
            'longtrip_id' => 'required|exists:longtrips,id', // Make sure 'longtrip_id' exists in the 'longtrips' table
        ]);

        // Create a new request
        $requesttrip = Requesttrip::create($validatedData);

        // Optionally, you can return a response to indicate success
        return response()->json(['message' => 'Request created successfully', 'data' => $requesttrip], 201);
    //     $id = $request->input('longtrip_id');
    //     $demande = Longtrip::fincdOrFail($id);
    //     try{
    //         $trip_req = new Requestservice();
    //         $trip_req->name = $request->input('name');
    //         $trip_req->email = $request->input('email');
    //         $trip_req->phone = $request->input('phone') ;
    //         $trip_req->message = $request->input('message');
    //         $trip_req->service_id = $demande;
    //         $trip_req->save();
            
    //         return $this->sendResponse($trip_req, 200);
    //     }catch(\Exception $e){
    //         return $this->sendError($e);
    //     }
    // }
}

    public function storePriceServce(Request $request,$id){
        try {
            $service_req = Requestservice::findOrFail($id);
            $service_req->price = $request->price;
            $service_req->save(); // Use save() method to update the model
            return $this->sendResponse($service_req, 200);
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }

    public function storePriceTrip(Request $request,$id){
        try {
            $trip_req = Requesttrip::findOrFail($id);
            $trip_req->price = $request->price;
            $trip_req->save(); // Use save() method to update the model
            return $this->sendResponse($trip_req, 200);
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }
}
