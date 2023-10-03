import React, { Fragment, useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the CSS for default styling
import Swal from 'sweetalert2'
import Breadcrumb from '../Layouts/Breadcrumb';
import { ShowTrip, storeTrip, updateTrip } from '../../Redux/LongTripSlice';

export default function NewLongTrip() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { id } = useParams()
    const [desc, setDesc] = useState('')
    const [img, setImg] = useState(null)
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState(0)
    const [options, setOptions] = useState('')
    // const [optionsArray, setOptionsArray] = useState([]); // State to store the JSON array
    const [longTrip, setLongTrip] = useState('');
    const error = useSelector((state)=>state.trip.error)
    const trip = useSelector((state)=>state.trip.trip)
   
    const handleQuillChange = (value) => {
        setDesc(value);
    };
      useEffect(() => {
        if (id) {
          dispatch(ShowTrip(id)); // Dispatch the action to fetch job data
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (id) {
        //   dispatch(ShowTrip(id)); // Dispatch the action to fetch job data
          if (trip) {
            console.log('post',trip);
            setDesc(trip?.data?.desc);
            setTitle(trip?.data?.title);
            setImg(trip?.data?.cover_url);
            setOptions(trip?.data?.options);
            setPrice(trip?.data?.price);
            setLongTrip(trip?.data?.trip);
            }
        }
    }, [dispatch, id, trip]);

    // useEffect(() => {
    //     const optionsList = options?.split(',').map((option) => option.trim());

    //     // Convert the optionsList into an object
    //     const optionsObject = {};
    //     optionsList?.forEach((option, index) => {
    //         optionsObject[`option${index + 1}`] = option;
    //     });

    //     // Convert the object into a JSON string
    //     const optionsJSON = JSON.stringify(optionsObject);

    //     // Set the JSON string in your state
    //     setOptionsArray(optionsJSON);

    //     // Now, optionsArray contains a valid JSON string
    // }, [options]);

    const handleSave = (e)=>{
        e.preventDefault()
        var formData = new FormData();
        formData.append('title', title);
        formData.append('desc', desc);
        formData.append('img', img);
        formData.append('options', options);
        formData.append('price', price);
        formData.append('trip', longTrip);

        if (img) {
            formData.append('img', img);
        }
        if(id){
            dispatch(updateTrip({id,formData})).then((res) => {
                if (res.type === 'trip/updateTrip/fulfilled') {
                  navigate('/admin/voyage_long_duree')
                  Swal.fire('Success', 'This service was updated succefuly', 'success');
                }
              });
            }else{
                dispatch(storeTrip(formData)).then((res) => {
                    console.log(res)
                    if (res.type === 'trip/storeTrip/fulfilled') {
                      navigate('/admin/voyage_long_duree')
                      Swal.fire('Success', 'This service was added succefuly', 'success');
                    }
                });
        };
    }
  return (
    <Fragment>
    <Breadcrumb pageName={id ? 'Edit post' : 'Add new post'}/>
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
                Job Form
            </h3>
        </div>
        <form enctype='multipart/form-data'>
            <div className="p-6.5">

            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                    Le titre<span className="text-meta-1">*</span>
                </label>
                <input value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    placeholder="Entrer le titre"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
                 {error && error.errors && error.errors.title && <span className='text-danger mb-10'>{error && error?.errors?.title[0]}</span>}
                </div>

                <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-black dark:text-white">Pièce jointe</label>
                    <input name='img'
                    onChange={(e)=>setImg(e.target.files[0])}  type="file" className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary" />
                    {error && error.errors && error.errors.img && <span className='text-danger mb-10'>{error && error?.errors?.img[0]}</span>}
                </div>
                </div>
                {id && <img src={img} width='200px' className='my-3'/>}
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                        Le trajet<span className="text-meta-1">*</span>
                    </label>
                    <input value={longTrip}
                        onChange={(e) => setLongTrip(e.target.value)}
                        type="text"
                        placeholder="Entrer le trajet"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                    {error && error.errors && error.errors.trajet && <span className='text-danger mb-10'>{error && error?.errors?.trajet[0]}</span>}
                </div>
                <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                        Le prix<span className="text-meta-1">*</span>
                    </label>
                    <input value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        type="text"
                        placeholder="Entrer le prix"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                    {error && error.errors && error.errors.price && <span className='text-danger mb-10'>{error && error?.errors?.price[0]}</span>}
                </div>
            </div>
            <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                    Les options<span className="text-meta-1">*</span>
                </label>
                <input value={options}
                    onChange={(e) => setOptions(e.target.value)}
                    type="text"
                    placeholder="Entrer les options (séparées par des virgules)"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
                {error && error.errors && error.errors.title && <span className='text-danger mb-10'>{error && error?.errors?.title[0]}</span>}
            </div>
            <div>
                <label className="mb-2.5 block text-black dark:text-white">
                    Description <span className="text-meta-1">*</span>
                </label>
                <ReactQuill value={desc} onChange={handleQuillChange} style={{height: '150px', marginBottom:'4em'}} />
                {error && error.errors && error.errors.desc && <span className='text-danger mb-10'>{error && error?.errors?.desc[0]}</span>}
            </div>
            <button onClick={handleSave} className="mt-3 inline-block rounded bg-blite px-6 pb-2 pt-2.5 text-blue hover:text-white font-medium hover:bg-blue transition-all duration-200">
                <span><i class="fa-regular fa-bookmark"></i> Save</span>
            </button>
            </div>
        </form>
    </div>
</Fragment>
  )
}
