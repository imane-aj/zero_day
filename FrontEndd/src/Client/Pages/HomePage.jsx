import React from 'react'
import Header from './components/Home/Header';
import Feature1 from './components/Home/Feature1';
import Feature2 from './components/Home/Feature2';
import Feature3 from './components/Home/Feature3';
import Feature4 from './components/Home/Feature4';
import FormControls from './components/Home/FormControls';
import OfferXservice from './components/Home/OfferXservice';
import LongTravel from './components/Home/LongTravel';
import Feedback from './components/Home/Feedback';
import Transport from './components/Home/Transport';
import Info from './components/Home/Info';
import Footer from './components/Home/Footer';

import { useEffect } from 'react';
const HomePage = () => {
   
        useEffect(() => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth' // Use smooth scrolling effect
            });
        }, []);

    return (
        <>
            <Header />

   
                <FormControls />
              
            <Feature1 />
            <Feature2 />
            <OfferXservice />
            <Feature3 />
            <LongTravel /> 
            <Feedback /> 
            <Transport /> 
            <Feature4 /> 
            <Info />
          
          
          

            <Footer />
        </>
    )
}

export default HomePage