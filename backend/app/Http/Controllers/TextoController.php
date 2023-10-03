<?php

namespace App\Http\Controllers;

use App\Models\Texto;
use Illuminate\Http\Request;

class TextoController extends BaseController
{
    //
    public function index(){
        $msg = Texto::OrderBy('id', 'desc')->paginate('7');
        try{
            return $this->sendResponse($msg, 200);
        }catch(\Exception $e){
            return $this->sendError($e);
        }
    }
 

    public function store(Request $request)
{
    try {
        // Validate the incoming data (you can customize this validation)
        $validatedData = $request->validate([
            'fullName' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'required|string|max:255',
            'msg' => 'required|string',
        ]);

        // Create a new message instance
        $message = new Texto();
        $message->fullName = $validatedData['fullName'];
        $message->email = $validatedData['email'];
        $message->subject = $validatedData['subject'];
        $message->msg = $validatedData['msg'];

        // Save the message to the database
        $message->save();

        // Optionally, you can redirect to a success page
        return  $this->sendResponse($message, 200);
    } catch (\Exception $e) {
        // Handle errors (e.g., log the error, display an error message)
        return $this->sendError($e);
    }
}



    public function delete($id){
        $msg = Texto::findOrFail($id);
        $msg->delete();
        try{
            return $this->sendResponse($msg, 200);
        }catch(\Exception $e){
            return $this->sendError($e);
        }
    }

    
    public function messages(Request $request)
    {
        $email = $request->input('email');
    
        try {
            // Fetch messages sent by the specified email
            $messages = Texto::where('email', $email)->orderBy('created_at', 'desc')
            ->get();
    
            return $this->sendResponse($messages, 200);
        } catch (\Exception $e) {
            return $this->sendError($e);
        }
    }
    
    






    public function search_msg(Request $request){
        $query = $request->get('query');
        $msg = Texto::where('fullName', 'like', '%' . $query . '%')
        ->orWhere('email','like','%' . $query . '%')
        ->get();
        try{
            return $this->sendResponse($msg, 200);
        }catch(\Exception $e){
            return $this->sendError($e);
        }
    }

    public function show($id){
        $msg = Texto::findOrFail($id);
        try{ 
            return $this->sendResponse($msg, 200);
        }catch(\Exception $e){
            return $this->sendError($e);
        }
    }
}
