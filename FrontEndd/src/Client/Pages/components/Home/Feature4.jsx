import React from 'react'
import {  Image  } from '@chakra-ui/react';
import { Button } from "@chakra-ui/button";

import women from '../img/woman.png';

import { Link } from 'react-router-dom';
import { useState } from "react";

import { useEffect } from 'react';

const Feature4 = () => {
    const [name, setName] = useState();
    const [prenom, setPrenom] = useState();
    const [numTel, setNumTel] = useState();
    const [email, setEmail] = useState();
    const [message, setMessage] = useState();
  const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth' // Use smooth scrolling effect
        });
      };
 
    return (
        <>
       
            <section id="features" className="features">
                <div className="section-title">

    <h3> Actualités et Dernières Nouvelles</h3>

    </div>
            <div className="container" data-aos="fade-up">
                <div className="row">
                    <div className="image col-lg-6" style={{ backgroundImage: 'url("assets/img/features.jpg")' }} data-aos="fade-right">
                        <Image

                            src={women}
                            objectFit={'cover'}
                            w="100%"
                            h="100%"
                        />
                    </div>
                    <div className="col-lg-6" data-aos="fade-left" data-aos-delay="100">
                        <div className="icon-box mt-5 mt-lg-0" data-aos="zoom-in" data-aos-delay="150">

                            <h4>Get Your Rewards
                            </h4>
                            <p>Contenue Contenue Contenue Contenue Contenue
                                Contenue Contenue Contenue Contenue Contenue
                                Contenue Contenue Contenue Contenue Contenue
                                Contenue Contenue Contenue Contenue Contenue
                                Contenue Contenue Contenue Contenue Contenue
                                Contenue Contenue Contenue Contenue Contenue
                                Contenue Contenue Contenue Contenue Contenue
                                Contenue Contenue Contenue Contenue Contenue
                                Contenue Contenue Contenue Contenue Contenue
                                Contenue Contenue Contenue Contenue Contenue
                                Contenue Contenue Contenue Contenue
                                Contenue Contenue Contenue Contenue
                                Contenue Contenue Contenue Contenue
                                Contenue Contenue Contenue Contenue
                                Contenue Contenue Contenue Contenue</p>
                        </div>
                        <div className="icon-box mt-5 mt-lg-0" data-aos="zoom-in" data-aos-delay="150">
                            <Link to="/blog">
                                <Button
                                    fontWeight="bolder"
                                    fontSize={'20px'}
                                    w="240px"
                                    h="60px"
                                    bgColor="yellow"
                                    className="form-control rounded-pill mr-1"
                                    onClick={scrollToTop}
                                    style={ {  backgroundColor: 'yellow',}}
                                >
                                    Découvrez plus
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            </section>
            
        </>
    )
}

export default Feature4