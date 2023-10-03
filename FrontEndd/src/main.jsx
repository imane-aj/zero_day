import React from 'react'
import {RouterProvider, createBrowserRouter } from "react-router-dom";
import Admin from './Admin/admin';
import { createRoot } from 'react-dom/client';
import store from './Redux/Store';
import { Provider } from 'react-redux';
import Blog from './Admin/Blog/Blog';
import NewPost from './Admin/Blog/NewPost';
import ViewPost from './Admin/Blog/ViewPost';
import Service from './Admin/Requests/Service/Service';
import ShowS from './Admin/Requests/Service/ShowS';
import LongTrips from './Admin/Requests/LongTrip/LongTrips';
import ShowT from './Admin/Requests/LongTrip/ShowT';
import ListImmédiate from './Admin/Resavation/ListImmédiate';
import ListLater from './Admin/Resavation/ListLater';
import Services from './Admin/Services/Services';
import NewService from './Admin/Services/NewService';
import Index from './Admin/LongTrip/Index';
import Archive from './Admin/Resavation/Archive';
import NewLongTrip from './Admin/LongTrip/NewLongTrip';
import ProtectedRoute from './Auth/ProtectedRoutes';
import Login from './Auth/Login';
import Chat from './Admin/Chat/Chat';
import HomePage from './Client/Pages/HomePage';
import { ChakraProvider } from '@chakra-ui/react';
import { FormContextProvider } from './Client/Context/FromContext';
import LongTravel from './Client/Pages/LongTravel';
import FormControls from './Client/Pages/components/Home/FormControls';
import OffrexServices from './Client/OffresXservices/OffrexServices';
import FormConfirmation from './Client/Pages/FormConfirmation';
import BlogDetails from './Client/Blog/BlogDetails';
import Contact from './Client/Pages/Contact';
import Transfer from './Admin/Transfer/Transfer';
import NewTransfer from './Admin/Transfer/NewTransfer';
import Blog2 from './Client/Blog/Blog'
import LongVoyageForm from './Client/Pages/LongVoyageForm'
import SignUp from './Client/Pages/SignUp';
import Login2 from './Client/Pages/Login2';
import ServiceForm from './Client/Pages/Forms/ServiceForm'
import Checkout from './Client/Pages/Checkout';
import Clients from './Admin/Clients/Clients';
import Messages from './Admin/Messages/Messages';
import ViewMessage from './Admin/Messages/ViewMessage';
import Statistics from './Admin/Dashboard/Statistics';
import Vehicule from './Admin/Vehicules/Vehicule';
import NewCar from './Admin/Vehicules/NewCar';
import Edit_Vehicule from './Admin/Vehicules/Edit_Vehicule';
import ViewReservation from './Admin/Resavation/ViewReservation';
import TranserResv from './Admin/Resavation/TranserResv';
import ShowMessage from './Admin/Messages/ShowMessage';
import SubAdmin from './Admin/CreatSubAdmin/SubAdmin';
import Driver from './Admin/Driver/Driver/Driver';
import DriverList from './Admin/Driver/Driver/DriverList';
import DriversDemande from './Admin/Driver/Driver/DriversDemande';
import List from './Admin/CreatSubAdmin/List';
import ClientCompte from './Admin/CreatSubAdmin/ClientCompte';
import DriverRejected from './Admin/Driver/Driver/DriverRejected';
import DriverForm from './Client/Pages/DriverForm'

import ProtectedUser from './Auth/ProtectedUser';

import Profile from './Client/Pages/Profile';
import Reservations from './Client/Pages/Reservations';

const ProfileWithChakra = () => (
  <ChakraProvider>
    <Profile />
  </ChakraProvider>
);
const ReservationsWithChakra = () => (
  <ChakraProvider>
    <Reservations />
  </ChakraProvider>
);

const router = createBrowserRouter([
    {
      path: "/admin/*",element: <ProtectedRoute element={Admin} roles={['admin']} />,
      children: [
        // {,element:<Index />},
        {index:true ,element:<Statistics />},
        {path:'immediate' ,element:<ListImmédiate />},
        {path:'immediate/view_reservation/:id' ,element:<ViewReservation />},
        {path:'plus_tard' ,element:<ListLater />},
        {path:'plus_tard/view_reservation/:id' ,element:<ViewReservation />},
        {path:'archive' ,element:<Archive />},
        {path:'archive/view_reservation/:id' ,element:<ViewReservation />},
        {path:'transferResev' ,element:<TranserResv />},
        {path:'transferResev/view_reservation/:id' ,element:<ViewReservation />},
        {path:"blog" ,element:<Blog />},
        {path:"blog/nouvelle_article" ,element:<NewPost />},
        {path:"blog/edit_article/:id" ,element:<NewPost />},
        {path:"blog/view_post/:id" ,element:<ViewPost />},
        {path:"demande_service" ,element:<Service />},
        {path:"demande_service/view_service_request/:id" ,element:<ShowS />},
        {path:"demande_voyage_long" ,element:<LongTrips />},
        {path:"demande_voyage_long/view_lonTrip_request/:id" ,element:<ShowT />},
        {path:"services" ,element:<Services />},
        {path:"services/nouvelle_service" ,element:<NewService />},
        {path:"services/edit_service/:id" ,element:<NewService />},
        {path:"voyage_long_duree" ,element:<Index />},
        {path:"voyage_long_duree/nouvelle_voyage_long_duree" ,element:<NewLongTrip />},
        {path:"voyage_long_duree/edit_voyage_long_duree/:id" ,element:<NewLongTrip />},
        {path:"chat" ,element:<Messages />},
        {path:"chat/view_message/:id" ,element:<ShowMessage />},
        {path:"transfers" ,element:<Transfer />},
        {path:"transfers/nouvelle_transfer" ,element:<NewTransfer />},
        {path:"transfers/edit_transfer/:id" ,element:<NewTransfer />},
        {path:"visiteurs" ,element:<Clients />},
        {path:"vehicule" ,element:<Vehicule />},
        {path:"vehicule/nouvelle_vehicule" ,element:<NewCar />},
        {path:"vehicule/edit_vehicule/:id" ,element:<NewCar />},
        {path:"utilisateur" ,element:<List />},
        {path:"affecter_permissions" ,element:<SubAdmin />},
        {path:"edit_permissions/:id" ,element:<SubAdmin />},
        {path:"clients" ,element:<ClientCompte />},
        {path:"driver_demandes" ,element:<DriversDemande />},
        {path:"listDriver" ,element:<DriverList />},
        {path:"drivers_refuse" ,element:<DriverRejected />},
      ],     
    },
    {
        path: "/login",element: <Login />,
      // ],
    },
      {path: "/", element: (
        <ChakraProvider>
        <FormContextProvider>
          <HomePage />
        </FormContextProvider>
      </ChakraProvider>
      )},
    { path: "/blog", element: (
      <ChakraProvider>
    <Blog2 />
    </ChakraProvider>
    ) },
    { path: "/driverform", element: (
      <ChakraProvider>
    <DriverForm />
    </ChakraProvider>
    ) },
  {
    path: "/offresxservices", element: (
      <ChakraProvider>
      <FormContextProvider>
        <OffrexServices />
      </FormContextProvider>
      </ChakraProvider>
    )
  },
  {
    path: "/longTravel", element: (
      <ChakraProvider>
      <FormContextProvider>
        <LongTravel />
      </FormContextProvider>
      </ChakraProvider>
    )
  },
  {
    path: "/formconfirmation", element: (
      <ChakraProvider>
      <FormContextProvider>
        <FormConfirmation />
      </FormContextProvider>
      </ChakraProvider>
    )
  },
  {
    path: "/form", element: (
      <ChakraProvider>
      <FormContextProvider>
        <FormControls  />
      </FormContextProvider>
      </ChakraProvider>
    )
  },
  { path: "/blog-details/:id", element: (
    <ChakraProvider>
  <BlogDetails />
  </ChakraProvider>
  ) },
  { path: "/contact", element: (
      <ChakraProvider>
  <Contact /> </ChakraProvider>
  ) },
  { path: "/signup", element: (
    <ChakraProvider>
<SignUp /> </ChakraProvider>
) },
// {
//   path: '/profile',
//   element: <ProtectedUser element={Profile}  roles={['client']}/>,
// },


// { path: "/test", element: (
//   <ChakraProvider>
// <Profile /> </ChakraProvider>
// ) },

{
  path: '/profile',
  element: <ProtectedUser element={ProfileWithChakra} roles={['user']} />,
},
{
  path: '/reservations',
  element: <ProtectedUser element={ReservationsWithChakra} roles={['user']} />,
},
{ path: "/login2", element: (
  <ChakraProvider>
<Login2 /> </ChakraProvider>
) },
  {
    path: "/LongVoyageForm/:id", element: (
      <ChakraProvider>

<LongVoyageForm />
      </ChakraProvider>
        
  
    )

  },
  {
    path: "/ServiceForm/:id", element: (
      <ChakraProvider>

<ServiceForm />
      </ChakraProvider>
        
  
    )

  },
  {
    path: "/checkout", element: (
      <ChakraProvider>

<Checkout />
      </ChakraProvider>
        
  
    )

  }
    // {
    //   path: "/auth/*",element: <Auth />,
    //   children: [
    //     {index:true,element:<Register />},
    //     {path: "register",element: <Register />},
    //     {path: "login",element: <Login />},
    //   ],
    // },
  ]);

if (document.getElementById("root")) {
    createRoot(document.getElementById("root")).render(
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    );
}

