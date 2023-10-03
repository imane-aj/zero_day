<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class MessageController extends BaseController
{
    //
    public function index()
    {
        $chats = Chat::with(['messages' => function ($query) {
            $query->orderBy('created_at', 'desc')->first(); // Order messages by creation date and select the first (last) message
        }, 'messages.user'])->paginate(7);

        try{
            return $this->sendResponse($chats, 200);
        }catch(\Exception $e){
            return $this->sendError($e);
        }
    }
    

    public function chatStore(Request $request){
        $token = $request->bearerToken();
        $user = JWTAuth::parseToken()->authenticate();
        $chat = Chat::create([
            'user_id' => $user->id
        ]);
        try{
            return $this->sendResponse($chat, 200);
        }catch(\Exception $e){
            return $this->sendError($e);
        }
    }

    public function store(Request $request,$chat_id)
    {
        $token = $request->bearerToken();
        $user = JWTAuth::parseToken()->authenticate();
        // dd($user);
       // Validate the request data as needed
        $request->validate([
            'msg' => 'required|string',
        ]);

        // Create a new message in the chat
        $message = new Message([
            'msg' => $request->input('msg'),
        ]);

        // Associate the message with the authenticated user (assuming you have authentication set up)
        // $message->user_id = auth()->user()->id;
        $message->sender_id = $user->id;
       

        // Associate the message with the chat
        $message->chat_id = $chat_id;

        // Save the message
        $message->save();

        try {
            return $this->sendResponse($message, 200);
        } catch (\Exception $e) {
            return $this->sendError($e);
        }
    }

    public function show($id)
    {
        $chat = Chat::findOrFail($id);
        $chats = Message::where('chat_id', $chat->id)
        ->with('user') // Eager load the user relationship
        ->orderBy('created_at', 'asc') // Order by creation date in ascending order
        ->get();

        try{
            return $this->sendResponse($chats, 200);
        }catch(\Exception $e){
            return $this->sendError($e);
        }
    }
}
