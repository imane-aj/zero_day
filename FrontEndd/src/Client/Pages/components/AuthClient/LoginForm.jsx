import React from 'react'
import { useState } from "react";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser2 } from '../../../../Redux/AuthSlice';
import Cookies from 'js-cookie';
import { getCookie } from '../../../../Redux/Utils';
import {  useToast } from "@chakra-ui/react";
import {  removeCookie }from '../../../../Redux/Utils';
const LoginForm = () => {
    const toast = useToast();
    const [email, setEmail] = useState();

    const [password, setPassword] = useState();

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const session = getCookie('token')
    const users = useSelector((state)=>state.auth.user)
    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth' // Use smooth scrolling effect
        });
      };
    const submitHandler = async (e) => {

        e.preventDefault();
        if(!email || !password ){

            toast({
                title: "please fill all the fields !",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
        } else{
        const user = { email, password };
        
        // Dispatch the login action
        await dispatch(loginUser2(user)).then((res) => {
            if (res.type === 'auth/loginUser2/fulfilled') {
            const loggedInUser = res.payload.user;

            if (loggedInUser.role !== "admin") {
                navigate('/')
                Cookies.set('currentClient', JSON.stringify(loggedInUser), { expires: 1 / 96 });
            } 
            else{
                toast({
                    title: "Veuillez entrer a le login de ladmin ",
                    status: "warning",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                });
                removeCookie('token');
                removeCookie('currentUser');
            }
        } else{
            toast({
                title: "Veuillez entrer des informations valides. ",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
        }
    
           
          
             
    
            });
        
    
       
      
        if (typeof callback === 'function') {
          callback();
        }
        }
    
            
    }

    return (
        <>
            <div class="title">
                <h1 class="font-bold text-center">Se Connecter </h1>
            </div>



            <div class="form mt-4">

                <div class="flex flex-col text-sm mb-4">
                    <label for="email" class="font-bold mb-3">E-mail</label>
                    <input class=" appearance-none border border-gray-200 p-2 focus:outline-none focus:border-gray-500" type="email" placeholder="Enter votre E-mail" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div class="flex flex-col text-sm mb-4">
                    <label for="password" class="font-bold mb-3">Mot de passe</label>
                    <input class=" appearance-none border border-gray-200 p-2 focus:outline-none focus:border-gray-500" type="password" placeholder="Enter votre Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>

            </div>

            <div class="submit mb-5">
                <button type="submit" class=" w-full  shadow-lg text-white px-4 py-2 hover:bg-blue-700 mt-8 text-center font-semibold focus:outline-none " style={{ backgroundColor: '#1E88E5' }}  onClick={submitHandler}>Se Connecter</button>
            </div>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">

                Vous n`avez pas un compte?  <a href="/signup" class="font-medium text-primary-600 hover:underline dark:text-primary-500" onClick={scrollToTop}>Creez-le</a>
            </p>
        </>
    )
}

export default LoginForm
