import React from 'react'
import {  Image  } from '@chakra-ui/react';
import logo1 from '../img/Logos.png';


const Feature2 = () => {



    return (
        <>
           
            <section id="about" class="about">
      <div class="container" data-aos="fade-up">

        <div class="row">
          <div class="col-lg-6 order-1 order-lg-2" data-aos="fade-left" data-aos-delay="100">
            <img src={logo1} class="img-fluid" alt=""/>
          </div>
          <div class="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 content" data-aos="fade-right" data-aos-delay="100">
            <h3>Bienvenue chez Waycab.</h3>
            <p class="fst-italic">
            Votre partenaire de confiance pour des déplacements
                        fluides et confortables. Nous sommes dédiés à vous fournir
                        un service de transport professionnel et fiable, adapté à vos
                        besoins. Nos chauffeurs expérimentés vous conduiront dans nos
                        véhicules bien entretenus, vous offrant une expérience de voyage
                        agréable. Que vous voyagiez en solitaire, en groupe, ou que vous
                        ayez besoin d'un transfert depuis l'aéroport, Waycab est
                        là pour vous accompagner. Explorez nos services et
                        offres spéciales dès aujourd'hui, et
                        laissez Waycab vous emmener
                        là où vous devez aller. 
            </p>
          </div>
        </div>

      </div>
    </section>
        {/* <section id="about" className="about">
        <div className="container " data-aos="fade-up">
            <div className="row justify-content-center">
                <div className="col-lg-6 order-1 order-lg-2 justify-content-center " data-aos="fade-left" data-aos-delay="100">
                    <Image

                        alt={'feature image'}
                        src={logo1}
                        objectFit={'cover'}
                        w="80%"
                        h="80%"

                    />
                </div>
                <div className="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 content justify-content-center" data-aos="fade-right" data-aos-delay="100">
                    <h3 className="mb-4">Bienvenue chez Waycab</h3>
                    <p className="fst-italic">
                        Votre partenaire de confiance pour des déplacements
                        fluides et confortables. Nous sommes dédiés à vous fournir
                        un service de transport professionnel et fiable, adapté à vos
                        besoins. Nos chauffeurs expérimentés vous conduiront dans nos
                        véhicules bien entretenus, vous offrant une expérience de voyage
                        agréable. Que vous voyagiez en solitaire, en groupe, ou que vous
                        ayez besoin d'un transfert depuis l'aéroport, Waycab est
                        là pour vous accompagner. Explorez nos services et
                        offres spéciales dès aujourd'hui, et
                        laissez Waycab vous emmener
                        là où vous devez aller.  </p>
                </div>
            </div>
        </div>
    </section> */}
    </>
    )
}

export default Feature2