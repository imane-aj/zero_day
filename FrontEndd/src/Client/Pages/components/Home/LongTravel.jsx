import React, { useState } from 'react'
import '../css/style.css'
import { Image } from '@chakra-ui/react';
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "@chakra-ui/button";
import 'react-datepicker/dist/react-datepicker.css';
import waycar from '../img/waycar2.png';
import { LongTrips } from '../../../../Redux/LongTripSlice';
import { imgUrl, url } from '../../../../Redux/Utils';
import { useDispatch } from 'react-redux';
import { IconButton } from "@material-tailwind/react";
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

import AOS from 'aos';
import 'aos/dist/aos.css';


const LongTravel = () => {

    const dispatch = useDispatch();
    const trip = useSelector((state) => state.trip.data)
    const [dataToDisplay, setDataToDisplay] = useState([]);

    useEffect(() => {
        dispatch(LongTrips(`${url}trips`));
    }, [dispatch]);
    useEffect(() => {
        AOS.init();
    }, [])

    useEffect(() => {

        setDataToDisplay(trip);

    }, [trip]);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Use smooth scrolling effect
        });
    };

    const chunks = [];
    for (let i = 0; i < dataToDisplay.length; i += 3) {
        chunks.push(dataToDisplay.slice(i, i + 3));
    }
    return (
        <>

            <section id="services" className="services">
                <div className="container" data-aos="fade-up">
                    <div className="section-title">

                        <h3>Explorez le Monde avec Waycab

                        </h3>
                        <p>Découvrez de Nouvelles Destinations avec Waycab
                        </p>
                    </div>
                    <div className="row">




                        <Carousel
                            showArrows={true}  // Show navigation arrows
                            showThumbs={false} // Hide thumbnail navigation
                            showStatus={false} // Hide status indicators
                            infiniteLoop      // Loop the carousel
                            autoPlay          // Automatically advance slides
                            interval={3000}   // Slide change interval (milliseconds)
                        >
                            {chunks.map((chunk, chunkIndex) => (
                            
                                    <div key={chunkIndex} className="row">
                                        {chunk.map((val, idx) => (
                                            <div
                                                key={idx}
                                                className="col-lg-4 col-md-6 align-items-stretch"
                                                data-aos="zoom-in"
                                                data-aos-delay="100"
                                            >
                                                <div className="icon-box">
                                                    <div className="icon">
                                                        <Link to={`/LongVoyageForm/${val.id}`}>
                                                            <Image
                                                                alt="feature image"
                                                                src={val.cover_url}
                                                                w="100%"
                                                                h="100%"
                                                                paddingBottom={5}
                                                                onClick={scrollToTop}
                                                            />
                                                        </Link>
                                                    </div>
                                                    <h4>
                                                        <Link to={`/LongVoyageForm/${val.id}`} onClick={scrollToTop}>
                                                            {val.title}

                                                        </Link>
                                                    </h4>
                                                    <p style={{ textAlign: 'left' }} className="mt-4" >
                                                        {val.desc}
                                                    </p>
                                                </div>
                                            </div>
                                    
                                        ))}
                                </div>
                            ))}
                        </Carousel>


                    </div>










                    <div className="d-flex justify-content-center mt-4"> {/* Added container for button */}
                        <Link to="/longTravel">
                            <Button
                                fontWeight="bolder"
                                fontSize={'20px'}
                                w="240px"
                                h="60px"
                                bgColor="yellow"
                                className="form-control rounded-pill mr-1"
                                onClick={scrollToTop}
                                style={{ backgroundColor: 'yellow' }}
                            >
                                Découvrez plus
                            </Button>
                        </Link>
                    </div>


                </div>
            </section>
        </>
    )
}

export default LongTravel