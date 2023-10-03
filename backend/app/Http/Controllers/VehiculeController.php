<?php

namespace App\Http\Controllers;


use App\Http\Requests\vehicule\VehiculeStoreRequest;
use App\Http\Requests\vehicule\VehiculeUpdateRequest;
use App\Models\Vehicule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class VehiculeController extends BaseController
{
    //

    public function index(){

        $vehicules = Vehicule::OrderBy('id', 'desc')->paginate('6');
        try{
            return $this->sendResponse($vehicules, 200);
        }catch(\Exception $e){
            return $this->sendError($e);
        }

    }

    public function show($id)
    {
        $vehicules = Vehicule::findOrFail($id);
        try{
            return $this->sendResponse($vehicules, 200);
        }catch(\Exception $e){
            return $this->sendError($e);
        }
    }

    public function store(VehiculeStoreRequest $request){
        $Image = null;
        if ($request->hasFile('img')) {
            $file = $request->file('img');
            if ($file != null) {
                $Image = time() . '_' . $file->getClientOriginalName();
                $file->move(public_path('images/vehicule'), $Image);
            }
        }
        try{
            $vehicule = new Vehicule();
            $vehicule->type = $request->input('type');
            $vehicule->title = $request->input('title');
            $vehicule->options = $request->input('options');
            $vehicule->coefPrice = $request->input('coefPrice');
            $vehicule->taxe = $request->input('taxe');
            $vehicule->img = $Image ;
          
            $vehicule->save();
            return $this->sendResponse($vehicule, 200);
        }catch(\Exception $e){
            return $this->sendError($e);
        }
       

    
    }

    public function search_vehicule(Request $request){
        $query = $request->get('query');
        $vehicules = Vehicule::where('title', 'like', '%' . $query . '%')
        ->orWhere('type', 'like', '%' . $query . '%') 
        ->get();
        try{
            return $this->sendResponse($vehicules, 200);
        }catch(\Exception $e){
            return $this->sendError($e);
        }
    }

    public function update(VehiculeUpdateRequest $request, $id)
    {
        try {
            $vehicule = Vehicule::findOrFail($id);
            $oldImage = $vehicule->img; // Store the old image name before potential updates
            echo $oldImage;
            if ($request->hasFile('img')) {
                // Upload the new image
                $file = $request->file('img');
                $newImage = time() . '_' . $file->getClientOriginalName();
                $file->move(public_path('images/vehicule'), $newImage);
    
                // Delete the previous image if it exists
                if ($oldImage && File::exists(public_path('images/vehicule/' . $oldImage))) {
                    unlink(public_path('images/vehicule/' . $oldImage));
                }
                $vehicule->img = $newImage;
            }
            echo $newImage;
            // Update the vehicule fields with the new data
         
            $vehicule->type = $request->input('type');
            $vehicule->title = $request->input('title');
            $vehicule->options = $request->input('options');
            $vehicule->coefPrice = $request->input('coefPrice');
            $vehicule->taxe = $request->input('taxe');
            $vehicule->save();
            return $this->sendResponse($vehicule, 'vehicule offer updated successfully', 200);
        } catch (\Exception $e) {
            return $this->sendError($e);
        }
    }

    public function delete($id){
        $vehicule = Vehicule::findOrFail($id);
        $vehicule->delete();
        try{
            return $this->sendResponse($vehicule, 200);
        }catch(\Exception $e){
            return $this->sendError($e);
        }
    }
}
