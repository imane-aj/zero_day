
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Header from './components/Home/Header';
import Footer from './components/Home/Footer';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { GetUserReservations } from '../../Redux/ReservationSlice';
import { ChakraProvider } from '@chakra-ui/react';
const Reservations = () => {
    const {t, i18n} = useTranslation()

    const [email, setEmail] = useState('');
    const [dataToDisplay, setDataToDisplay] = useState([]);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    function convertMinutesToHoursAndMinutes(minutesString) {
        // Parse the minutes value from the string
        const minutes = parseFloat(minutesString);
      
        // Check if the parsed value is a valid number
        if (!isNaN(minutes)) {
          // Calculate hours and remaining minutes
          const hours = Math.floor(minutes / 60);
          const remainingMinutes = Math.round(minutes % 60);
      
          // Construct the formatted string
          const formattedTime = `${hours}h ${remainingMinutes}m`;
      
          return formattedTime;
        } else {
          // Handle invalid input
          return "Invalid input";
        }
      }

    
    useEffect(() => {

        const userCookies = Cookies.get('currentClient');
        if (userCookies) {
          try {
            const parsedData = JSON.parse(userCookies);

            setEmail(parsedData.email);
       
          } catch (error) {
            console.error('Error parsing userCookies:', error);
          }
        } else {
          navigate('/')
        }
    
      }, []);
    useEffect(() => {
console.log(email)
    
        dispatch(GetUserReservations(email)).then((res) => {
            setDataToDisplay(res.payload.data)

        })
      }, [dispatch, email]);
  return (
    <>
    <Header />
    <section id="hero" class="d-flex align-items-center justify-content-center">
      <div class="container">
      <div class="w-full mx-auto ">


      <div className="container"> 
        <div className="flex flex-wrap -mx-4">
          <div className="w-full px-1">
            <div className="max-w-full overflow-x-auto">
              <table className="table-auto w-full">
                <thead>
                  <tr className=" text-center"       style={{backgroundColor:'#ECEE81'}}>
                    <th
                      className="
                      w-1/6
                      min-w-[160px]
                      text-md
                      font-semibold
                      text-black
                    py-3
                      lg:py-7
                      px-3
                      lg:px-4
                      border-l border-transparent
                      "
                    >
                     {t('depart')} :
                    </th>
                    <th
                      className="
                      w-1/6
                      min-w-[160px]
                      text-md
                      font-semibold
                      text-black
                    py-3
                      lg:py-7
                      px-3
                      lg:px-4
                      "
                    >
                       {t('arrive')} :
                    </th>
                    <th
                      className="
                      w-1/6
                      min-w-[160px]
                      text-md
                      font-semibold
                      text-black
                    py-3
                      lg:py-7
                      px-3
                      lg:px-4
                      "
                    >
                      TYPE DE TRAJET :
                    </th>
                    <th
                      className="
                      w-1/6
                      min-w-[160px]
                      text-md
                      font-semibold
                      text-black
                    py-3
                      lg:py-7
                      px-3
                      lg:px-4
                      "
                    >
                      DATE DE DÉPART:
                    </th>
                    <th
                      className="
                      w-1/6
                      min-w-[160px]
                      text-md
                      font-semibold
                      text-black
                    py-3
                      lg:py-7
                      px-3
                      lg:px-4
                      "
                    >
                      Distance
                    </th>
                    <th
                      className="
                      w-1/6
                      min-w-[160px]
                      text-md
                      font-semibold
                      text-black
                    py-3
                      lg:py-7
                      px-3
                      lg:px-4
                      "
                    >
                      Duree
                    </th>
                    <th
                      className="
                      w-1/6
                      min-w-[160px]
                      text-md
                      font-semibold
                      text-black
                      py-3
                      lg:py-7
                      px-3
                      lg:px-4
                      border-r border-transparent
                      "
                    >
                      Prix
                    </th>
                    <th
                      className="
                      w-1/6
                      min-w-[160px]
                      text-md
                      font-semibold
                      text-black
                      py-3
                      lg:py-7
                      px-3
                      lg:px-4
                      border-r border-transparent
                      "
                    >
                      status
                    </th>
                  </tr>
                </thead>
                <tbody>
                {Array.isArray(dataToDisplay) ? (
  dataToDisplay.map((val, idx) => (
    <tr key={idx}>
      <td
        className="
          text-center text-dark
          font-medium
          text-base
          py-2
          px-2
          bg-[#F3F6FF]
          border-b border-l border-[#E8E8E8]
        "
      >
{val.startPoint}

      </td>
      <td
        className="
          text-center text-dark
          font-medium
          text-base
          py-2
          px-2
          bg-white
          border-b border-[#E8E8E8]
        "
      >
        {val.endPoint}
      </td>
      <td
        className="
          text-center text-dark
          font-medium
          text-base
          py-2
          px-2
          bg-[#F3F6FF]
          border-b border-[#E8E8E8]
        "
      >
 {val.tripType === 0 ? 'sans arret' : 'avec arret'}
      </td>
      <td
        className="
          text-center text-dark
          font-medium
          text-base
          py-2
          px-2
          bg-white
          border-b border-[#E8E8E8]
        "
      >
 {val.disp === 'Immédiate' ? 'Immédiate' : val.date}      </td>
      <td
        className="
          text-center text-dark
          font-medium
          text-base
          py-2
          px-2
          bg-[#F3F6FF]
          border-b border-[#E8E8E8]
        "
      >
      {val.distance} km
      </td>
      <td
        className="
          text-center text-dark
          font-medium
          text-base
          py-2
          px-2
          bg-[#F3F6FF]
          border-b border-[#E8E8E8]
        "
      >
     {convertMinutesToHoursAndMinutes(val.min)}
      </td>
      <td
        className="
          text-center text-dark
          font-medium
          text-base
          py-2
          px-2
          bg-[#F3F6FF]
          border-b border-[#E8E8E8]
        "
      >
       {val.price} €
      </td>
      <td
        className="
          text-center text-dark
          font-medium
          text-base
          py-2
          px-2
          bg-[#F3F6FF]
          border-b border-[#E8E8E8]
        "
      >
       {val.status} 
      </td>
    </tr>
  ))
) : (
  <tr>
    <td colSpan="7"></td>
  </tr>
)}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
 


</div>
        </div>
        </section>
        <ChakraProvider>
      <Footer />
      </ChakraProvider>
    </>
  )
}

export default Reservations