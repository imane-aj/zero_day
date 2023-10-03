<?php

namespace App\Http\Controllers;

use App\Http\Requests\Trip\LangtripStoreRequest;
use App\Http\Requests\Trip\LontripUpdateRequest;
use App\Models\Longtrip;
use Illuminate\Http\Request;

class LangtripController extends BaseController
{
    //
    public function index(){

        $langtrips = Longtrip::where('deactivate', 'active')->orderBy('id', 'desc')->get();
        try{
            $langtrips->each(function ($langtrip) {
                $langtrip->cover_url = $langtrip->getFirstMediaUrl('longtrip', 'cover');
            });
            return $this->sendResponse($langtrips, 200);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }

    }

    public function show($id)
    {
        $langtrip = Longtrip::findOrFail($id);
        try{
            $langtrip->cover_url = $langtrip->getFirstMediaUrl('longtrip', 'cover');
            return $this->sendResponse($langtrip, 200);
        }catch(\Exception $e){
            return $this->sendError($e);
        }
    }

    public function store(LangtripStoreRequest $request){
        try{
            $longtrip = new Longtrip();
            $longtrip->title = $request->input('title');
            $longtrip->desc = $request->input('desc');
            $longtrip->price = $request->input('price');
            $longtrip->trip = $request->input('trip');
            $longtrip->options = $request->input('options');
            $longtrip->save();

            if (!is_null($request->file('img'))) {
    
                // Attempt to convert and store the image as webp format
                try {
                    $longtrip->addMediaFromRequest('img')->toMediaCollection('longtrip');
                } catch (\Exception $imageException) {
                    // Log or display the image conversion exception for debugging
                    dd($imageException->getMessage());
                }
            }

            return $this->sendResponse($longtrip, 200);
        }catch(\Exception $e){
            return $this->sendError($e);
        }
    }

    public function search(Request $request){
        $query = $request->get('query');
        $trip = Longtrip::where('title', 'like', '%' . $query . '%')->get();
        try{
            return $this->sendResponse($trip, 200);
        }catch(\Exception $e){
            return $this->sendError($e);
        }
    }

    public function update(LontripUpdateRequest $request, $id)
    {
        try {
            $longtrip = Longtrip::findOrFail($id);
            $longtrip->title = $request->input('title');
            $longtrip->desc = $request->input('desc');
            $longtrip->price = $request->input('price');
            $longtrip->trip = $request->input('trip');
            $longtrip->options = $request->input('options');
            
            // Save the Service model changes
            $longtrip->save();
            
            // Check if a new image was uploaded
            if ($request->hasFile('img')) {
                $imageFile = $request->file('img');
                // Replace the existing image in the 'images' collection
                $longtrip->clearMediaCollection('longtrip');
                $longtrip->addMedia($imageFile)->toMediaCollection('longtrip');
            }

            return $this->sendResponse($longtrip, 200);
        } catch (\Exception $e) {
            return $this->sendError($e);
        }
    }

    public function destroy($id)
    {
        try {
            $trip = Longtrip::findOrFail($id);
            
            // Delete the media associated with the 'images' collection
            $trip->clearMediaCollection('longtrip');
            
            // Delete the trip model
            $trip->delete();
            
            return $this->sendResponse('trip deleted successfully', 200);
        } catch (\Exception $e) {
            return $this->sendError($e);
        }
    }

    public function deactivate($id) {
        try {
            $trip = Longtrip::findOrFail($id);
            $trip->deactivate = 'inactive'; // Or whatever status represents deactivation
            $trip->save();
    
            return $this->sendResponse(['message' => 'trip deactivated successfully'], 200);
        } catch (\Exception $e) {
            return $this->sendError($e);
        }
    }
}
// solution transport
