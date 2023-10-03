import React, { useEffect, useState } from 'react';
import { useAppContext } from '../Context/FromContext';
import { useLocation } from 'react-router-dom';
import Footer from './components/Home/Footer';
import Header from './components/Home/Header';
import waycar from './components/img/waycar2.png'; 
import './components/css/style2.css'
import { useDispatch, useSelector } from 'react-redux';


import Cookies from 'js-cookie';
// import { imgUrl } from '../../../Redux/Utils';

import { useNavigate } from 'react-router-dom';

import { useParams } from 'react-router-dom';

const FormConfirmation = () => {

  const {
    depart,
    setDepart,
    arrive,
    setArrive,
    selectedTrajet,
    setselectedTrajet,
    selectedDate,
    setselectedDate,
    selectedTime,
    setselectedTime,
    type,
    setType,
    cab,
    setCab,
  } = useAppContext();
  const navigate = useNavigate();
  const [dataToDisplay, setDataToDisplay] = useState([]);
  const [price, setPrice] = useState();
  const [taxe, setTaxe] = useState();
  const [carType, setCarType] = useState();
  const [time, setTime] = useState('');
  const { typee } = useParams();
  // console.log(selectedDate)
  const [distance, setDistance] = useState();
    useEffect(() => {
        const newDataCookie = Cookies.get('newData');
        if (newDataCookie) {
            const newDataObject = JSON.parse(newDataCookie);
            setCab(newDataObject.cab);
        }
    }, []);
  const [selectedValue, setSelectedValue] = useState(null);
  const location = useLocation();
  const prixResults = useSelector((state) => state.reserv.prix)
  // Check if location.state exists and has a 'newData' property
  const newData = location.state && location.state.newData;

  // get from cookies
  const newDataFromCookie = Cookies.get('newData');
  const newDataCookie = Cookies.get('selectedVehicleId');


  useEffect(() => {
    if (newDataFromCookie) {
      const parsedData = JSON.parse(newDataFromCookie);

      // Use parsedData if available; otherwise, use newData from location.state
      const dataToUse = parsedData || newData;

      if (dataToUse) {
        setDepart(dataToUse.depart);
        setArrive(dataToUse.arrive);
        setselectedTrajet(dataToUse.selectedTrajet);
        setselectedDate(dataToUse.selectedDate);
        setDataToDisplay(dataToUse.pricing)
        setType(dataToUse.type);
        setDistance(dataToUse.distanceKm)
        setselectedTime(dataToUse.selectedTime)
        setTime(dataToUse.min)
        if (newDataCookie) {
          const parsedData = JSON.parse(newDataCookie);
    
          // Use parsedData if available; otherwise, use newData from location.state
          const data = parsedData || newData;
          setCab(data)
          setSelectedValue(data)
  

        }
      }
    }
   
  }, []);
  useEffect(() => {
  if (newDataCookie) {
    const parsedData = JSON.parse(newDataCookie);

    // Use parsedData if available; otherwise, use newData from location.state
    const data = parsedData || newData;

    const selectedVehicle = prixResults.find((vehicle) => vehicle.vehicle_id === data);
    console.log(selectedVehicle)
    // Check if a matching vehicle was found
    if (selectedVehicle) {
      setPrice(selectedVehicle.price);
      setCarType(selectedVehicle.vehicle)
      setTaxe(selectedVehicle.vehicle_taxe)
    }

  }
}, []);











  const tripType = selectedTrajet ? 1 : 0;
  useEffect(() => {
    const newDataCookie = Cookies.get('selectedVehicleId');
    
    if (newDataCookie) {
       
      setSelectedValue(newDataCookie)
        setCab(newDataCookie);
    }
}, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newDataCookie) {
    
      const parsedData = JSON.parse(newDataCookie);

      // Use parsedData if available; otherwise, use newData from location.state
      const data = parsedData || newData;

      const selectedVehicle = dataToDisplay.find((vehicle) => vehicle.vehicle_id === data);
console.log(selectedVehicle)
      // Check if a matching vehicle was found
      if (selectedVehicle) {
        setPrice(selectedVehicle.price);
        setCarType(selectedVehicle.vehicle)
        setTaxe(selectedVehicle.vehicle_taxe)
      }
    }
    

 
  
      const checkoutData = {
        depart,
        arrive,
        distance,
        tripType,
        type,
        selectedDate,
        selectedTrajet,
        price,
        selectedTime,
        cab,
        taxe,
        carType, time
    };
    
   
    

   
    Cookies.set('checkOutData', JSON.stringify(checkoutData), { expires: 1 / 96 });
    navigate('/checkout')
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Use smooth scrolling effect
    });

    // dispatch(store(formData)).then((res) => {
    //   if (res.type === 'Reservation/store/fulfilled') {

    //     navigate('/')
    //     Swal.fire('Success', 'Cette réservation a été ajoutée avec succès.', 'success');

    //   }
    // });
  };




  return (

    <>

      <Header />
      <section id="booking" class="section">
        <div className='heightt'>
        <div class="section-center">
          <div class="container">
            <div class="row">
              <div class="booking-form">

                <form onSubmit={handleSubmit} className="max-w-lg mx-auto">

                  <div className="form-group">
                    <label htmlFor="pickupLocation" className="form-label">Pickup Location</label>
                    <input
                      id="pickupLocation"
                      className="form-control"
                      type="text"
                      placeholder="Enter Location"
                      value={depart}
                      onChange={(e) => setDepart(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="destination" className="form-label">Destination</label>
                    <input
                      id="destination"
                      className="form-control"
                      type="text"
                      placeholder="Enter ZIP/Location"
                      value={arrive}
                      onChange={(e) => setArrive(e.target.value)}
                      
                    />
                  </div>
                  {type === "plus tard" && (<>
                    <div className="row">
                      <div className="col-sm-5">
                        <div className="form-group">
                          <label htmlFor="pickupDate" className="form-label">Pickup Date</label>
                          <input
                            id="pickupDate"
                            className="form-control"
                            type="datetime-local" // Use datetime-local type
                            value={selectedDate}
                            onChange={(e) => setselectedDate(e.target.value)}
                            style={{ width: '120%' }} 
                            required
                          />
                        </div>
                      </div>

                    </div>
                  </>)}
                  <ul className="grid  gap-3">
                  {dataToDisplay?.map((val, idx) => (
  <li key={idx}>
    <input
      type="radio"
      id={`default-radio-${val.vehicle_id}`}
      name="default-radio"
      className="hidden peer"
    value={(cab)}
      onChange={() => {
     setSelectedValue(val.vehicle_id)
        setCab(val.vehicle_id);
        setPrice(val.price);
        setCarType(val.vehicle)
        setTaxe(val.vehicle_taxe)
      }}
    />
    <label
      htmlFor={`default-radio-${val.vehicle_id}`}
      className="inline-flex items-center justify-between w-full p-2 text-gray-500 border border-gray-200 rounded cursor-pointer"
      style={{
        backgroundColor:
        selectedValue == val.vehicle_id ? 'gold' : 'white', // Initial background color based on selectedValue
        ':hover': {
          backgroundColor: 'blue', // Change to your desired hover background color
          color: 'white', // Change to your desired hover text color
        },
      }}
    >
      <div className="flex items-center">
        <img
          src={waycar}
          alt={`Image for ${val.vehicle}`}
          className="w-30 h-20 object-cover rounded-md mr-3"
        />
        <div>
          <div className="font-semibold">
            {val.vehicle} - {val.price} &euro; 
          </div>
        </div>
      </div>
    </label>
  </li>
))}


                  </ul>
                

                  <div className="form-btn">
                    <button className="submit-btn" type="submit">Confirmez</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>


      <Footer />
    </>
  );
};

export default FormConfirmation