import React, { useState, useEffect } from 'react';
import Header from './components/Home/Header';
import Footer from './components/Home/Footer';
import { Image } from '@chakra-ui/react';

import { Button } from "@chakra-ui/button";
import waycar from './components/img/waycar2.png';
import { Link } from 'react-router-dom';


import { LongTrips } from '../../Redux/LongTripSlice';
import { url } from '../../Redux/Utils';
import { useDispatch } from 'react-redux';
// import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';


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
  
      setDataToDisplay(trip);
  
    }, [trip]);

    useEffect(() => {
      AOS.init();
    }, [])

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth' // Use smooth scrolling effect
      });
    };
  return (
    <>
  
      <Header />

      <section id="hero" className="d-flex align-items-center">
        <div className="container mb-7">


          <h1 style={{ color: 'yellow' }}>Text Text Text Text</h1>
          <h2 style={{ color: 'yellow' }}>Text Text Text Text Text Text Text Text Text Text Text Text</h2>






        </div>
      </section >
      <section id="services" className="services">
        <div className="container" data-aos="fade-up">
          <div className="section-title">

            <h3>Explorez le Monde avec Waycab

            </h3>
            <p>Découvrez de Nouvelles Destinations avec Waycab
            </p>
          </div>
          <div className="row">

          {dataToDisplay?.map((val, idx) => (<div className="col-lg-4 col-md-6 align-items-stretch" data-aos="zoom-in" data-aos-delay="100">
              <div className="icon-box">
                <div className="icon">
                  <Link  to={`/LongVoyageForm/${val.id}`} >
                    <Image
                      alt="feature image"
                      src={waycar}
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
            </div>))}




{/* 
            <div className="col-lg-4 col-md-6 align-items-stretch" data-aos="zoom-in" data-aos-delay="100">
              <div className="icon-box">
                <div className="icon">
                  <Link to="/another-page">
                    <Image
                      alt="feature image"
                      src={waycar}
                      w="100%"
                      h="100%"
                      paddingBottom={5}
                    />
                  </Link>
                </div>
                <h4><Link to="/another-page" className="mt-3"> Bruxelles – Amsterdam </Link></h4>
                <p style={{ textAlign: 'left' }} className="mt-4">
                  Réservez votre trajet en taxi de Bruxelles à Amsterdam et profitez d'un voyage fluide
                  et confortable entre ces deux destinations incontournables.
                  Laissez nos chauffeurs expérimentés vous conduire en toute sérénité.
                </p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 align-items-stretch mt-4 mt-md-0" data-aos="zoom-in" data-aos-delay="200">
              <div className="icon-box">
                <div className="icon"> <Link to="/another-page">
                  <Image
                    alt="feature image"
                    src={waycar}
                    w="100%"
                    h="100%"
                    paddingBottom={5}
                  />
                </Link></div>
                <h4><Link to="/another-page" className="mt-3"> Bruxelles – Paris</Link></h4>
                <p style={{ textAlign: 'left' }} className="mt-4">
                  Laissez WayCab faciliter votre trajet entre Bruxelles et Paris grâce à notre service de taxi dédié.
                  Profitez d'un voyage en toute commodité et élégance entre ces deux destinations iconiques.
                </p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 align-items-stretch mt-4 mt-lg-0" data-aos="zoom-in" data-aos-delay="200">
              <div className="icon-box">
                <div className="icon"> <Link to="/another-page">
                  <Image
                    alt="feature image"
                    src={waycar}
                    w="100%"
                    h="100%"
                    paddingBottom={5}
                  />
                </Link></div>
                <h4 ><Link to="/another-page">  Bruxelles –  Düsseldorf   </Link></h4>
                <p style={{ textAlign: 'left' }}>
                  Faites le lien entre Bruxelles et Düsseldorf en réservant un taxi avec WayCab.
                  Profitez d'un voyage fluide et agréable entre ces deux destinations majeures
                </p>
              </div>
            </div>


            <div className="col-lg-4 col-md-6 align-items-stretch" data-aos="zoom-in" data-aos-delay="100">
              <div className="icon-box">
                <div className="icon">
                  <Link to="/another-page">
                    <Image
                      alt="feature image"
                      src={waycar}
                      w="100%"
                      h="100%"
                      paddingBottom={5}
                    />
                  </Link>
                </div>
                <h4><Link to="/another-page" className="mt-3"> Bruxelles - villes belges  </Link></h4>
                <p style={{ textAlign: 'left' }} className="mt-4">
                  Parcourez la diversité des villes belges au départ de Bruxelles en réservant un taxi WayCab.
                  Profitez de voyages confortables pour découvrir tout ce que la Belgique a à offrir
                  Laissez nos chauffeurs expérimentés vous conduire en toute sérénité.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 align-items-stretch" data-aos="zoom-in" data-aos-delay="100">
              <div className="icon-box">
                <div className="icon">
                  <Link to="/another-page">
                    <Image
                      alt="feature image"
                      src={waycar}
                      w="100%"
                      h="100%"
                      paddingBottom={5}
                    />
                  </Link>
                </div>
                <h4><Link to="/another-page" className="mt-3"> Bruxelles – Rotterdam  </Link></h4>
                <p style={{ textAlign: 'left' }} className="mt-4">
                  Laissez WayCab vous conduire de Bruxelles à Rotterdam en toute commodité.
                  Réservez un taxi pour un voyage sans tracas entre ces deux destinations passionnantes.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 align-items-stretch" data-aos="zoom-in" data-aos-delay="100">
              <div className="icon-box">
                <div className="icon">
                  <Link to="/another-page">
                    <Image
                      alt="feature image"
                      src={waycar}
                      w="100%"
                      h="100%"
                      paddingBottom={5}
                    />
                  </Link>
                </div>
                <h4><Link to="/another-page" className="mt-3"> Bruxelles – lyon  </Link></h4>
                <p style={{ textAlign: 'left' }} className="mt-4">
                  Réservez un taxi chez WayCab pour un voyage en douceur entre Bruxelles et Lyon.
                  Profitez d'un déplacement agréable et pratique entre ces deux villes captivantes
                </p>
              </div>
            </div> */}

          </div>













        </div>
      </section>
      <Footer />
    </>
  )
}

export default LongTravel