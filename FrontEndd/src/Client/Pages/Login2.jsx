import React from 'react'

import Header from './components/Home/Header'
import Footer from './components/Home/Footer'
import LoginForm from './components/AuthClient/LoginForm'
const Login2 = () => {
  
  return (
  <>
  <Header/>
  <section id="hero" class="d-flex align-items-center justify-content-center">
                <div class="container">
                   <div class="mx-2 card bg-white max-w-2xl p-5 md:rounded-lg  mx-auto">
<LoginForm/>
</div>
                </div>
            </section>
<Footer/>
  </>
  )
}

export default Login2