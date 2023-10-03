import React from 'react';
import { Fragment, useEffect, useState } from 'react';
import { Deactive, Reservations, updateResr } from '../../Redux/ReservationSlice';
import { url } from '../../Redux/Utils';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import Vehicule from './../../Redux/VehiculesSlice';
import { Link } from 'react-router-dom';

export default function Archive() {
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();
  const onChange =(e)=>{
      const query = e.target.value
      setSearchQuery(query)
      dispatch(Search_reserv(query));
  }
  const isLoading = useSelector((state) => state.reserv.isLoadingStatus)
  const searchResults = useSelector((state) => state.reserv.search)
  const [dataToDisplay, setDataToDisplay] = useState([]); // Initially set to all data
  useEffect(() => {
    dispatch(Reservations(`${url}reservations?page=1`));
  }, [dispatch]);
  const data = useSelector((state) => state.reserv.data)
    const reserv = data?.archive
  const handlePagination = (url) => {
    dispatch(Reservations(url));
  };

    const handleDeactiveChange = (e ,id ) => {
        e.preventDefault();
        const cpage = reserv.current_page
        console.log(cpage)
        Swal.fire({
            title: 'Are you sure ?',
            text: 'Deleting this item cannot be undone.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#2c9c5c',
            cancelButtonColor: '#dc3545',
            confirmButtonText: 'Deactivate',
            cancelButtonText: 'Cancel'
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch(Deactive({id, cpage})).then((res) => {
                  if (res.type === 'Reservation/Deactive/fulfilled') {
                    dispatch(Reservations(`${url}reservations?page=${cpage}`))
                    Swal.fire('Success', res.message, 'success');
                  }
              })
            }
          });
    }
  
    useEffect(() => {
      if (searchResults.data && searchQuery) {
        setDataToDisplay(searchResults.data);
      } else {
        setDataToDisplay(reserv?.data);
      }
    }, [searchResults.data, reserv?.data, searchQuery]);
  return (
    <Fragment>
        <div className='mb-6 flex flex-col md:flex-row md:justify-between'>
          <h3 className='my-3 w-[fit-content] inline-block rounded  bg-blite px-6 pb-2 pt-2.5 text-bgray font-medium'>Reservations</h3>
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
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto">
                <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                    <th className="min-w-[220px] py-4 px-4  font-medium text-black dark:text-white">
                    Date
                    </th>
                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    Statut
                    </th>
                    <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white">
                    Départ
                    </th>
                    <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                    Arrivée
                    </th>
                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    Type Vehicule
                    </th>
                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    Type
                    </th>
                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    N d'heures
                    </th>
                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    Prix 
                    </th>
                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    Distance
                    </th>
                    <th className="py-4 px-4 font-medium text-black dark:text-white">
                    Actions
                    </th>
                </tr>
                </thead>
                <tbody>
                {dataToDisplay?.map((val,idx)=>(
                    <tr >
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                       {val?.date? val?.date : val?.created_at}
                    </p>
                    </td>
                     <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-success dark:text-white">
                            {val?.status} 
                        </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white m-auto">{val?.startPoint}</p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                       {val?.endPoint}
                    </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {val?.vehicule['type']}
                    </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                       {val?.tripType == 0 ? ' sans arrêt': 'avec arrêt'}
                    </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-center">
                    <p className="text-black dark:text-white">
                       {val?.heure? val?.heure+' h' : '-'}
                    </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <h5 className="font-medium text-black dark:text-white">
                       {val?.price} €
                    </h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                       {val?.distance} km
                    </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                    
                        <button onClick={(e) => handleDeactiveChange(e, val?.id)} className="hover:text-primary m-auto text-danger" >
                        <i class="fa-solid fa-eye-low-vision"></i>
                        </button>
                        <Link className="hover:text-primary" to = {`view_reservation/${val.id}`} >
                          <svg
                            className="fill-current"
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                              fill=""
                            />
                            <path
                              d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                              fill=""
                            />
                          </svg>
                        </Link>
                    </div>
                    </td>
                </tr>
                ))}
                
                </tbody>
            </table>
            </div>
        </div>

        {/* Pagination buttons */}
        <div className='mt-10 flex flex-row justify-between'>
            {reserv?.next_page_url && (
            <button className='text-black hover:bg-bodydark1 transition duration-700 dark:text-white px-6 py-3 bg-white rounded-sm border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark'
            onClick={() => handlePagination(reserv.next_page_url)}>
                Next <i class="fa-solid fa-chevron-right"></i>
            </button>
            )}
            {reserv?.prev_page_url && (
            <button className='text-black hover:bg-bodydark1 transition duration-700 dark:text-white px-6 py-3 bg-white rounded-sm border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark'
            onClick={() => handlePagination(reserv.prev_page_url)}>
               <i class="fa-solid fa-chevron-left"></i> Previous
            </button>
            )}
        </div>
    </Fragment>
  )
}
