
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import '../css/style.css'
import { Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { services } from '../../../../Redux/ServiceSlice';
import { imgUrl,url } from '../../../../Redux/Utils';

import { useDispatch } from 'react-redux';



import { createGlobalStyle } from 'styled-components';

import waycar from '../img/waycar2.png';

const Transport = () => {


    const dispatch = useDispatch();
    const service = useSelector((state) => state.service.data)

    const searchResults = useSelector((state) => state.service.search)
    const [dataToDisplay, setDataToDisplay] = useState([]); // Initially set to all data

    useEffect(() => {
        dispatch(services(`${url}services?page=1`));
    }, [dispatch]);
    useEffect(() => {


        setDataToDisplay(service?.data);

    }, [service?.data]);



    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth' // Use smooth scrolling effect
        });
      };

    return (

        <section id="services" className="services">
            <div className="container justify-content-center" data-aos="fade-up">
                <div className="section-title">

                    <h3>Solutions de Transport Personnalisées</h3>

                    <p>Des Services Variés pour Répondre à Vos Besoins.</p>
                </div>

                <div className="row">


                    {dataToDisplay?.slice(0, 3).map((val, idx) => (<div className="col-lg-4 col-md-6 align-items-stretch" data-aos="zoom-in" data-aos-delay="100">
                        <div className="icon-box">
                            <div className="icon">
                                <Link to={`/ServiceForm/${val.id}`}>
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
                            <h4>     <Link to={`/ServiceForm/${val.id}`}        onClick={scrollToTop}>
                                {val.title}
                            </Link></h4>
                            <div style={{ textAlign: 'left' }} className="mt-5">
                                {val.desc.split('\n').slice(0, 2).join('\n')}
                            </div>
                        </div>
                    </div>
                    ))}

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
                            <h4><a href="">Transport Entreprises </a></h4>
                            <p style={{ textAlign: 'left' }} className="mt-5">
                            Des déplacements d'entreprise fluides et professionnels pour vos équipes et vos réunions.
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
                            <h4 ><Link to="/another-page"> Flotte Évènements  </Link></h4>
                            <p style={{ textAlign: 'left' }} className="mt-5">
                            Gérez les transports pour vos évènements spéciaux en toute simplicité avec notre flotte dédiée.
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
                            <h4 ><Link to="/another-page"> 	Mise à Disposition Journalière   </Link></h4>
                            <p style={{ textAlign: 'left' }} className="mt-4">
                            Optez pour une solution flexible avec notre service de chauffeur à disposition pour une journée en toute commodité.
                            </p>
                        </div>
                    </div> */}
                </div>


                {/* <div className="d-flex justify-content-center mt-4"> 
                    <Link to="/your-route">
                        <Button
                            fontWeight="bolder"
                            fontSize={'20px'}
                            w="240px"
                            h="60px"
                            bgColor="yellow"
                            className="form-control rounded-pill mr-1"
                        >
                            Découvrez plus
                        </Button>
                    </Link>
                </div> */}

            </div>

        </section>
    )
}

export default Transport