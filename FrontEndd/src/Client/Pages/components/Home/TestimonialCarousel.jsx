import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import pic1 from './assets/img/testimonials/testimonials-1.jpg';
import pic2 from './assets/img/testimonials/testimonials-2.jpg';
import pic3 from './assets/img/testimonials/testimonials-3.jpg';
import '../css/carousel.css'
const TestimonialCarousel = () => {
  const testimonials = [
    {
      image: pic1,
      name: '2.	Thomas P.',
      quote:
        "Après un vol épuisant, j'ai réservé un transfert depuis l'aéroport avec WayCab. Le chauffeur m'attendait à l'arrivée, ce qui a rendu la transition de l'aéroport à mon hôtel incroyablement lisse. Le service attentionné et la qualité du véhicule ont dépassé mes attentes.",
    },
    {
      image: pic2,
      name: 'Marie L.',
    
      quote:
        "Mon voyage de Bruxelles à Paris avec WayCab a été parfaitement organisé. Le chauffeur était professionnel et m'a conduit en toute sécurité et confort. J'ai été impressionné par la facilité de réservation et la ponctualité du service. WayCab a rendu ce long trajet agréable et sans stress.",
    },
    {
      image: pic3,
      name: 'Sophie',
    
      quote:
        "J'ai utilisé les services de taxi WayCab à plusieurs reprises et je suis toujours impressionnée par la qualité du service. Les chauffeurs sont courtois, les véhicules sont propres et le trajet est toujours confortable. WayCab est ma première option pour les déplacements en taxi, que ce soit en ville ou entre les villes.",
    },
  ];
  const carouselStyle = {
    height: '400px', // Set the desired height here
  };
  return (
    <div className="testimonial-carousel" >
      <Carousel autoPlay={true} showArrows={false} infiniteLoop={true}>
        {testimonials.map((testimonial, index) => (
          <div className="testimonial-item">
            <div className="testimonial-slide ">
              <img src={testimonial.image} className="testimonial-img" alt="" />
              <h3>{testimonial.name}</h3>
              <h4>{testimonial.title}</h4>
              <p style={{ color: 'black',paddingBottom:'30px' }}>
                <i className="bx bxs-quote-alt-left quote-icon-left"></i>
                {testimonial.quote}
                <i className="bx bxs-quote-alt-right quote-icon-right"></i>
              </p>

            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default TestimonialCarousel;

