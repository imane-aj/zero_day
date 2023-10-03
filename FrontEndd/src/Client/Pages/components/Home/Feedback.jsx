import React, { useState } from 'react';
import TestimonialCarousel from './TestimonialCarousel';



import pic1 from './assets/img/testimonials/testimonials-1.jpg';
import pic2 from './assets/img/testimonials/testimonials-2.jpg';
import pic3 from './assets/img/testimonials/testimonials-3.jpg';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader


// TestimonialCarousel component using Carousel
const Feedback = () => {
  


  return (
    <section id="testimonials" className="testimonials">
      <div className="container" data-aos="zoom-in">
  
    <TestimonialCarousel />
  </div>
  </section>  );
};




export default Feedback;
