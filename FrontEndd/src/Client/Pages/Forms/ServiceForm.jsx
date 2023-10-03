import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Home/Header';
import Footer from '../components/Home/Footer';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createService  } from '../../../Redux/RequestSlice';
import { useNavigate } from 'react-router-dom';
import { Button } from "@chakra-ui/button";
import Swal from 'sweetalert2'
import stars from '../components/img/stars.svg'
// import '../components/css/styleconfirmation.css'
const ServiceForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
      // const location = useLocation();
      const { id } = useParams();
  console.log(name)
  console.log(email)
  console.log(phone)
  console.log(message)
  
      const handleSubmit = (e) => {
        e.preventDefault();
  
  
        var formData = new FormData();
       
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('message', message);
        formData.append('service_id', id);
       
    
        // for (const pair of formData.entries()) {
        //   console.log(pair[0] + ": " + pair[1]);
        // }
        dispatch(createService(formData)).then((res) => {
          if (res.type === 'Request/createService/fulfilled') {
            navigate('/')
              Swal.fire('Success', 'Cette demande a été ajoutée avec succès.', 'success');
              
          }
      });
  
      window.scrollTo({
        top: 0,
        behavior: 'smooth' // Use smooth scrolling effect
      });
  
       }
       const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth' // Use smooth scrolling effect
        });
      };
 
      return (
          <>
              <Header />
              <section id="hero" class="d-flex align-items-center justify-content-center">
        <div class="container">

          <div className=" bg-gray-500 flex items-center justify-center px-1 py-1">
            <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden">

              <div class="min-h-screen bg-gray-100 p-0 sm:p-12">
                <div class="mx-auto max-w-xl px-6 py-12 border-0 shadow-lg sm:rounded-3xl" style={{ backgroundColor: '#F9F9F9' }}>
                <div className="text-center mb-3 d-flex flex-column align-items-center">

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
                                        <image xlinkHref={stars} x="0" y="0" width="100%" height="100%" style={{objectFit: 'cover'}} />
                                    
                                    </svg>
                    <h3 class="text-2xl font-bold mb-2">Facilitez Vos Trajets avec Nos Solutions de Transport</h3>
                  </div>
                 
                  <div>
                    <div className="flex -mx-3">
                      <div className="w-full px-3 mb-3">
                        <label htmlFor="" className="text-s font-semibold px-1 mb-1">
                          Nom et Prenom
                        </label>
                        <div className="flex">
                          <input
                            id="name"
                            className="form-control"
                            type="text"
                            placeholder="Entrez votre nom"
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex -mx-3">
                      <div className="w-full px-3 mb-3">
                        <label htmlFor="" className="text-s font-semibold px-1 mb-1">
                          Email
                        </label>
                        <div className="flex">

                          <input
                            id="email"
                            className="form-control"
                            type="email"
                            placeholder="Entrez votre email"
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>


                    <div className="flex -mx-3">
                      <div className="w-full px-3 mb-3">
                        <label htmlFor="pickupLocation" className="form-label">Tel</label>
                        <input
                          id="pickupLocation"
                          className="form-control"
                          type="text"
                          placeholder="Entrez votre numero de telephone"
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex -mx-3">
                      <div className="w-full px-3 mb-3">
                        <label htmlFor="destination" className="form-label">Message</label>
                        <textarea
                          style={{ height: '150px' }}// You can adjust this value to increase or decrease the height
                          id="destination"
                          className="form-control"
                          placeholder="Laissez nous un message"
                          onChange={(e) => setMessage(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex -mx-3 d-flex flex-column align-items-center">
        
                      <div className="px-5 py-3  d-flex flex-column align-items-center">  
                      <Button
                                fontWeight="bolder"
                                fontSize={'30px'}
                               w="100px"
                                h="60px"
                                bgColor="yellow"
                                className="form-control rounded-pill mr-4 ml-4"
                                onClick={handleSubmit}
                                style={{backgroundColor:'yellow'}}
                            >
                                Confirmez
                            </Button>
                      </div>
                    </div>

                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  
              <Footer />
  
  
          </>
      )
  
}

export default ServiceForm