<?php

namespace App\Http\Controllers;

use App\Http\Requests\Transfer;
use App\Models\Transfer as ModelsTransfer;
use Illuminate\Http\Request;

class TransferController extends BaseController
{
    //


    public function index(){

        $transfers = ModelsTransfer::where('deactivate', 'active')->orderBy('id', 'desc')->paginate('3');
        try{
            $transfers->each(function ($transfer) {
                $transfer->cover_url = $transfer->getFirstMediaUrl('transfer', 'cover');
            });
            return $this->sendResponse($transfers, 200);
        }catch(\Exception $e){
            return $this->sendError($e);
        }

    }

    public function show($id)
    {
        $transfer = ModelsTransfer::findOrFail($id);
        try{
            $transfer->cover_url = $transfer->getFirstMediaUrl('transfer', 'cover');
            
            return $this->sendResponse($transfer, 200);
        }catch(\Exception $e){
            return $this->sendError($e);
        }
    }


    public function store(Transfer $request){
        try{
            $transer = new ModelsTransfer();
            $transer->title = $request->input('title');
            $transer->desc = $request->input('desc');
            $transer->startPoint = $request->input('startPoint');
            $transer->save();
            
            if (!is_null($request->file('img'))) {
    
                // Attempt to convert and store the image as webp format
                try {
                    $transer->addMediaFromRequest('img')->toMediaCollection('transfer');
                } catch (\Exception $imageException) {
                    // Log or display the image conversion exception for debugging
                    // dd($imageException->getMessage());
                }
            }
            return $this->sendResponse($transer, 200);
        }catch(\Exception $e){
            return $this->sendError($e);
        }
    }

    public function search(Request $request){
        $query = $request->get('query');
        $transfer = ModelsTransfer::where('title', 'like', '%' . $query . '%')->get();
        try{
            return $this->sendResponse($transfer, 200);
        }catch(\Exception $e){
            return $this->sendError($e);
        }
    }

    public function update(Transfer $request, $id)
    {
        try {
            $Transfer = ModelsTransfer::findOrFail($id);
            $Transfer->title = $request->input('title');
            $Transfer->desc = $request->input('desc');
            $Transfer->startPoint = $request->input('startPoint');
            
            // Save the Transfer model changes
            $Transfer->save();
            
            // Check if a new image was uploaded
            if ($request->hasFile('img')) {
                $imageFile = $request->file('img');
                // Replace the existing image in the 'images' collection
                $Transfer->clearMediaCollection('transfer');
                $Transfer->addMedia($imageFile)->toMediaCollection('transfer');
            }

            return $this->sendResponse($Transfer, 200);
        } catch (\Exception $e) {
            return $this->sendError($e);
        }
    }

    public function destroy($id)
    {
        try {
            $transfer = ModelsTransfer::findOrFail($id);
            
            // Delete the media associated with the 'images' collection
            $transfer->clearMediaCollection('transfers');
            
            // Delete the transfer model
            $transfer->delete();
            
            return $this->sendResponse('transfer deleted successfully', 200);
        } catch (\Exception $e) {
            return $this->sendError($e);
        }
    }

    public function deactivate($id) {
        try {
            $transfer = ModelsTransfer::findOrFail($id);
            $transfer->deactivate = 'inactive'; // Or whatever status represents deactivation
            $transfer->save();
    
            return $this->sendResponse(['message' => 'transfer deactivated successfully'], 200);
        } catch (\Exception $e) {
            return $this->sendError($e);
        }
    }

}
