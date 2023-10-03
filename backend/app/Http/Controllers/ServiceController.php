<?php

namespace App\Http\Controllers;

use App\Http\Requests\Service\ServiceStoreRequest;
use App\Http\Requests\Service\ServiceUpdateRequest;
use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends BaseController
{
    //
    public function index(){

        $services = Service::where('deactivate', 'active')->orderBy('id', 'desc')->paginate('3');
        try{
            $services->each(function ($service) {
                $service->cover_url = $service->getFirstMediaUrl('services', 'cover');
            });
            return $this->sendResponse($services, 200);
        }catch(\Exception $e){
            return $this->sendError($e);
        }

    }

    public function show($id)
    {
        $service = Service::findOrFail($id);
        try{
            $service->cover_url = $service->getFirstMediaUrl('services', 'cover');
            
            return $this->sendResponse($service, 200);
        }catch(\Exception $e){
            return $this->sendError($e);
        }
    }

    public function store(ServiceStoreRequest $request){
        try{
            $service = new Service();
            $service->title = $request->input('title');
            // $service->titleEn = $request->input('titleEn');
            // $service->titleHl = $request->input('titleHl');
            $service->desc = $request->input('desc');
            // $service->descEn = $request->input('descEn');
            // $service->descHl = $request->input('descHl');
            $service->save();
            
            if (!is_null($request->file('img'))) {
    
                // Attempt to convert and store the image as webp format
                try {
                    $service->addMediaFromRequest('img')->toMediaCollection('services');
                } catch (\Exception $imageException) {
                    // Log or display the image conversion exception for debugging
                    dd($imageException->getMessage());
                }
            }
            return $this->sendResponse($service, 200);
        }catch(\Exception $e){
            return $this->sendError($e);
        }
    }

    public function search(Request $request){
        $query = $request->get('query');
        $posts = Service::where('title', 'like', '%' . $query . '%')->get();
        try{
            return $this->sendResponse($posts, 200);
        }catch(\Exception $e){
            return $this->sendError($e);
        }
    }

    public function update(ServiceUpdateRequest $request, $id)
    {
        try {
            $service = Service::findOrFail($id);
            $service->title = $request->input('title');
            // $service->titleEn = $request->input('titleEn');
            // $service->titleHl = $request->input('titleHl');
            $service->desc = $request->input('desc');
            // $service->descEn = $request->input('descEn');
            // $service->descHl = $request->input('descHl');
            
            // Save the Service model changes
            $service->save();
            
            // Check if a new image was uploaded
            if ($request->hasFile('img')) {
                $imageFile = $request->file('img');
                // Replace the existing image in the 'images' collection
                $service->clearMediaCollection('services');
                $service->addMedia($imageFile)->toMediaCollection('services');
            }

            return $this->sendResponse($service, 200);
        } catch (\Exception $e) {
            return $this->sendError($e);
        }
    }

    public function destroy($id)
    {
        try {
            $service = Service::findOrFail($id);
            
            // Delete the media associated with the 'images' collection
            $service->clearMediaCollection('services');
            
            // Delete the Service model
            $service->delete();
            
            return $this->sendResponse('Service deleted successfully', 200);
        } catch (\Exception $e) {
            return $this->sendError($e);
        }
    }

    public function deactivate($id) {
        try {
            $service = Service::findOrFail($id);
            $service->deactivate = 'inactive'; // Or whatever status represents deactivation
            $service->save();
    
            return $this->sendResponse(['message' => 'service deactivated successfully'], 200);
        } catch (\Exception $e) {
            return $this->sendError($e);
        }
    }


}
