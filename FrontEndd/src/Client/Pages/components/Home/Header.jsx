import React from 'react'
import { useEffect, useState } from 'react';
import '../css/stylenavbar.css'
import { Navbar, NavDropdown } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import 'react-dropdown/style.css';
import i18n from '../../../../Lang/i18n';
// import '../script/script.js'
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { logoutUser } from '../../../../Redux/AuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  
  useBreakpointValue, // Import useBreakpointValue

} from '@chakra-ui/react';
import MobileNavbar from './MobileNavbar'

const Header = () => {
  const { t, i18n } = useTranslation()
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  const userCookies = Cookies.get('currentClient');
  const isAuthenticated = !!Cookies.get('token') && !!Cookies.get('currentClient');
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [name, setName] = useState('');

  const [lastname, setLastname] = useState('');
  useEffect(() => {
    // Check if userCookies exists (assuming it's a cookie with JSON data)
    const userCookies = Cookies.get('currentClient');
    if (userCookies) {
      try {
        const parsedData = JSON.parse(userCookies);
        setName(parsedData.name);
        setLastname(parsedData.lastName);
      } catch (error) {
        console.error('Error parsing userCookies:', error);
      }
    }
  }, []);

  // Use parsedData if available; otherwise, use newData from location.state

  const [open, setOpen] = useState(false);
  const dropdownItemStyle = {
    height: '50px',
    width: '200px', // Adjust the height and width as needed
    display: 'flex',
    alignItems: 'center',
    // Center the text horizontally
    color: 'black',
    paddingRight: '20px', // Add right padding as needed
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Use smooth scrolling effect
    });
  };



  const handleLogout = () => {
    try {
      dispatch(logoutUser()).unwrap().then(() => {
        // Remove the 'currentUser' cookie


        // Redirect to the login page
        navigate('/login2', { replace: true });
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    } catch (e) {
      console.log(e)
    }
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Use useBreakpointValue to determine when to show the mobile navbar
  const showMobileNavbar = useBreakpointValue({ base: true, md: false });
  return (
    <>
      <div id="topbar" className="d-flex align-items-center">
      <div className="container d-flex justify-content-center justify-content-md-between">
        <div className="contact-info d-none d-md-flex align-items-center">
          <i className="bi bi-envelope d-flex align-items-center">
            <a href="mailto:contact@example.com">contact@example.com</a>
          </i>
          <i className="bi bi-phone d-flex align-items-center ms-4">
            <span>+155895548855</span>
          </i>
        </div>
        <div className="social-links  d-flex align-items-center">
        <div className='flex flex-row gap-3'>
              <div onClick={()=>changeLanguage('fr')} className='cursor-pointer'><img src='https://fsr.ma/assets/images/fr.png' width='30px' className='mt-1 hover:opacity-70' /></div>
              <div onClick={()=>changeLanguage('en')} className='cursor-pointer'><img src='https://fsr.ma/assets/images/en.png' width='30px'  className='mt-1 hover:opacity-70' /></div>
              {/* <div onClick={()=>changeLanguage('es')} className='cursor-pointer'><img src='https://fsr.ma/assets/images/es.png' width='30px' className='hover:opacity-70'/></div> */}
          </div>
          {isAuthenticated ? (
        <NavDropdown title={`${name} ${lastname}`}  id="basic-nav-dropdown" style={{ height: 'blue', color: 'white' }}>
          <NavDropdown.Item href="/profile" style={dropdownItemStyle}>Mon profil</NavDropdown.Item>
          <NavDropdown.Item href="/reservations" style={dropdownItemStyle}>Mes Reservations</NavDropdown.Item>
          <NavDropdown.Item onClick={handleLogout} style={dropdownItemStyle} >
            Logout
          </NavDropdown.Item>
        </NavDropdown>
      ) : (
       <>
          <div className="cta-button">
            <Link to="/login2" className="scrollto-button" onClick={scrollToTop}>
              Login
            </Link>
          </div>
          <div className="cta-button">
            <Link to="/signup" className="scrollto-button" onClick={scrollToTop}>
              Sign Up
            </Link>
          </div>
          </>
      )}
        </div>
      </div>
    </div>



  {/* <ChakraProvider>
      <Modal size="xl" onClose={onClose} isOpen={isOpen} isCentered >
        <ModalOverlay />
     
        <ModalContent paddingY={5} scrollPaddingTop={3}>
        <ModalBody>
        <div class="mx-4 card bg-white max-w-3xl p-10 md:rounded-lg my-8 mx-auto">
        <SigngupForm />
        </div>
        </ModalBody>
        </ModalContent>
      </Modal>
      </ChakraProvider> */}
     <header className="d-flex align-items-center">
      <div className="container d-flex align-items-center justify-content-between">
      <h1 className="logo"><a href="/">WayCab</a></h1>
        {showMobileNavbar && (
          <MobileNavbar isDropdownOpen={isDropdownOpen} toggleDropdown={toggleDropdown} />
        )}
        
    <nav id="navbar" className="navbar">
       
      
    <ul>
              <li><a className={location.pathname === '/' ? 'nav-link scrollto active' : 'nav-link scrollto'} href="/">{t('home')}</a></li>
              <li><a className={location.pathname === '#form' ? 'nav-link scrollto active' : 'nav-link scrollto'} href="/">{t('Commander')}</a></li>
              <li><a className={location.pathname === '/offresxservices' ? 'nav-link scrollto active' : 'nav-link scrollto'} href="/offresxservices">{t('OffresEtService')}</a></li>
              
            <li><a className={location.pathname === '/longTravel' ? 'nav-link scrollto active' : 'nav-link scrollto'} href="/longTravel">{t('TrajetInternational')}</a></li>
            <li><a className={location.pathname === '/driverform' ? 'nav-link scrollto active' : 'nav-link scrollto'} href="/driverform">{t('DevenirChauffer')}
              </a></li>
            
              <li><a className={location.pathname === '/blog' ? 'nav-link scrollto active' : 'nav-link scrollto'} href="/blog"> {t('Actualité')}
              </a></li>


              <li><a className="nav-link scrollto" href="/contact">{t('Contact')}</a></li>
            </ul>
       
       
        </nav>
      </div>
    </header>
    </>

  )
}

export default Header