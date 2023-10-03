<?php

namespace App\Http\Controllers;

use App\Http\Requests\DriverRequest;
use App\Models\Driver;
use Illuminate\Http\Request;

class DriverController extends BaseController
{
    //
    public function index(){
        $drivers = Driver::where('status', 'Encore')->orderBy('id', 'desc')->with('vehicule')->paginate('6');
        try{
            return $this->sendResponse($drivers, 200);
        }catch(\Exception $e){
            return $this->sendError($e);
        }
    }

    public function indexT(){
        $drivers = Driver::where('status', 'Validé')->orderBy('id', 'desc')->paginate('6');
        try{
            return $this->sendResponse($drivers, 200);
        }catch(\Exception $e){
            return $this->sendError($e);
        }
    }

    public function indexR(){
        $drivers = Driver::where('status', 'Refusé')->orderBy('id', 'desc')->paginate('6');
        try{
            return $this->sendResponse($drivers, 200);
        }catch(\Exception $e){
            return $this->sendError($e);
        }
    }

    
    public function store(DriverRequest $request){
        try{
            $driver = new Driver();
            $driver->name = $request->input('name');
            $driver->lastName = $request->input('lastName');
            $driver->phone = $request->input('phone');
            $driver->email = $request->input('email');
            $driver->matricule = $request->input('matricule');
            $driver->vehicule_id = $request->input('vehicule_id');
            $driver->save();

            return $this->sendResponse($driver, 200);
        }catch(\Exception $e){
            return $this->sendError($e);
        }
    }

     
    public function storeCommit(Request $request, $id){
        try{
            $driver = Driver::findOrFail($id);
            $driver->commit = $request->input('commit');
            $driver->save();

            return $this->sendResponse($driver, 200);
        }catch(\Exception $e){
            return $this->sendError($e);
        }
    }

    public function updateStatus(Request $request, $id){
        $driver = Driver::findOrFail($id);
        try{
            // Validate the incoming request data
            $request->validate([
                'status' => 'required',
            ]);

            // Update the status
            $driver->update([
                'status' => $request->status,
            ]);
      
            return $this->sendResponse($driver, 200);
        } catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    }

    public function searchDriver_admin(Request $request){
        $query = $request->get('query');
        $drivers = Driver::where('name', 'like', '%' . $query . '%')
            ->orWhere('lastName', 'like', '%' . $query . '%')->get();
        try{
            return $this->sendResponse($drivers, 200);
        }catch(\Exception $e){
            return $this->sendError($e);
        }
    }

    public function delete($id){
        $drivers = Driver::findOrFail($id);
        try{
            return $this->sendResponse($drivers->delete(), 'This job offre was deleted successfully');
        }catch(\Exception $e){
            return $this->sendError($e);
        }
    }
}