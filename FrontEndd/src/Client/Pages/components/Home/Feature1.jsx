import React from 'react'
import { VStack } from "@chakra-ui/layout";
import earthImage from '../img/terre-1.png';
import paimentImage from '../img/paiement-1.png';
import clientImage from '../img/service-clients-1.png';
import routesImage from '../img/itineraire-1.png';
import driverImage from '../img/conducteur-de-taxi 1.png';
import chauffeur from './assets/img/clients/chauffeur.svg';
import CB from '../img/CB.svg';
import route from '../img/route.svg';
import globe from '../img/globe.svg';
import stars from '../img/stars.svg';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Feature1 = () => {
       useEffect(() => {
    AOS.init();
  }, [])
 

    return (
        <>
        
          
            <section id="featured-services" className="featured-services">
            <div className="container " data-aos="fade-up">
                <div className="section-title">
                    <p className="lead">Waycab</p>


                    <h3>Le partenaire de mobilité le plus efficace à Bruxelles.</h3>
                </div>
                <section id="clients" className="clients">
                    <div className="container" data-aos="zoom-in">
                        <div className="clients-slider swiper">
                            <div className="row gy-3 mt-5 justify-content-center">

                                <div className="col-xl-2 col-md-4" >
                                <div className="text-center mb-7">
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
                                    <p style={{ marginTop: '55px', textAlign: 'center', fontSize: '15px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>Belgique & International</p>
                                </div>
                                </div>
                                <div className="col-xl-2 col-md-4" >
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
                                        <image xlinkHref={CB} x="0" y="0" width="100%" height="100%" />
                                    </svg>
                                    <p style={{ marginTop: '55px', textAlign: 'center', fontSize: '15px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>Paiement CB dans le taxi</p>
                                </div>

                                <div className="col-xl-2 col-md-4" >
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
                                        <image xlinkHref={route} x="0" y="0" width="100%" height="100%" />
                                    </svg>
                                    <p style={{ marginTop: '55px', textAlign: 'center', fontSize: '15px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>Trajets Optimisés</p>
                                </div>
                                <div className="col-xl-2 col-md-4">
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
                                        <image xlinkHref={stars} x="0" y="0" width="100%" height="100%" />
                                    </svg>
                                    <p style={{ marginTop: '55px', textAlign: 'center', fontSize: '15px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>Service haut de gamme</p>
                                </div>
                                <div className="col-xl-2 col-md-4">
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
                                        <image xlinkHref={chauffeur} x="0" y="0" width="100%" height="100%" />
                                    
                                </svg>
                                <p style={{ marginTop: '55px', textAlign: 'center', fontSize: '15px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>Chauffeurs Qualifiés</p>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
            </div>
            </section>
        </>
    )
}

export default Feature1