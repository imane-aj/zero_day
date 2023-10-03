import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ShowReservation } from '../../Redux/ReservationSlice';
import { useEffect } from 'react';
import Breadcrumb from '../Layouts/Breadcrumb';

export default function ViewReservation() {
    const {id} = useParams();
    const data = useSelector((state)=>state.reserv.reservation)
    const dipatch = useDispatch()
    useEffect(()=>{
        dipatch(ShowReservation(id))
    },[])
  return (
    <>
        <Breadcrumb pageName = 'Reservation'/>
        <div className='bg-white p-10 flex lg:flex-row lg:gap-80 leading-10 '>
            <div >
                <h3 className='text-xl text-black mb-4'>Reservation info</h3>
                <div className='flex flex-row gap-5 leading-10'>
                    <div>
                        <p>Date:</p>
                        <p>Statut:</p>
                        <p>Départ: </p>
                        <p>Arrivée:</p>
                        <p>Type Vehicule: </p>
                        <p>N d'heures: </p>
                        <p>Type: </p>
                        <p>Prix: </p>
                        <p>Distance: </p>
                    </div>
                    <div>
                        <p>{data?.data?.heure ? data?.data?.date +' h' : '-'}</p>
                        <p>{data?.data?.status}</p>
                        <p>{data?.data?.startPoint}</p>
                        <p>{data?.data?.endPoint}</p>
                        <p>{data?.data?.vehicule['type']}</p>
                        <p>{data?.data?.heure ? data?.data?.heure +' h' : '-'}</p>
                        <p>{data?.data?.tripType == 0 ? 'sans arrêt' : 'avec arrêt'}</p>
                        <p>{data?.data?.price + '€'}</p>
                        <p>{data?.data?.distance + 'km'}</p>
                    </div>
                </div>
            </div>
            <div >
                <h3 className='text-xl text-black mb-4'>Client info</h3>
                <div className='flex flex-row gap-5 leading-10'>
                    <div>
                        <p>Nom et Prenom:</p>
                        <p>email:</p>
                        <p>Telephone: </p>
                    </div>
                    <div>
                        {data?.data?.client? 
                            <>
                                <p>{data?.data?.client['fullName'] }</p>
                                <p>{data?.data?.client['email']}</p>
                                <p>{data?.data?.client['phone']}</p>
                            </> : 
                            <>
                                <p>-</p>
                                <p>-</p>
                                <p>-</p>
                            </>
                        }
                       
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
