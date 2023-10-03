import React from 'react'
import { Image } from '@chakra-ui/react';
import dog from '../img/dog.png';
import driver from '../img/driver.png';
import family from '../img/family.png';



const Feature3 = () => {


    return (
        <>
            
            <section className="team section-bg">
            
                    <div className="section-title">

                        <h3> Les Options gratuites </h3>
                        <p>Pour un voyage sur mesure avec WayCab</p>
                    </div>


                    <div className="row justify-content-center">
        <div className="col-lg-4 col-md-6 d-flex justify-content-center align-items-stretch" data-aos="zoom-in" data-aos-delay="100">
            <div className="icon-box text-center">
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <Image
                        style={{ borderRadius: '50%' }}
                        boxSize="100px"
                        src={family}
                    />
                </div>
                <h4>Waycab Famille</h4>
                <p>Un siège bébé (0 à 4 ans) <br />et 1 ou 2 rehausseurs (4 à 10 ans).</p>
            </div>
        </div>
        <div className="col-lg-4 col-md-6 d-flex justify-content-center align-items-stretch" data-aos="zoom-in" data-aos-delay="200">
            <div className="text-center d-flex flex-column justify-content-center align-items-center">
                <Image
                    style={{ borderRadius: '50%' }}
                    boxSize="100px"
                    src={dog}
                />
                <h4>Animal à Bord</h4>
                <p>Un taxi qui accueille les animaux.</p>
            </div>
        </div>
        <div className="col-lg-4 col-md-6 d-flex justify-content-center align-items-stretch" data-aos="zoom-in" data-aos-delay="300">
            <div className="icon-box text-center">
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <Image
                        style={{ borderRadius: '50%' }}
                        boxSize="100px"
                        src={driver}
                    />
                </div>
                <h4>Chauffeur Anglophone</h4>
                <p>Un chauffeur qui parle anglais.</p>
            </div>
        </div>
    </div>




        
            </section>
        </>
    )
}

export default Feature3