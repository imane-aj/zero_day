<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;
    protected $fillable  = ['chat_id', 'msg', 'sender_id'];

    public function user(){
        return $this->belongsTo(User::class, 'sender_id'); // 'sender_id' is the foreign key in the messages table
    }

    public function chat()
    {
        return $this->belongsTo(Chat::class);
    }
}
