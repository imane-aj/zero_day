import React from 'react'
// import { Carousel, IconButton } from "@material-tailwind/react";
import { useAppContext } from '../../../Context/FromContext';
import { Image } from '@chakra-ui/react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "@chakra-ui/button";
import waycar from '../img/waycar2.png';
import { Link } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { cars } from '../../../../Redux/VehiculesSlice';
import { imgUrl, url } from '../../../../Redux/Utils';
import { useState } from "react";
const OfferXservice = () => {
  const responseData = useSelector((state) => state.vehicule.data);
  const [dataToDisplay, setDataToDisplay] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(cars(`${url}vehicules`));
  }, [dispatch]);
  useEffect(() => {
  const data = responseData.data && responseData.data.data;
  setDataToDisplay(data);  }, [ responseData.data]);
  useEffect(() => {
    AOS.init();
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Use smooth scrolling effect
    });
  }, [])



  function handleCar(index) {
    console.log(index)
    // Set the cab value based on the index
    Cookies.set('selectedVehicleId', index);

    // Navigate to the FormControls component
    navigate('/form');
    // 
  }


  
  return (
    <>

      <section id="services" className="services">
        <div className="container justify-content-center" data-aos="fade-up">
          <div className="section-title">

            <h3>Offres et Services</h3>
          </div>
          <div className="row">
          {Array.isArray(dataToDisplay) &&
                dataToDisplay.map((val, idx) => (
            <div className="col-md-6 col-lg-3 align-items-stretch" data-aos="zoom-in" data-aos-delay="100">
              <div className="icon-box">
                <div className="icon">
                  <Link to="#form" onClick={() => handleCar(val.id)}>
                    <Image
                      alt="feature image"
                      src={imgUrl + `images/vehicule/${val?.img}`}
                      w="100%"
                      h="100%"
                      paddingBottom={5}
                    />
                  </Link>
                </div>
                <h4><a href="#form" onClick={() => handleCar(val.id)}> {val.type}</a></h4>
                {val.options}
              </div>
            </div>
     ))}


          </div>



        </div>

      </section>
    </>
  )
}

export default OfferXservice