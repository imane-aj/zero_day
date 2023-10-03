import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ShowReservation } from '../../Redux/ReservationSlice';
import { useEffect } from 'react';
import Breadcrumb from '../Layouts/Breadcrumb';
import { Display } from '../../Redux/MessageSlice';

export default function ShowMessage() {
    const {id} = useParams();
    const data = useSelector((state)=>state.message.show)
    const dipatch = useDispatch()
    useEffect(()=>{
        dipatch(Display(id))
    },[])
  return (
    <>
        <Breadcrumb pageName = 'Reservation'/>
        <div className='bg-white p-10 flex lg:flex-row lg:gap-80 leading-10 '>
            <div >
                <h3 className='text-xl text-black mb-4'>Reservation info</h3>
                <div className='flex flex-row gap-5 leading-10'>
                    <div>
                        <p>Non et Prenom:</p>
                        <p>Email:</p>
                        <p>Sujet: </p>
                        <p>Message:</p>
                    </div>
                    <div>
                        <p>{data?.data?.fullName}</p>
                        <p>{data?.data?.email}</p>
                        <p>{data?.data?.subject}</p>
                        <p>{data?.data?.msg}</p>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
