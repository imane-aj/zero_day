
import React, { useEffect, useState } from 'react';

import Header from './components/Home/Header';
import Footer from './components/Home/Footer';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { MessagesClient } from '../../Redux/MessageSlice';
import { ChakraProvider } from '@chakra-ui/react';
const Profile = () => {



  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [dataToDisplay, setDataToDisplay] = useState([]);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {

    const userCookies = Cookies.get('currentClient');
    if (userCookies) {
      try {
        const parsedData = JSON.parse(userCookies);
        setName(parsedData.name);
        setLastname(parsedData.lastName);
        setEmail(parsedData.email);
        setPhone(parsedData.phone);
      } catch (error) {
        console.error('Error parsing userCookies:', error);
      }
    } else {
      navigate('/')
    }

  }, []);

  useEffect(() => {

    var formData = new FormData();

    formData.append('email', email);
    dispatch(MessagesClient(formData)).then((res) => {
      setDataToDisplay(res.payload)
    })
  }, [dispatch, email]);


  return (
    <>
      <Header />
      <section id="hero" class="d-flex align-items-center justify-content-center">
        <div class="container">



          <div className="row">

            <div className="col-lg-12">
           
              <div className="row">
                <div className="col-md-5">
                <div className="card mb-2">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">nom</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{name}  {lastname}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">prenom</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0"> {lastname}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Email</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{email}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Phone</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{phone}</p>
                    </div>
                  </div>


                </div>
                </div>
                </div>
                <div className="col-md-7">
                  <div className="card mb-4 mb-md-0">
                    <div className="card-body">
                      <h3 >Mes messages</h3>
                      <div class=" flex  w-full items-center justify-center">

                        <div class="container mx-auto py-16 flex justify-center ">
                          <div class="w-full    flex flex-col">


                            <div class="w-full  overflow-auto shadow bg-white" id="journal-scroll">

                              <table class="w-full">


                                <tbody class="">
                                {dataToDisplay?.map((val, idx) => ( <tr class=" relative transform scale-100
                                        text-s py-1 border-b-2 border-blue-100 cursor-default

                                bg-blue-500 bg-opacity-25">
                               

                                    <td class="pl-5 pr-3 pb-3 pt-3 whitespace-no-wrap">
                                    <h5
        className="leading-5 text-gray-500"
        style={{
   // Example border style
            paddingBottom: '5px' // Example padding for spacing
        }}
    >
        Titre: {val.subject}
    </h5>
                                  
                                      <div class="leading-5 text-gray-500 font-medium" style={{ fontSize: 'medium' }}> {val.msg}</div>
                                    </td>

                                  </tr>))}
                                
                                </tbody>
                              </table>
                            </div>

















                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ChakraProvider>
      <Footer />
      </ChakraProvider>
    </>

  )
}

export default Profile