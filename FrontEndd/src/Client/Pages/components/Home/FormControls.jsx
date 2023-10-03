import React, { useRef } from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css';
// import IconButton from "@mui/material/IconButton";


import AOS from 'aos';
import 'aos/dist/aos.css';

import { useState } from "react";
import { Button } from "@chakra-ui/button";
import { FormControl } from "@chakra-ui/form-control";
import { Input, InputGroup } from "@chakra-ui/input";


import {  useToast } from "@chakra-ui/react";

import { Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next';
import { useAppContext } from '../../../Context/FromContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { calcul } from '../../../../Redux/ReservationSlice';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';

import { GoogleMap, useJsApiLoader, Marker, Autocomplete, DirectionsRenderer } from '@react-google-maps/api'

const center = {
    lat: 50.8595731921334, // Replace with the latitude of your desired center
    lng: 4.380540204487094, // Replace with the longitude of your desired center
};

const containerStyle = {
    width: "100%",
    height: "100%",
};
const FormControls = () => {
    useEffect(() => {
        AOS.init();
    }, [])


    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyB47Ctar6BUmoZJT9vYmPafhab-sCjwjJE",
        libraries: ['places']
    })








    const {t, i18n} = useTranslation()

    const {
        depart,
        setDepart,
        arrive,
        setArrive,
        selectedTrajet,
        setselectedTrajet,
        selectedDate,
        setselectedDate,
        selectedTime,
        setselectedTime,

        type,
        setType,
    } = useAppContext();


    const [map, setMap] = useState(/** @type google.maps.Map */(null))
    const [directionsResponse, setDirectionsResponse] = useState(null)
    const [distance, setDistance] = useState('');
    const [distanceOutput, setDistanceOutput] = useState('');
    const [duration, setDuration] = useState('');
    const [time, setTime] = useState('');
    /** @type React.MutableRefObject<HTML.InputElement */


    const originRef = useRef('');





    const destinationRef = useRef('');

    // useEffect to set default values when refs are available


    // useEffect to set default values when refs are available
    //   useEffect(() => {
    //     // Check if both refs are available
    //     if (originRef.current && destinationRef.current) {
    //       // Set default values for origin and destination
    //       originRef.current.value = 'Your default origin value';
    //       destinationRef.current.value = 'Your default destination value';
    //     }
    //   }, []);
    //     const originRef = useRef()
    //     /** @type React.MutableRefObject<HTML.InputElement */
    //     const destinationRef = useRef('')


    // Read the value from localStorage for origin




    async function calculateDistance() {

        if (originRef.current.value === '' || destinationRef.current.value === '') {
            return
        }

        const directionsService = new google.maps.DirectionsService()

        const result = await directionsService.route({
            origin: originRef.current.value,
            destination: destinationRef.current.value,
            travelMode: google.maps.TravelMode.DRIVING
        });
        setDepart(originRef.current.value)
        setArrive(destinationRef.current.value)
        setDirectionsResponse(result)
        setDistance(result.routes[0].legs[0].distance.value)
        setDistanceOutput(result.routes[0].legs[0].distance.text)
        setDuration(result.routes[0].legs[0].duration.text)
        setTime(result.routes[0].legs[0].duration.value)

    }




    const distanceKm = distance / 1000

    const min = time / 60
 

    const resetStateToNull = () => {
        setDepart('');
        setArrive('');
        setselectedTrajet(null);
        setselectedDate(null);
        setType('')

    };
    useEffect(() => {
        resetStateToNull();
    }, []);


    useEffect(() => {
        calculateDistance();
    }, [originRef.current.value, destinationRef.current.value]);



    // Call the reset function when entering the page

    const navigate = useNavigate();
    const toast = useToast();
    const dispatch = useDispatch();



    const handleTypeSelection = (selectedType) => {
        setType(selectedType);
    };
    const handleType = (selectedType) => {
        setType(selectedType);
        setselectedDate(null);

    };
    // END Plus Tard ou Immediat

    // sans ou avec Arret

    const handleTrajet = () => {

        setselectedTrajet(false);
        setselectedTime(0);
    };
    const handleTrajetSelection = () => {
        setselectedTrajet(true);
    };
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };
    const handleBlur = () => {
        setIsFocused(false);
    };
    //  END sans ou avec Arret





    const submitHandler = () => {

        let errorMessage = null;


        if (!depart || !arrive) {
            errorMessage = "Entrez les coordonnées du trajet";
        } else if (selectedTrajet == null) {
            errorMessage = "Entrez le type du trajet";
        } else if (selectedTrajet == true) {
            if (selectedTime === '' || selectedTime === null || selectedTime === undefined || selectedTime === 0) {
                errorMessage = "Entrez le nombre d'heure que vous voulez arrêter";
            } else if (type !== "plus tard" && type !== "Immédiate") {
                errorMessage = "Entrez la type de votre réservation";

            }
            else if (type == "plus tard" && (selectedDate === '' || selectedDate === null || selectedDate === undefined || selectedDate === 0)) {
                errorMessage = "Entrez la date de votre depart";

            }
        } else if (type !== "plus tard" && type !== "Immédiate") {
            errorMessage = "Entrez la date de votre réservation";

        }
        else if (type == "plus tard" && (selectedDate === '' || selectedDate === null || selectedDate === undefined || selectedDate === 0)) {
            errorMessage = "Entrez la date de votre depart";

        }









        if (errorMessage) {
            toast({
                title: errorMessage,
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
        } else {


            const newData = {
                depart,
                arrive,
                selectedTrajet,
                selectedDate,
                type,
                distanceKm,
                selectedTime,
                min
            };

            var formData = new FormData();

            formData.append('distance', distanceKm);
            formData.append('disp', type);
            formData.append('tripType', selectedTrajet);
            formData.append('heure', selectedTime);
            formData.append('min', min);
            dispatch(calcul(formData)).then((res) => {
                const updatedNewData = { ...newData, pricing: res.payload };

                Cookies.set('newData', JSON.stringify(updatedNewData), { expires: 1 / 96 });
                navigate('/formconfirmation', { state: { updatedNewData } });
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth' // Use smooth scrolling effect
                });

            });

        }







    };





    // Button Selected Styles 
    const buttonStyle = {
        fontWeight: 'bold',
        color: 'black',
        flex: 1,
        fontSize: '15px',

        height: '50px',
        backgroundColor: '#F0FFFF',

        borderRadius: '25px',

        border: 'none',
        cursor: 'pointer',
    };

    const selectedButtonStyle = {
        ...buttonStyle,
        backgroundColor: '#FECD70',
    };
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Use smooth scrolling effect
        });
    };
    return (
        <section id="hero" class="d-flex align-items-center justify-content-center">
        <div class="container">

            <div className="bg-gray-500 flex items-center justify-center px-1 py-1">
                <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden">
 
                        <div className="md:flex w-full">
                            <div className="hidden md:block w-1/2 bg-indigo-500 py-0 px-0">
                                {isLoaded && (<GoogleMap

                                    mapContainerStyle={containerStyle}
                                    center={center}
                                    zoom={10}
                                    onLoad={(map) => setMap(map)}
                                    style={{ marginBottom: '20px', marginTop: '20px' }}
                                >
                                    { /* Child components, such as markers, info windows, etc. */}
                                    <Marker position={center} />
                                    {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
                                </GoogleMap>
                                )}
                            </div>
                            <div className="w-full sm:w-full  md:w-1/2 lg:w-1/2 xl:w-1/2 p-2 py-10 px-5 md:px-10" style={{ backgroundColor: '#F9F9F9' }} >
                                <div className="text-center mb-7">
                                    <h1 className="font-bold text-3xl" style={{ color: '#FFD700' }}>WayCab</h1>


                                </div>
                                <div>
                                    <div className="flex -mx-3">
                                        <div className="w-full px-3 mb-3">
                                            <label htmlFor="" className="text-s font-semibold px-1 mb-1">
                                                {t('depart')}
                                            </label>
                                            <div className="flex">

                                                <FormControl id="depart"  >
                                                    {isLoaded && (<Autocomplete onPlaceChanged={(place) => setDepart(place)}
                                                    >
                                                        <InputGroup >
                                                            {/* <FormLabel width='20%' marginTop={1} pointerEvents='none' fontWeight="bold" color={'black'}>
                                            Départ:
                                        </FormLabel> */}

                                                            <Input
                                                                placeholder="Addresse de Départ"
                                                              
                                                              
                                                                className="form-control rounded-pill mr-1"
                                                                onChange={() => calculateDistance()}
                                                                py="2"
                                                                pl="3"
                                                                pr="5"
                                                                borderColor="transparent" // Set border color to transparent
                                                                boxShadow="none" // Remove the box shadow\
                                                                ref={originRef}
                                                            />

                                                        </InputGroup>
                                                    </Autocomplete>)}
                                                </FormControl>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex -mx-3">
                                        <div className="w-full px-3 mb-3">
                                            <label htmlFor="" className="text-s font-semibold px-1 mb-1">
                                            {t('arrive')} :
                                            </label>
                                            <div className="flex">

                                                <FormControl id="arrive"  >
                                                    {isLoaded && (<Autocomplete >
                                                        <InputGroup>




                                                            <Input
                                                                placeholder="Addresse de Destination" // Add your placeholder text here
                                                               
                                                          
                                                                className="form-control rounded-pill mr-1"
                                                          
                                                                onChange={() => calculateDistance()}
                                                                py="2"
                                                                pl="3"
                                                                pr="5"
                                                                borderColor="transparent"
                                                                boxShadow="none"
                                                                ref={destinationRef}
                                                            />



                                                        </InputGroup>
                                                    </Autocomplete>)}
                                                </FormControl>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex -mx-3">
                                        <div className="w-full px-1 mb-1">
                                            <label htmlFor="" className="text-s font-semibold px-1 mb-2">
                                                TYPE DE TRAJET :
                                            </label>
                                            <div className="flex">

                                                <div class="w-1/2 px-3 mb-2">

                                                    <div class="flex">
                                                        <Button
                                                            onClick={() => handleTrajet()}
                                                            className="form-control rounded-pill"
                                                            style={selectedTrajet === false ? selectedButtonStyle : buttonStyle}
                                                        >
                                                            sans arrêt
                                                        </Button>
                                                    </div>
                                                </div>
                                                <div class="w-1/2 px-3 mb-2">

                                                    <div class="flex">
                                                        <Button
                                                            onClick={() => handleTrajetSelection()}
                                                            className="form-control rounded-pill"
                                                            style={selectedTrajet === true ? selectedButtonStyle : buttonStyle}
                                                        >
                                                            avec arrêt
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {selectedTrajet &&
                                        (<div className="flex -mx-3">
                                            <div className="w-full px-5 mb-3">
                                                <input

                                                    id="arret"
                                                    className="form-control rounded-pill mr-1"
                                                    type="text"
                                                    placeholder="Combien d'heures ?" // Add your placeholder text here


                                                    onChange={(e) => setselectedTime(e.target.value)}

                                                    required
                                                />

                                            </div></div>
                                        )}
                                    <div className="flex -mx-3">
                                        <div className="w-full px-1 mb-2">
                                            <label htmlFor="" className="text-s font-semibold px-1 mb-2">
                                                DATE DE DÉPART:                                            </label>
                                            <div className="flex">

                                                <div class="w-1/2 px-3 mb-2">

                                                    <div class="flex">
                                                        <Button
                                                            onClick={() => handleType("Immédiate")}

                                                            className=" form-control rounded-pill"

                                                            style={type === "Immédiate" ? selectedButtonStyle : buttonStyle}
                                                        >
                                                            Immediate
                                                        </Button>
                                                    </div>
                                                </div>
                                                <div class="w-1/2 px-3 mb-2">

                                                    <div class="flex">
                                                        <Button
                                                            onClick={() => handleTypeSelection("plus tard")}
                                                            className="form-control rounded-pill"
                                                            style={type === "plus tard" ? selectedButtonStyle : buttonStyle}
                                                        >
                                                            Plus tard
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {type === "plus tard" &&
                                        (<div className="flex -mx-3">
                                            <div className="w-full px-5 mb-2">

                                                <input
                                                    id="pickupDate"
                                                    className="form-control"
                                                    type="datetime-local" // Use datetime-local type
                                                    value={selectedDate}
                                                    onChange={(e) => setselectedDate(e.target.value)}

                                                    required
                                                />

                                            </div></div>
                                        )}

                                    {directionsResponse && (

                                        <div className="flex">

                                            <div class="w-1/2 px-3 mb-4">

                                                <div class="text-center">
                                                    <Text as='b'>  Distance : {distanceOutput}</Text>

                                                </div>
                                            </div>
                                            <div class="w-1/2 px-3 mb-4">

                                                <div class="text-center">
                                                    <Text as='b'>  Duration : {duration}</Text>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div className="flex -mx-3">
                                        <div className="w-full px-1 mb-2">
                                            <div className="flex">

                                                <div class="w-1/2 px-3 mb-2">

                                                    <div class="flex">
                                                        <Button
                                                            onClick={submitHandler}
                                                            className="rounded-lg"
                                                            style={{
                                                                fontWeight: 'bold',
                                                                color: 'black',
                                                                flex: 1,
                                                                fontSize: '15px',

                                                                height: '70px',
                                                                backgroundColor: '#07C801',



                                                                border: 'none',
                                                                cursor: 'pointer',
                                                            }}
                                                        >
                                                            Faire une<br /> estimation
                                                        </Button>
                                                    </div>
                                                </div>
                                                <div class="w-1/2 px-3 mb-2">

                                                    <div class="flex">
                                                        <Button
                                                            onClick={submitHandler}
                                                            className="rounded-lg"
                                                            style={{
                                                                fontWeight: 'bold',
                                                                color: 'black',
                                                                flex: 1,
                                                                fontSize: '15px',

                                                                height: '70px',
                                                                backgroundColor: 'yellow',



                                                                border: 'none',
                                                                cursor: 'pointer',
                                                            }}
                                                        >
                                                            Commandez
                                                        </Button>
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
             
    )
}

export default FormControls