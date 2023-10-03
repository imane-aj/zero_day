import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { url } from '../../../Redux/Utils';
import { Drivers, Search_driver, storeCommit, updateDriver } from '../../../Redux/DriverSlice';
const DriversDemande = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const dispatch = useDispatch();
    const [inputStates, setInputStates] = useState({});
    const [commit, setCommit] = useState('');
    const onChange =(e)=>{
      const query = e.target.value
      setSearchQuery(query)
      dispatch(Search_driver(query));
    }
  const driver = useSelector((state) => state.driver.data)
  const isLoading = useSelector((state) => state.driver.isLoading)
  const searchResults = useSelector((state) => state.driver.search)
  const [dataToDisplay, setDataToDisplay] = useState([]); // Initially set to all data
 
  useEffect(() => {
    dispatch(Drivers(`${url}drivers_demande?page=1`));
  }, [dispatch]);

  const handlePagination = (url) => {
    console.log('Pagination URL:', url);
    dispatch(Drivers(url));
  };

  const handleStatusChange = (e ,id) => {
    e.preventDefault();
    const status = event.target.value;
    const cpage = driver.current_page
    try {
        dispatch(updateDriver({ id, status,  cpage}));
        // dispatch(Services(`${url}service_request?page=${cpage}`))
    } catch (error) {
        console.error('Error updating status:', error);
    }
}

  useEffect(() => {
    if (searchResults.data && searchQuery) {
      setDataToDisplay(searchResults.data);
    } else {
      setDataToDisplay(driver?.data);
    }
  }, [searchResults, driver?.data, searchQuery]);


  const handleInputChange = (id, value) => {
    setInputStates((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSave = async (e, id) => {
    e.preventDefault();
    var formData = new FormData();
        formData.append('commit', commit);
    try {
      // Dispatch the storePrice action and wait for it to complete
      const resultAction =  dispatch(storeCommit({ formData, id }));
  
      // Check if the action was fulfilled successfully
      if (storeCommit.fulfilled.match(resultAction)) {
        // Clear the input field after a successful update
        setCommit('');
        dispatch(Drivers(`${url}drivers_demande?page=1`))
      } else {
        // Handle errors here if needed
        console.error('Error storing price:', resultAction.error);
      }
    } catch (error) {
      console.error('Error dispatching storePrice:', error);
    }
  };
  return (
   <>
 <div className='mb-6 flex flex-col md:flex-row md:justify-between'>
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
            <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white">
                Nom
              </th>
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Prenom
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                phone
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Matricule
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Type de vehicule
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Actions
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Commit
              </th>
            </tr>
          </thead>
          <tbody>
          {dataToDisplay?.map((val,idx)=>(
              <tr key={idx}>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <p className="text-black dark:text-white m-auto">{val.name} </p>
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <p className="text-black dark:text-white m-auto">{val.lastName} </p>
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <p className="text-black dark:text-white m-auto">{val.phone} </p>
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <p className="text-black dark:text-white m-auto">{val.matricule} </p>
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <p className="text-black dark:text-white m-auto">{val.vehicule?.type} </p>
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <div className="flex items-center space-x-3.5">
              
                 
                  {/* <button className="hover:text-primary text-danger" onClick={()=>handelDeleteBO(val.id)}>
                    <svg
                      className="fill-current"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                        fill=""
                      />
                      <path
                        d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                        fill=""
                      />
                      <path
                        d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                        fill=""
                      />
                      <path
                        d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                        fill=""
                      />
                    </svg>
                  </button> */}
                  {val?.status === 'Encore' && isLoading ? (
                        <svg
                            className="animate-spin h-5 w-5 mr-3"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            >
                            <circle cx="12" cy="12" r="10"></circle>
                        </svg>
                        ) : (
                        val?.status === 'Confirmé' ? (
                          <p className="text-black dark:text-white">
                            <select
                                value={val?.status}
                                onChange={(event) => handleStatusChange(event, val?.id)}
                                className="border-blite text-success text-sm focus:ring-blue-500  dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 pr-10"
                            >
                                <option value="Validé">Validé</option>
                                <option value="Refusé">Refusé</option>
                            </select>
                            </p>
                        ) : (
                            <p className="text-black dark:text-white">
                            <select
                                value={val?.status}
                                onChange={(event) => handleStatusChange(event, val?.id)}
                                className="border-blite text-danger text-sm focus:ring-blue-500  dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 pr-10"
                            >
                                <option value="Encore" className="bg-white text-black bg-gray-800 dark:text-white">Encore</option>
                                <option value="Validé">Validé</option>
                                <option value="Refusé">Refusé</option>
                            </select>
                            </p>
                    )
                    )}
                    
                  {/* <button className={`hover:text-primary`} onClick={(e) => val?.status === 'Encore' ? handleStatusChange(e, val?.id) : null}>
                    {val?.status === 'Encore' && isLoading ? (
                        <svg
                            className="animate-spin h-5 w-5 mr-3"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            >
                            <circle cx="12" cy="12" r="10"></circle>
                        </svg>):
                        val?.status == 'Traité' ? <i class="fa-regular fa-circle-check text-success"></i> : <i className='fa-solid fa-check-double'></i>}
                    
                  </button> */}
                </div>
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <div className="flex items-center space-x-3.5">
                <div>
                      {val.commit? 
                        (val?.commit) :
                        inputStates[val.id] ? 
                        <input
                            value={commit}
                            onChange={(e)=>setCommit(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                  // Call your message sending function here
                                  handleSave(e, val.id);
                              }
                          }}
                            type="text"
                            placeholder="Entrer le titre"
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                        : 
                        <button onClick={() => handleInputChange(val.id, true)} className='border px-4 py-1 border-meta-8 text-meta-8 hover:bg-blite'>Commit</button>
                        }
                  </div>
                    
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
      {driver.next_page_url && (
        <button className='text-black hover:bg-bodydark1 transition duration-700 dark:text-white px-6 py-3 bg-white rounded-sm border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark' 
        onClick={() => handlePagination(driver.next_page_url)}>
          Next <i class="fa-solid fa-chevron-right"></i>
        </button>
      )}
      {driver.prev_page_url && (
        <button className='text-black hover:bg-bodydark1 transition duration-700 dark:text-white px-6 py-3 bg-white rounded-sm border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark' 
        onClick={() => handlePagination(driver.prev_page_url)}>
          <i class="fa-solid fa-chevron-left"></i> Previous
        </button>
      )}
    </div>
    </>
  )
}

export default DriversDemande; 
