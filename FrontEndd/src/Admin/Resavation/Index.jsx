import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Search_reserv } from '../../Redux/ReservationSlice';

export default function Index() {
    const [searchQuery, setSearchQuery] = useState('');
    const dispatch = useDispatch();
    const onChange =(e)=>{
        const query = e.target.value
        setSearchQuery(query)
        dispatch(Search_reserv(query));
    }
  return (
    <>
    <div className='mb-6 flex flex-col md:flex-row md:justify-between'>
        <h3 className='my-3 w-[fit-content] border-r-gray-3 '>Reservations</h3>
        <form>   
            <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input type="search" id="default-search" className="block p-4 pl-10 text-sm text-gray-900 border border-bodydark1 rounded-lg bg-gray-50 focus:ring-bodydark1 focus:border-y-gray-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" onChange={onChange}
                    placeholder="Search..." required autoComplete="off"/>
                <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
            </div>
        </form>
    </div>

    {/* <List searchQuery={searchQuery} dispatch={dispatch}/> */}
    </>
  )
}
