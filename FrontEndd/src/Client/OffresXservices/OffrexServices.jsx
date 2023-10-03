import React from 'react'
import Header from '../Pages/components/Home/Header';
import Feature3 from '../Pages/components/Home/Feature3';
import Info from '../Pages/components/Home/Info';
import Footer from '../Pages/components/Home/Footer';
import { useEffect } from 'react';
import { Image } from '@chakra-ui/react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "@chakra-ui/button";
import waycar from '../Pages/components/img/waycar2.png';
import { Link } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useDispatch, useSelector } from 'react-redux';
import { cars } from '../../Redux/VehiculesSlice';
import { imgUrl, url } from '../../Redux/Utils';
import { useState } from "react";
import Cookies from 'js-cookie';
const OffrexServices = () => {
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
  // const departAeroport = () => {
  //   setDepart("Aéroport de Bruxelles (BRU), Leopoldlaan, Zaventem, Belgium")
  //   Cookies.set('departing', depart);
  //   window.scrollTo({
  //     top: 0,
  //     behavior: 'smooth' // Use smooth scrolling effect
  //   });
  // };

  const departAeroport = () => {
    let newDepart = "Aéroport de Bruxelles (BRU), Leopoldlaan, Zaventem, Belgium";
    localStorage.setItem('departing', newDepart);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  const departGare = () => {
    const gare = `Bruxelles-Central, Carrefour de l'Europe, Brussels, Belgium`
    localStorage.setItem('departing', gare);

    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Use smooth scrolling effect
    });
  };
  function handleCar(index) {
    console.log(index)
    // Set the cab value based on the index
    Cookies.set('selectedVehicleId', index);

    // Navigate to the FormControls component
    navigate('/');
    // 
  }
  return (
    <>
      <Header />


      <section id="hero2" className="d-flex align-items-center">
        <div className="container" data-aos="zoom-out" data-aos-delay="100">


          <h1 style={{ color: 'yellow' }}>Text Text Text Text</h1>
          <h2 style={{ color: 'yellow' }}>Text Text Text Text Text Text Text Text Text Text Text Text</h2>






        </div>
      </section >
      <section id="services" className="services">
        <div className="container justify-content-center" data-aos="fade-up">
          <div className="section-title">

            <h3>Offres et Services</h3>
            <p> Découvrez nos solutions sur mesure pour des déplacements sans stress. Transferts gares et aéroports, transports personnalisés et bien plus encore.
              WayCab, votre partenaire de confiance pour des voyages en toute sérénité.</p>
          </div>
          <div className="row">
            {/* Offres */}
            {Array.isArray(dataToDisplay) &&
                dataToDisplay.map((val, idx) => (
            <div className="col-md-6 col-lg-3 align-items-stretch" data-aos="zoom-in" data-aos-delay="100">
              <div className="icon-box">
                <div className="icon">
                  <Link to="/" onClick={() => handleCar(val.id)}>
                    <Image
                      alt="feature image"
                      src={imgUrl + `images/vehicule/${val?.img}`}
                      w="100%"
                      h="100%"
                      paddingBottom={5}
                    />
                  </Link>
                </div>
                <h4><a href="/" onClick={() => handleCar(val.id)}> {val.type}</a></h4>
                {val.options}
              </div>
            </div>
     ))}
          </div>
        </div>

      </section>

      <Feature3 />


      <section id="about" className="about">
        <div className="container " data-aos="fade-up">
          <div className="row justify-content-center">

            <div className="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 content justify-content-center" data-aos="fade-right" data-aos-delay="100">
              <h3 className="mb-4">Transfert Gares avec WayCab </h3>
              <p className="fst-italic">
                Lorsque vous arrivez ou partez d'une gare, la transition vers votre destination finale peut parfois être chaotique.
                Avec le service de transfert gares de WayCab, nous prenons en charge cette étape pour que vous puissiez vous détendre
                dès que vous mettez le pied hors du train. Nos chauffeurs professionnels vous accueillent à la gare, vous aident avec
                vos bagages et vous conduisent en douceur vers votre destination. Fini le stress de la navigation dans une nouvelle
                ville ou de trouver un moyen de transport.
                Avec WayCab, votre transition depuis ou vers la gare devient une expérience fluide et confortable. </p>
           
                <div className="d-flex justify-content-center mt-4"> {/* Added container for button */}
                        <Link to="/">
                            <Button
                                fontWeight="bolder"
                                fontSize={'20px'}
                                w="240px"
                                h="60px"
                                bgColor="yellow"
                                className="form-control rounded-pill mr-1"
                                onClick={departGare}
                                style={{backgroundColor:'yellow'}}
                            >
                                Reserver un transfert
                            </Button>
                        </Link>
                    </div>
            </div>

            <div className="col-lg-6 order-1 order-lg-2 justify-content-center " data-aos="fade-left" data-aos-delay="100">
              <Image

                alt={'feature image'}
                src={waycar}
                objectFit={'cover'}
                w="80%"
                h="80%"

              />
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="about">
        <div className="container " data-aos="fade-up">
          <div className="row justify-content-center">
            <div className="col-lg-6 order-1 order-lg-2 justify-content-center " data-aos="fade-left" data-aos-delay="100">
              <h3 className="mb-4">Transfert Aéroport avec WayCab </h3>
              <p className="fst-italic">
                Le début ou la fin d'un voyage peut souvent être stressant, surtout lorsqu'il s'agit de se rendre à l'aéroport.
                C'est là que WayCab entre en jeu avec notre service de transfert aéroport.
                Laissez nos chauffeurs expérimentés vous prendre en charge dès votre porte pour vous conduire à l'aéroport,
                ou vous accueillir dès que vous atterrissez. Plus besoin de vous soucier des retards, des embouteillages
                ou du stationnement. Avec WayCab, vous pouvez commencer ou terminer votre voyage en toute sérénité,
                sachant que vous êtes entre de bonnes mains.
                Profitez d'un voyage sans soucis vers ou depuis l'aéroport avec WayCab.  </p>
                <div className="d-flex justify-content-center mt-4"> {/* Added container for button */}
                        <Link to="/">
                            <Button
                                fontWeight="bolder"
                                fontSize={'20px'}
                                w="240px"
                                h="60px"
                                bgColor="yellow"
                                className="form-control rounded-pill mr-1"
                                onClick={departAeroport}
                                style={{backgroundColor:'yellow'}}
                            >
                                Reserver un transfert
                            </Button>
                        </Link>
                    </div>
            </div>
            <div className="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 content justify-content-center" data-aos="fade-right" data-aos-delay="100">
              <Image

                alt={'feature image'}
                src={waycar}
                objectFit={'cover'}
                w="80%"
                h="80%"

              />
            </div>
          </div>
        </div>
      </section>

      <Info />
      <Footer />
    </>
  )
}

export default OffrexServices