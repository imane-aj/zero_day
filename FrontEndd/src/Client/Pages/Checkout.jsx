import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Header from './components/Home/Header';
import Footer from './components/Home/Footer';
import { store } from '../../Redux/ReservationSlice';
import AOS from 'aos';
import 'aos/dist/aos.css';
import "./components/css/main.css"
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    AOS.init();
  }, [])

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [numTel, setNumTel] = useState('');
  const newDataCookie = Cookies.get('checkOutData');
  let parsedData;

  if (newDataCookie) {
    try {
      parsedData = JSON.parse(newDataCookie);
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  } else {
    // newDataCookie is undefined, navigate to '/'
    navigate('/');
  }

  // Use parsedData if available; otherwise, use newData from location.state
  const dataToUse = parsedData || newDataCookie;
  console.log(dataToUse)
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleNumTelChange = (e) => {
    setNumTel(e.target.value);
  };

  const handleSubmit = (e) => {

  var formData = new FormData();
  if (dataToUse.type === "plus tard") {
    formData.append('startPoint', dataToUse.depart);
    formData.append('endPoint', dataToUse.arrive);
    formData.append('distance', dataToUse.distance);
    formData.append('tripType', dataToUse.tripType);
    formData.append('disp', dataToUse.type);
    formData.append('date', dataToUse.selectedDate);
    formData.append('heure', dataToUse.selectedTime);
    formData.append('price', dataToUse.price);
    formData.append('min', dataToUse.time);
    formData.append('vehicule_id', dataToUse.cab);
    formData.append('fullName', name);
    formData.append('email', email);
    formData.append('phone', numTel);
  } else {
    formData.append('startPoint', dataToUse.depart);
    formData.append('endPoint', dataToUse.arrive);
    formData.append('distance', dataToUse.distance);
    formData.append('tripType', dataToUse.tripType);
    formData.append('heure', dataToUse.selectedTime);
    formData.append('price', dataToUse.price);
    formData.append('min', dataToUse.time);
    formData.append('disp', dataToUse.type);
    formData.append('vehicule_id', dataToUse.cab);
    formData.append('fullName', name);
    formData.append('email', email);
    formData.append('phone', numTel);
  }
  for (const pair of formData.entries()) {
    console.log(pair[0] + ": " + pair[1]);
  }
  dispatch(store(formData)).then((res) => {
    if (res.type === 'Reservation/store/fulfilled') {
      Swal.fire('Success', 'Cette réservation a été ajoutée avec succès.', 'success');
      navigate('/')
      Cookies.remove("newData")
      Cookies.remove("checkOutData")
      Cookies.remove("selectedVehicleId")
    }
  });
  }
  return (
    <>
      <Header />
      <section style={{ paddingTop: '10%' }}>



        <div className="relative mx-auto w-full" data-aos="fade-up">
          <div className="grid min-h-screen grid-cols-10  ">
            <div className="col-span-full py-6 px-4 sm:py-12 lg:col-span-6 lg:py-24 ">
              <div className="mx-auto w-full max-w-lg bg-white">
                <h1 className="relative text-2xl font-medium text-gray-700 sm:text-3xl">Terminez votre réservation<span className="mt-2 block h-1 w-10 bg-teal-600 sm:w-20"></span></h1>
                <form action="" className="mt-10 flex flex-col space-y-4">
                  <div><label htmlFor="Name" className="text-xs font-semibold text-gray-500">Nom </label><input type="text" id="name" name="name" placeholder="John Doe" className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"   value={name}
          onChange={handleNameChange}/></div>
                  <div><label htmlFor="email" className="text-xs font-semibold text-gray-500">Email</label><input type="email" id="email" name="email" placeholder="john.capler@fang.com" className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"   value={email}
          onChange={handleEmailChange}/></div>
                  <div><label htmlFor="email" className="text-xs font-semibold text-gray-500">Telephone</label><input type="tel" id="email" name="tel" placeholder="+33 06666666" className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"  value={numTel}
          onChange={handleNumTelChange}/></div>


                </form>


                <button type="submit" className=" mt-4 inline-flex w-full items-center justify-center  rounded  text-opacity-80 outline-none text-gray-900 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm py-3.5 px-4 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50 mr-2 mb-2"  onClick={handleSubmit}>Place Order</button>
              </div>
            </div>
            <div className="relative col-span-full flex flex-col py-6 pl-8 pr-4 sm:py-12 lg:col-span-4 lg:py-24 bg-green">

              <div>

                <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-teal-800 to-teal-400 opacity-95"></div>
              </div>
              <div className="relative">
                <ul className="space-y-5">
                <li className="flex justify-between">
                   <div className="inline-flex">

                   <div className="mr-7">
                       <h5 className=" text-base font-semibold text-white">Départ de:  </h5>

                      </div>
                    </div>
                    <p className="font-semibold text-white">{dataToUse.depart}</p>
                  </li>
                  <li className="flex justify-between">
                    <div className="inline-flex">

                    <div className="mr-7">
                        <h5 className="text-base font-semibold text-white">Arrivée à: </h5>

                      </div>
                    </div>
                    <p className="font-semibold text-white">{dataToUse.arrive}</p>
                  </li>
                  {dataToUse.selectedTrajet ? (
                   <li className="flex justify-between">
                   <div className="inline-flex">

                   <div className="mr-5">
                       <h5 className=" text-base font-semibold text-white">Type de trajet: </h5>

                     </div>
                   </div>
                   <p className="font-semibold text-white">Avec un Arret de {dataToUse.selectedTime} heure</p>
                 </li>
                  ) : (
                    <li className="flex justify-between">
                    <div className="inline-flex">

                    <div className="mr-5">
                        <h5 className=" text-base font-semibold text-white">Type de trajet:</h5>

                      </div>
                    </div>
                    <p className="font-semibold text-white">Sans Arret</p>
                  </li>
                  )}

                  {dataToUse.type == "Immédiate" ? (
                    <li className="flex justify-between">
                      <div className="inline-flex">

                      <div className="mr-5">
                          <h5 className="text-base font-semibold text-white">Date de départ :</h5>

                        </div>
                      </div>
                      <p className="font-semibold text-white">Immédiate</p>
                    </li>
                  ) : (
                    <li className="flex justify-between">
                      <div className="inline-flex">

                      <div className="mr-5">
                          <h5 className="text-base font-semibold text-white">Date de départ :</h5>

                        </div>
                      </div>
                      <p className="font-semibold text-white">{dataToUse.selectedDate}</p>
                    </li>
                  )}


                  <li className="flex justify-between">
                    <div className="inline-flex">

                    <div className="mr-5">
                        <h5 className="text-base font-semibold text-white">Type de vehicule</h5>

                      </div>
                    </div>
                    <p className="font-semibold text-white">{dataToUse.carType}</p>
                  </li>
                  <li className="flex justify-between">
                    <div className="inline-flex">

                    <div className="mr-5">
                        <h5 className="text-base font-semibold text-white">Taxe</h5>

                      </div>
                    </div>
                    <p className="font-semibold text-white">{dataToUse.taxe}</p>
                  </li>
                </ul>
                <div className="my-5 h-0.5 w-full bg-white bg-opacity-30"></div>
                <div className="space-y-2">
                  <p className="flex justify-between text-lg font-bold text-white"><span>Prix total:</span><span>{dataToUse.price} &euro;</span></p>
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

export default Checkout


{/* <div className="container">
<div className="py-5 text-center">
  <h2>Checkout form</h2>
  <p className="lead">Below is an example form built entirely with Bootstrap’s form controls. Each required form group has a validation state that can be triggered by attempting to submit the form without completing it.</p>
</div>

<div className="row">
  <div className="col-md-6 order-md-2 mb-4 ">
    <h4 className="d-flex justify-content-between align-items-center mb-3">
      <span className="text-muted">Your cart</span>
      <span className="badge badge-secondary badge-pill">3</span>
    </h4>
    <ul className="list-group mb-3">
      <li className="list-group-item d-flex justify-content-between lh-condensed">
        <div>
          <h6 className="my-0">Product name</h6>
          <small className="text-muted">Brief description</small>
        </div>
        <span className="text-muted">$12</span>
      </li>
      <li className="list-group-item d-flex justify-content-between lh-condensed">
        <div>
          <h6 className="my-0">Second product</h6>
          <small className="text-muted">Brief description</small>
        </div>
        <span className="text-muted">$8</span>
      </li>
      <li className="list-group-item d-flex justify-content-between lh-condensed">
        <div>
          <h6 className="my-0">Third item</h6>
          <small className="text-muted">Brief description</small>
        </div>
        <span className="text-muted">$5</span>
      </li>
      <li className="list-group-item d-flex justify-content-between bg-light">
        <div className="text-success">
          <h6 className="my-0">Promo code</h6>
          <small>EXAMPLECODE</small>
        </div>
        <span className="text-success">-$5</span>
      </li>
      <li className="list-group-item d-flex justify-content-between">
        <span>Total (USD)</span>
        <strong>$20</strong>
      </li>
    </ul>

    <form className="card p-2">
      <div className="input-group">
        <input type="text" className="form-control" placeholder="Promo code" />
        <div className="input-group-append">
          <button type="submit" className="btn btn-secondary">Redeem</button>
        </div>
      </div>
    </form>
  </div>
  
  <div className="col-md-6 order-md-1">
    <h4 className="mb-3">Billing address</h4>
    <form className="needs-validation" noValidate>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="firstName">First name</label>
          <input type="text" className="form-control" id="firstName" placeholder="" value="" required />
          <div className="invalid-feedback">
            Valid first name is required.
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="lastName">Last name</label>
          <input type="text" className="form-control" id="lastName" placeholder="" value="" required />
          <div className="invalid-feedback">
            Valid last name is required.
          </div>
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="username">Username</label>
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">@</span>
          </div>
          <input type="text" className="form-control" id="username" placeholder="Username" required />
          <div className="invalid-feedback" style={{ width: '100%' }}>
            Your username is required.
          </div>
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="email">Email <span className="text-muted">(Optional)</span></label>
        <input type="email" className="form-control" id="email" placeholder="you@example.com" />
        <div className="invalid-feedback">
          Please enter a valid email address for shipping updates.
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="address">Address</label>
        <input type="text" className="form-control" id="address" placeholder="1234 Main St" required />
        <div className="invalid-feedback">
          Please enter your shipping address.
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="address2">Address 2 <span className="text-muted">(Optional)</span></label>
        <input type="text" className="form-control" id="address2" placeholder="Apartment or suite" />
      </div>

      <div className="row">
        <div className="col-md-5 mb-3">
          <label htmlFor="country">Country</label>
          <select className="custom-select d-block w-100" id="country" required>
            <option value="">Choose...</option>
            <option>United States</option>
          </select>
          <div className="invalid-feedback">
            Please select a valid country.
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <label htmlFor="state">State</label>
          <select className="custom-select d-block w-100" id="state" required>
            <option value="">Choose...</option>
            <option>California</option>
          </select>
          <div className="invalid-feedback">
            Please provide a valid state.
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <label htmlFor="zip">Zip</label>
          <input type="text" className="form-control" id="zip" placeholder="" required />
          <div className="invalid-feedback">
            Zip code required.
          </div>
        </div>
      </div>
      <hr className="mb-4" />
      <div className="custom-control custom-checkbox">
        <input type="checkbox" className="custom-control-input" id="same-address" />
        <label className="custom-control-label" htmlFor="same-address">Shipping address is the same as my billing address</label>
      </div>
      <div className="custom-control custom-checkbox">
        <input type="checkbox" className="custom-control-input" id="save-info" />
        <label className="custom-control-label" htmlFor="save-info">Save this information for next time</label>
      </div>
      <hr className="mb-4" />

      <h4 className="mb-3">Payment</h4>

      <div className="d-block my-3">
        <div className="custom-control custom-radio">
          <input id="credit" name="paymentMethod" type="radio" className="custom-control-input" checked required />
          <label className="custom-control-label" htmlFor="credit">Credit card</label>
        </div>
        <div className="custom-control custom-radio">
          <input id="debit" name="paymentMethod" type="radio" className="custom-control-input" required />
          <label className="custom-control-label" htmlFor="debit">Debit card</label>
        </div>
        <div className="custom-control custom-radio">
          <input id="paypal" name="paymentMethod" type="radio" className="custom-control-input" required />
          <label className="custom-control-label" htmlFor="paypal">PayPal</label>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="cc-name">Name on card</label>
          <input type="text" className="form-control" id="cc-name" placeholder="" required />
          <small className="text-muted">Full name as displayed on card</small>
          <div className="invalid-feedback">
            Name on card is required
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="cc-number">Credit card number</label>
          <input type="text" className="form-control" id="cc-number" placeholder="" required />
          <div className="invalid-feedback">
            Credit card number is required
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-3 mb-3">
          <label htmlFor="cc-expiration">Expiration</label>
          <input type="text" className="form-control" id="cc-expiration" placeholder="" required />
          <div className="invalid-feedback">
            Expiration date required
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <label htmlFor="cc-cvv">CVV</label>
          <input type="text" className="form-control" id="cc-cvv" placeholder="" required />
          <div className="invalid-feedback">
            Security code required
          </div>
        </div>
      </div>
      <hr className="mb-4" />
      <button className="btn btn-primary btn-lg btn-block" type="submit">Continue to checkout</button>
    </form>
  </div>
</div>

<footer className="my-5 pt-5 text-muted text-center text-small">
  <p className="mb-1">&copy; 2017-2019 Company Name</p>
  <ul className="list-inline">
    <li className="list-inline-item"><a href="#">Privacy</a></li>
    <li className="list-inline-item"><a href="#">Terms</a></li>
    <li className="list-inline-item"><a href="#">Support</a></li>
  </ul>
</footer>
</div> */}


{/* <div className="container" data-aos="fade-up">
<div className="section-header">
  <h2>Book A Table</h2>
  <p>Book <span>Your Stay</span> With Us</p>
</div>
<div className="row g-0">
  <div className="col-lg-4 reservation-img" style={{ backgroundImage: 'url(assets/img/reservation.jpg)' }} data-aos="zoom-out" data-aos-delay="200"></div>
  <div className="col-lg-8 d-flex align-items-center reservation-form-bg">
    <form action="forms/book-a-table.php" method="post" role="form" className="php-email-form" data-aos="fade-up" data-aos-delay="100">
      <div className="row gy-4">
        <div className="col-lg-4 col-md-6">
          <input type="text" name="name" className="form-control" id="name" placeholder="Your Name" data-rule="minlen:4" data-msg="Please enter at least 4 chars" />
          <div className="validate"></div>
        </div>
        <div className="col-lg-4 col-md-6">
          <input type="email" className="form-control" name="email" id="email" placeholder="Your Email" data-rule="email" data-msg="Please enter a valid email" />
          <div className="validate"></div>
        </div>
        <div className="col-lg-4 col-md-6">
          <input type="text" className="form-control" name="phone" id="phone" placeholder="Your Phone" data-rule="minlen:4" data-msg="Please enter at least 4 chars" />
          <div className="validate"></div>
        </div>
        
       
      </div>
      <div className="form-group mt-3">
        <textarea className="form-control" name="message" rows="5" placeholder="Message"></textarea>
        <div className="validate"></div>
      </div>
      <div className="mb-3">
        <div className="loading">Loading</div>
        <div className="error-message"></div>
        <div className="sent-message">Your booking request was sent. We will call back or send an Email to confirm your reservation. Thank you!</div>
      </div>
      <div className="text-center"><button type="submit">Book a Table</button></div>
    </form>
  </div>
</div>
</div> */}