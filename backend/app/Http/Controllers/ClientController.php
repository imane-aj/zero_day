<?php

namespace App\Http\Controllers;

use App\Models\Clients;
use Illuminate\Http\Request;

class ClientController extends BaseController
{
    //
    public function index(){
        $clients = Clients::OrderBy('id', 'desc')->paginate('5');
        try{
            return $this->sendResponse($clients, 200);
        }catch(\Exception $e){
            return $this->sendError($e);
        }
    }

    public function searchClient_admin(Request $request){
        $query = $request->get('query');
        $clients = Clients::where('fullName', 'like', '%' . $query . '%')
            ->orWhere('email', 'like', '%' . $query . '%')->get();
        try{
            return $this->sendResponse($clients, 200);
        }catch(\Exception $e){
            return $this->sendError($e);
        }
    }

    public function delete($id){
        $clients = Clients::findOrFail($id);
        try{
            return $this->sendResponse($clients->delete(), 'This job offre was deleted successfully');
        }catch(\Exception $e){
            return $this->sendError($e);
        }
    }
}
