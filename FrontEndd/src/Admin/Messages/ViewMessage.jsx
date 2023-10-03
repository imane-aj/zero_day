import React from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Display } from '../../Redux/MessageSlice';
import Breadcrumb from '../Layouts/Breadcrumb';

export default function ViewMessage() {
    const {id} = useParams();
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(Display(id));
    }, [id])
    const data = useSelector((state)=>state.message.show);
    console.log(data);
  return (
    <>
    hello
        {/* <Breadcrumb pageName = 'Message'/> */}
        {/* <div className='bg-white p-10 flex flex-row gap-5 leading-10'>
            <div>
                <p>Nom et Prenom:</p>
                <p>Email:</p>
                <p>Phone: </p>
                <p>Message: </p>
            </div>
            <div>
                <p>{data?.data?.fullName}</p>
                <p>{data?.data?.email}</p>
                <p>{data?.data?.phone}</p>
                <p>{data?.data?.message}</p>
            </div>
        </div> */}
    </>
  )
}
