import React, { Fragment } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ShowPost } from '../../redux/BlogSlice';
import { imgUrl } from '../../redux/Utils';
import Breadcrumb from '../Layouts/Breadcrumb';

export default function ViewPost() {
    const { id } = useParams();
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(ShowPost(id))
    },[dispatch])

    const data = useSelector((state)=> state.blog.article)
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };
  return (
    <Fragment>
        <Breadcrumb pageName='Article details'/>
        <div className='rounded-sm border p-6 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
            <div className='lg:w-[60%]'>
                <img src={imgUrl + `images/blog/${data?.data?.img}`} alt="oplo.jpg" className='w-full m-auto text-center'/>
            </div>
            <div className=''>
                <h3 className="font-bold text-lg mt-2 text-black">{data?.data?.title}</h3>
              <p className='pt-4 text-blue'>{data?.data?.created_at ? formatDate(data.data.created_at) : ''}</p>
              <div className=' text-black mt-3' dangerouslySetInnerHTML={{ __html: data?.data?.article }} />
            </div>
        </div>
    </Fragment>
  )
}
