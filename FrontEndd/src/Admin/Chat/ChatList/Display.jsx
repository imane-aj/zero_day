import React, { useEffect, useState } from 'react'
import { ShowChat, storeMsg } from '../../../Redux/ChatSlice';
import { useSelector } from 'react-redux';

export default function Display({id, dispatch}) {
    const chats = useSelector((state) => state.chat.chat)
    useEffect(() => {
        if(id){
            dispatch(ShowChat(id));
        }
    }, [id,dispatch]);
    const [msg, setMsg] = useState('')

    const handleSave = (e)=>{
        e.preventDefault()
        console.log('hello')
        var formData = new FormData();
        formData.append('msg', msg);
        dispatch(storeMsg({formData, chat_id:id})).then((res) => {
            if (res.type === 'chat/storeMsg/fulfilled') {
                setMsg('')
            }
        });
    };
    

  return (
    <div className="flex-1 justify-between flex flex-col h-[fit-content]">
    <div className="flex sm:items-center justify-between py-3 border-b border-[#cfcfcf]">
        <div className="relative flex items-center space-x-4">
            <div className="relative">
                <span className="absolute text-green-500 right-0 bottom-0">
                <svg width="20" height="20">
                    <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
                </svg>
                </span>
                <img src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144" alt="" className="w-10 sm:w-16 h-10 sm:h-16 rounded-full" />
            </div>
            <div className="flex flex-col leading-tight">
                <div className="text-2xl mt-1 flex items-center">
                {chats?.data?.map((val, idx) => {
                <span className="text-gray-700 mr-3">{val.user?.name}</span>
                })}
                </div>
            </div>
        </div>
    </div>
    <div id="messages" className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">

    {chats?.data?.map((val, idx) => {
    console.log(val); // Move the console.log here
    return (
        <div key={idx}>
            {val.user?.role === 'user' ? (
                <div className="chat-message">
                    <div className="flex items-end">
                        <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                            <div><span className="px-4 py-2 rounded-lg inline-block bg-success rounded-bl-none bg-gray-300 text-white">{val?.msg}</span></div>
                        </div>
                        <img src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144" alt="My profile" className="w-6 h-6 rounded-full order-1" />
                    </div>
                </div>
            ) : (
                <div className="chat-message">
                    <div className="flex items-end justify-end">
                        <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                            <div><span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue text-white ">{val?.msg}</span></div>
                        </div>
                        <img src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144" alt="My profile" className="w-6 h-6 rounded-full order-2" />
                    </div>
                </div>
            )}
        </div>
    );
})}


    </div>
        <div className="border-t border-[#cfcfcf] px-4 pt-4 mb-2 sm:mb-0">
            <div className="relative flex">
                <span className="absolute inset-y-0 flex items-center">
                    <button type="button" className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                    <i class="fa-regular fa-comment-dots"></i>
                    </button>
                </span>
                <input value={msg} onChange={(e)=>setMsg(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            // Call your message sending function here
                            handleSave(e);
                        }
                    }} type="text" placeholder="Write your message!" className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"/>
            </div>
        </div>
    </div>
  )
}
