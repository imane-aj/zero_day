import React from 'react'
import { useState } from "react";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { NewUser } from '../../../../Redux/AuthSlice';
import { getCookie } from '../../../../Redux/Utils';
import { FaPhone } from 'react-icons/fa';
import { Box, useToast, useBreakpointValue } from "@chakra-ui/react";
import Cookies from 'js-cookie';
const SigngupForm = () => {
    const [name, setName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [password, setPassword] = useState();
    const [c_password, setC_password] = useState();
    const [role, setRole] = useState('user');
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const toast = useToast();
    const users = useSelector((state)=>state.auth.user)
    const error = useSelector((state)=>state.auth.error) 




    const validatePassword = (password) => {
        // Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        return regex.test(password);
      };

    const submitHandler =  async (e) => {
        e.preventDefault();
     
if(!name || !lastName || !phone || !email  || !password  ||!c_password || password !== c_password ){

    toast({
        title: "please fill all the fields or make sure the passwords match !",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
    });
} else{     
    const user = { name, lastName, phone, role,email, password, c_password };
    await dispatch(NewUser(user)).then((res) => {
        if (res.type === 'auth/NewUser/fulfilled') {
            const loggedInUser = res.payload.user;
            navigate('/')
  
            Cookies.set('currentClient', JSON.stringify(loggedInUser), { expires: 1 / 96 });
        }
        else if (res.type === 'auth/NewUser/rejected')
        
      { if (error && error.email && error.email[0] === "The email has already been taken.") {
            // The error object matches the expected structure
       {
            toast({
                title:"Error: The email has already been taken.",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });}
        }}
           

        
      
         

        });
    

   
  
    if (typeof callback === 'function') {
      callback();
    }

}
        

    }

    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth' // Use smooth scrolling effect
        });
      };

     
    
    return (
    <>
            <div class="title">
                <h1 class="font-bold text-center">Créer un compte </h1>
            </div>

        

            <div class="form mt-4">
                <div class="flex flex-col text-sm mb-4">
                    <label for="name" class="font-bold mb-3">Nom</label>
                    <input class=" appearance-none border border-gray-200 p-2 focus:outline-none focus:border-gray-500" type="text" placeholder="Entrez votre Nom" value={name}  onChange={(e) => setName(e.target.value)}/>
                </div>
                <div class="flex flex-col text-sm mb-4">
                    <label for="lastName" class="font-bold mb-3">Prénom</label>
                    <input class=" appearance-none border border-gray-200 p-2 focus:outline-none focus:border-gray-500" type="text" placeholder="Entrez votre Prénom" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                </div>
                <div class="flex flex-col text-sm mb-4">
                    <label for="phone number" class="font-bold mb-3">Numéro de téléphone</label>
                    <input class=" appearance-none border border-gray-200 p-2 focus:outline-none focus:border-gray-500" type="tel" placeholder="Entrez votre Numéro de téléphone" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                </div>
                <div class="flex flex-col text-sm mb-4">
                    <label for="email" class="font-bold mb-3">E-mail</label>
                    <input class=" appearance-none border border-gray-200 p-2 focus:outline-none focus:border-gray-500" type="email" placeholder="Enter votre E-mail" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div class="flex flex-col text-sm mb-4">
                    <label for="password" class="font-bold mb-3">Mot de passe</label>
                    <input class=" appearance-none border border-gray-200 p-2 focus:outline-none focus:border-gray-500" type="password" placeholder="Enter votre Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div class="flex flex-col text-sm mb-2">
                    <label for="email" class="font-bold mb-3">Confirmez votre mot de passe</label>
                    <input class=" appearance-none border border-gray-200 p-2 focus:outline-none focus:border-gray-500" type="password" placeholder="Confirmez votre mot de passe" value={c_password} onChange={(e) => setC_password(e.target.value)}/>
                </div>
            </div>

            <div class="submit mb-5">
                <button type="submit" class=" w-full  shadow-lg text-white px-4 py-2 hover:bg-blue-700 mt-8 text-center font-semibold focus:outline-none " style={{backgroundColor:'#1E88E5'}}    onClick={submitHandler}>Créer un compte</button>
            </div>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                     
Vous avez déjà un compte?  <a href="/login2" class="font-medium text-primary-600 hover:underline dark:text-primary-500" onClick={scrollToTop}>Connectez-vous ici</a>
                  </p>
     </>
    )
}

export default SigngupForm