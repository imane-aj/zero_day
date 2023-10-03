import React, { Fragment, useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the CSS for default styling
import Swal from 'sweetalert2'
import Breadcrumb from './../Layouts/Breadcrumb';
import { storeCar, ShowCar, updateCar } from '../../Redux/VehiculesSlice';
import { imgUrl } from '../../Redux/Utils';
import { useToast } from "@chakra-ui/react";
const NewCar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { id } = useParams()
    const toast = useToast();
    const [img, setImg] = useState(null)
    const [title, setTitle] = useState('')
    const [type, setType] = useState('')
    const [options, setOptions] = useState('')
    // const [optionsArray, setOptionsArray] = useState([]); // State to store the JSON array
    const [coefPrice, setCoefPrice] = useState('')
    const [taxe, setTaxe] = useState('')
    const error = useSelector((state) => state.vehicule.error)
    console.log(error)
    const editData = useSelector((state) => state.vehicule.car.data);
    useEffect(() => {
        // Dispatch the action to fetch car data when the component mounts or when id changes
        dispatch(ShowCar(id));
    }, [dispatch, id]);

    useEffect(() => {
        // Update the title when responseData changes and contains a title
        if (editData) {
            setTitle(editData?.title);
            setType(editData?.type);
            setOptions(editData?.options);
            setImg(editData?.img);
            setTaxe(editData?.taxe);
            setCoefPrice(editData?.coefPrice);
        }
    }, [editData]);

    // useEffect(() => {
    //     const optionsList = options.split(',').map((option) => option.trim());

    //     // Convert the optionsList into an object
    //     const optionsObject = {};
    //     optionsList.forEach((option, index) => {
    //         optionsObject[`option${index + 1}`] = option;
    //     });

    //     // Convert the object into a JSON string
    //     const optionsJSON = JSON.stringify(optionsObject);

    //     // Set the JSON string in your state
    //     setOptionsArray(optionsJSON);

    //     // Now, optionsArray contains a valid JSON string
    // }, [options]);
    const taxeAsInt = parseInt(taxe);


    const handleSave = (e) => {
        if (!taxe || !title || !coefPrice || !type || !img) {
            toast({
                title: "Please Fill all the Feilds",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
        }

        if (isNaN(coefPrice)) {
            // Display a toast notification if taxe is not a number
            toast({
                title: 'le coefficient de Prix should be a number',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            });
        }
        if (isNaN(taxe)) {
            // Display a toast notification if taxe is not a number
            toast({
                title: 'Taxe should be a number',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            });
        }

        e.preventDefault()

        const optionsList = options.split(',').map((option) => option.trim());

        // Convert the optionsList into an object


        var formData = new FormData();
        if (id) {
            formData.append('title', title);
            formData.append('type', type);
            formData.append('img', img);
            formData.append('taxe', taxe);
            formData.append('options', options);
            formData.append('coefPrice', coefPrice);

        } else {
            formData.append('title', title);
            formData.append('type', type);
            formData.append('img', img);
            formData.append('taxe', taxe);
            formData.append('options', options);
            formData.append('coefPrice', coefPrice);
        }


        if (id) {
            dispatch(updateCar({ id, formData })).then((res) => {
                if (res.type === 'vehicule/updateCar/fulfilled') {
                    navigate('/admin/vehicule')
                    Swal.fire('Success', 'This post was updated succefuly', 'success');
                }
            });
        }
        else {
            dispatch(storeCar(formData)).then((res) => {
                if (res.type === 'vehicule/storeCar/fulfilled') {
                    navigate('/admin/vehicule')
                    Swal.fire('Success', 'This car was added succefuly', 'success');
                }
            });
        }



    }
    return (
        <Fragment>
            <Breadcrumb pageName={id ? 'Edit CAR' : 'Nouvelle Vehicule'} />
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                        Vehicule
                    </h3>
                </div>
                <form enctype='multipart/form-data'>
                    <div className="p-6.5">

                        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                            <div className="w-full xl:w-1/2">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Type<span className="text-meta-1">*</span>
                                </label>
                                <input value={type}
                                    onChange={(e) => setType(e.target.value)}
                                    type="text"
                                    placeholder="Entrer le type"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                                {error && error.errors && error.errors.title && <span className='text-danger mb-10'>{error && error?.errors?.title[0]}</span>}
                            </div>

                            <div className="w-full xl:w-1/2">
                                <label className="mb-3 block text-black dark:text-white">Pièce jointe</label>
                                <input name='img'
                                    onChange={(e) => setImg(e.target.files[0])} type="file" className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary" />
                                {error && error.errors && error.errors.img && <span className='text-danger mb-10'>{error && error?.errors?.img[0]}</span>}
                            </div>

                        </div>
                        {id && <img src={imgUrl + `images/vehicule/${img}`} width='200px' className='my-3' />}


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

                        </div>

                        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                            <div className="w-full xl:w-1/2">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Le  coefficient de Prix<span className="text-meta-1">*</span>
                                </label>
                                <input value={coefPrice}
                                    onChange={(e) => setCoefPrice(e.target.value)}
                                    type="text"
                                    placeholder="Entrer le coefficient de Prix"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                                {error && error.errors && error.errors.title && <span className='text-danger mb-10'>{error && error?.errors?.title[0]}</span>}
                            </div>

                            <div className="w-full xl:w-1/2">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Le  taxe<span className="text-meta-1">*</span>
                                </label>
                                <input value={taxe}
                                    onChange={(e) => setTaxe(e.target.value)}
                                    type="text"
                                    placeholder="Entrer Taxe"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                                {error && error.errors && error.errors.title && <span className='text-danger mb-10'>{error && error?.errors?.title[0]}</span>}
                            </div>

                        </div>
                        <button onClick={handleSave} className="mt-3 inline-block rounded bg-blite px-6 pb-2 pt-2.5 text-blue hover:text-white font-medium hover:bg-blue transition-all duration-200">
                            <span><i class="fa-regular fa-bookmark" style={{ background: 'transparent' }}></i> Save</span>
                        </button>
                       
                    </div>
                </form>
            </div>
        </Fragment>)
}

export default NewCar