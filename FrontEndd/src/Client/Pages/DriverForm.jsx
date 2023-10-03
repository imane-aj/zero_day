
import React, { useEffect, useState } from 'react';

import Header from './components/Home/Header';
import Footer from './components/Home/Footer';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { storeDriver } from '../../Redux/DriverSlice';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import { Button } from "@chakra-ui/button";
import { cars } from '../../Redux/VehiculesSlice';
import { imgUrl, url } from '../../Redux/Utils';
import globe from './components/Home/assets/img/clients/chauffeur.svg';
import {  useToast } from "@chakra-ui/react";
const DriverForm = () => {
  const toast = useToast();
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [car, setCar] = useState();
  const [matricule, setMatricule] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();



  const responseData = useSelector((state) => state.vehicule.data);
  const [dataToDisplay, setDataToDisplay] = useState([]);


  useEffect(() => {
    dispatch(cars(`${url}vehicules`));
  }, [dispatch]);
  useEffect(() => {
    const data = responseData.data && responseData.data.data;
    setDataToDisplay(data);  }, [ responseData.data]);
console.log(car)
  const handleSubmit = (e) => {
  
    e.preventDefault();

    if(!name || !lastname || !phone || !matricule || !car){

      toast({
          title: "please fill all the fields !",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
      });
  } else{
    var formData = new FormData();

    formData.append('name', name);
    formData.append('lastName', lastname);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('matricule', matricule);
    formData.append('vehicule_id', car);


    // for (const pair of formData.entries()) {
    //   console.log(pair[0] + ": " + pair[1]);
    // }
    dispatch(storeDriver(formData)).then((res) => {
      if (res.type === 'driver/storeDriver/fulfilled') {
        navigate('/')
        Swal.fire('Success', 'Cette demande de devenir chauffeur a été ajoutée avec succès.', 'success');

      }
    });

  window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  }

  return (
 <>
    <Header />
      <section id="hero" class="d-flex align-items-center justify-content-center">
        <div class="container">

          <div className=" bg-gray-500 flex items-center justify-center px-1 py-1">
            <div className="bg-gray-100 text-gray-500 rounded-xl shadow-xl w-full overflow-hidden">

              <div class="min-h-screen bg-gray-100 p-0 sm:p-12">
                <div class="mx-auto max-w-3xl px-6 py-12 border-0 shadow-lg sm:rounded-xl" style={{ backgroundColor: '#F9F9F9' }}>
                <div className="text-center mb-7 d-flex flex-column align-items-center">

                  <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                        version="1.1"
                                        x="0px"
                                        y="0px"
                                        viewBox="0 0 50 62.5"
                                        enableBackground="new 0 0 50 50"
                                        xmlSpace="preserve"
                                        width="120" // Adjust the width to make it smaller
                                        height="120" // Adjust the height to make it smaller
                                    >
                                        <image xlinkHref={globe} x="0" y="0" width="100%" height="100%" style={{objectFit: 'cover'}} />
                                    
                                    </svg>
                    <h3 class="text-2xl font-bold mb-8">Devenir Chauffeur</h3>
                  </div>
          
                  <div>
                 
                    <div className="flex -mx-3">
                      <div className="w-full px-3 mb-3">
                        <label htmlFor="" className="text-s font-semibold px-1 mb-3">
                          Nom 
                        </label>
                        <div className="flex">
                          <input
                            id="name"
                            className="form-control"
                            type="text"
                            placeholder="Entrez votre nom"
                            style={{ height: '50px' }}
                            onChange={(e) => setLastname(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex -mx-3">
                      <div className="w-full px-3 mb-3">
                        <label htmlFor="" className="text-s font-semibold px-1 mb-3">
                          Prenom
                        </label>
                        <div className="flex">
                          <input
                            id="name"
                            className="form-control"
                            type="text"
                            placeholder="Entrez votre prenom"
                            style={{ height: '50px' }}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex -mx-3">
                      <div className="w-full px-3 mb-3">
                        <label htmlFor="" className="text-s font-semibold px-1 mb-3">
                          Email
                        </label>
                        <div className="flex">

                          <input
                            id="email"
                            className="form-control"
                            type="email"
                            placeholder="Entrez votre email"
                            style={{ height: '50px' }}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex -mx-3">
                      <div className="w-full px-3 mb-3">
                      <label htmlFor="" className="text-s font-semibold px-1 mb-3">
                          Telephone
                        </label>
                        <input
                          id="pickupLocation"
                          className="form-control"
                          type="text"
                          placeholder="Entrez votre numero de telephone"
                          style={{ height: '50px' }}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="flex -mx-3">
                      <div className="w-full px-3 mb-3">
                        <label htmlFor="" className="text-s font-semibold px-1 mb-3">
                          Matricule
                        </label>
                        <div className="flex">
                          <input
                            id="name"
                            className="form-control"
                            type="text"
                            placeholder="Entrez votre matricule"
                            style={{ height: '50px' }}
                            onChange={(e) => setMatricule(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex -mx-3">
                      <div className="w-full px-3 mb-3">
                        <label htmlFor="" className="text-s font-semibold px-1 mb-3">
                          Le type de votre Vehicule
                        </label>
                        <div className="flex">
                        {Array.isArray(dataToDisplay) &&
                dataToDisplay.map((val, idx) => (<div class="flex items-center mr-4">
     <input
  id="inline-radio"
  type="radio"
  value={val.id} // Set the value to val.id
  name="inline-radio-group"
  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
  onChange={(e) => setCar(e.target.value)} // Call a function to set the car state
/>
        <label for="inline-radio" class="ml-1 text-sm font-medium text-gray-900 dark:text-gray-300">{val.type}</label>
    </div> ))}
  
                        </div>
                      </div>
                    </div>
                    <div className="flex -mx-3 d-flex flex-column align-items-center">
        
                      <div className="px-5 py-3  d-flex flex-column align-items-center">  
                      <Button
                                fontWeight="bolder"
                                fontSize={'30px'}
                               w="200px"
                                h="60px"
                                bgColor="yellow"
                                className="form-control rounded-pill mr-4 ml-4"
                                onClick={handleSubmit}
                                style={{backgroundColor:'yellow'}}
                            >
                                Envoyez
                            </Button>
                      </div>
                    </div>

                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
 </>
  )
}

export default DriverForm