import React from 'react'
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { handleSearch } from '../../Redux/LongTripSlice';
import LongTripList from './LongTripList';

export default function Index() {
    const [searchQuery, setSearchQuery] = useState('');
    const dispatch = useDispatch();
    const onChange =(e)=>{
        const query = e.target.value
        setSearchQuery(query)
        dispatch(handleSearch(query));
      }
  return (
    <>
    <div className='mb-6 flex flex-col md:flex-row md:justify-between'>
        <Link to = 'nouvelle_voyage_long_duree' className='my-3 w-[fit-content] inline-block rounded bg-blite px-6 pb-2 pt-2.5 text-bgray hover:text-white font-medium hover:bg-blue transition-all duration-200'
        >
          <span>
          <i class="fa-solid fa-plus"></i> Ajouter un service
          </span>
           
        </Link>
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

    <LongTripList searchQuery={searchQuery} dispatch={dispatch}/>
    </>
  )
}
