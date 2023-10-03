import React from 'react'
import { Textarea } from '@chakra-ui/react';
import { StoreMessages } from '../../../../Redux/MessageSlice';

import { useState } from "react";

import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

const Info = () => {
    useEffect(() => {
        AOS.init();
      }, [])
      const navigate = useNavigate();
      const dispatch = useDispatch();
    const [name, setName] = useState();

    const [subject, setSubject] = useState();
    const [email, setEmail] = useState();
    const [message, setMessage] = useState();



    const submitHandler = (e) => {
        e.preventDefault();

        if(!name || !subject || !email || !message){
    
          toast({
              title: "please fill all the fields !",
              status: "warning",
              duration: 5000,
              isClosable: true,
              position: "bottom",
          });
      } else{
        var formData = new FormData();

        formData.append('fullName', name);
        formData.append('email', email);
        formData.append('subject', subject);
        formData.append('msg', message);
        dispatch(StoreMessages(formData)).then((res) => {
            if (res.type === 'message/StoreMessages/fulfilled') {
            
              Swal.fire('Success', 'Votre Message a été ajoutée avec succès.', 'success');

            }
          });
    
    }
    }

 
    return (
        <>
            <section id="contact" className="contact">
                <div className="container" data-aos="fade-up">
                    <div className="section-title">
                        {/* <h2>Contact</h2> */}
                        <h3>Contactez nous</h3>
                        
                    </div>

                    <div className="row" data-aos="fade-up" data-aos-delay="100">
                        <div className="col-lg-6">
                            <div className="info-box mb-4">
                                {/* <i className="bx bx-map"></i> */}
                                {/* <h3>Our Address</h3> */}
                                <h3>Bruxelles, Belgique</h3>
                            </div>
                        </div>



                        <div className="col-lg-3 col-md-6">
                            <div className="info-box  mb-4">
                                {/* <i className="bx bx-envelope"></i> */}
                                {/* <h3>Email Us</h3> */}
                                <h3>contact@waycab.be</h3>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6">
                            <div className="info-box  mb-4">
                                {/* <i className="bx bx-phone-call"></i> */}
                                {/* <h3>Call Us</h3> */}
                                <h3>+ 666666666666</h3>
                            </div>
                        </div>
                    </div>

                    <div className="row" data-aos="fade-up" data-aos-delay="100">
                        <div className="col-lg-6 ">
                            <iframe
                                className="mb-4 mb-lg-0"
                                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d25019.224005222893!2d4.360054!3d50.8466446!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x5f48a03532eaa700!2sCath%C3%A9drale%20Saints%20Michel%20et%20Gudule!5e0!3m2!1sen!2sbe!4v1630277753481!5m2!1sen!2sbe"
                          
                                style={{ border: '0', width: '100%', height: '100%' }}
                                allowFullScreen
                            ></iframe>  </div>

                        <div className="col-lg-6">
                            <form  className="php-email-form">
                            <div className="form-group">
                                    <input type="text" className="form-control" name="subject" id="subject" placeholder="Votre Nom et Prenom" value={name}
                                        onChange={(e) => setName(e.target.value)} />
                                </div>
                               
                                <div className="form-group">
                                    <input type="text" className="form-control" name="subject" id="subject" placeholder="E-mail" required value={email}
                                        onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" name="subject" id="subject" placeholder="Votre Sujet" value={subject}
                                        onChange={(e) => setSubject(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <textarea className="form-control" name="message" rows="7" placeholder="Message" required value={message}
                                        onChange={(e) => setMessage(e.target.value)} ></textarea>
                                </div>
                        
                                <div className="text-center"><button type='submit'  onClick={submitHandler}>Envoyer</button></div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
   
        </>
    )
}

export default Info