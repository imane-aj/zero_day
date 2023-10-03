import React, { useEffect, useState } from 'react'
import Display from './Display'
import { chats } from '../../../Redux/ChatSlice';
import { useSelector } from 'react-redux';
import { url } from '../../../Redux/Utils';
import { Link } from 'react-router-dom';

export default function ChatList({dispatch, searchQuery}) {
    const chat = useSelector((state) => state.chat.data)
    const searchResults = useSelector((state) => state.chat.search)
    const [dataToDisplay, setDataToDisplay] = useState([]); // Initially set to all data
    const [id, setId] = useState('')
    // console.log(chat.data)
    useEffect(() => {
        dispatch(chats(`${url}chats?page=1`));
    }, [dispatch]);

    const handlePagination = (url) => {
        console.log('Pagination URL:', url);
        dispatch(LongTrips(url));
    };

    useEffect(() => {
        if (searchResults.data && searchQuery) {
          setDataToDisplay(searchResults.data);
        } else {
          setDataToDisplay(chat?.data);
        }
      }, [searchResults, chat?.data, searchQuery]);
    
      const check = (e, chat_id) => {
        e.preventDefault()
        setId(chat_id)
        console.log(chat_id)
      }
  return (
    <div className='flex flex-row gap-15'>
        <div className='shadow-2xl px-5 h-full'>
            {dataToDisplay?.map((val,idx)=>(
                    <div key={idx} className='flex flex-row gap-4 mt-7'>
                        <img src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144" alt="My profile" className="w-10 h-10 rounded-full "/>
                       <div className='pb-7'>
                            <button onClick={(e) => check(e,val.messages[0]?.chat_id)} className='text-[#808080]'>{val.messages[0]?.user?.name}</button>
                            <p className="text-black dark:text-white m-auto">{val.messages[0]?.msg}</p>
                       </div>
                    </div>
            ))}
        </div>
        <Display id={id} dispatch={dispatch}/>
    </div>
  )
}
