import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { DisplayTrip } from '../../../Redux/RequestSlice';
import Breadcrumb from '../../Layouts/Breadcrumb';

export default function ShowT() {
    const {id} = useParams();
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(DisplayTrip(id));
    }, [id])
    const data = useSelector((state)=>state.req.showTrip);
    console.log(data);
  return (
    <>
        <Breadcrumb pageName = 'demande de service'/>
        <div className='bg-white p-10 flex flex-row gap-5 leading-10'>
            <div>
                <p>Name:</p>
                <p>Email:</p>
                <p>Phone: </p>
                <p>status:</p>
                <p>Service: </p>
                <p>Message: </p>
            </div>
            <div>
                <p>{data?.data?.name}</p>
                <p>{data?.data?.email}</p>
                <p>{data?.data?.phone}</p>
                <p className={`${data?.data?.status == 'Encore' ? 'text-danger' : 'text-success'}`}>{data?.data?.status}</p>
                <p>{data?.data?.long_trip?.title}</p>
                <p>{data?.data?.message}</p>
            </div>
        </div>
    </>
  )
}
