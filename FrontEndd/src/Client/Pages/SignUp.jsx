import React from 'react'
import Header from './components/Home/Header'
import Footer from './components/Home/Footer'
import SigngupForm from './components/AuthClient/SigngupForm';



import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputLeftElement, InputRightElement } from "@chakra-ui/input";
const SignUp = () => {

 


    return (
        <>
            <Header />
            <section id="hero" class="d-flex align-items-center justify-content-center">
                <div class="container">
                   <div class="mx-2 card bg-white max-w-2xl p-5 md:rounded-lg  mx-auto">
                       <SigngupForm/>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default SignUp