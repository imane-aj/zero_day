import React, { useState, useEffect } from 'react';
import { Fragment } from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cars, ShowCar } from '../../Redux/VehiculesSlice';
import Breadcrumb from './../Layouts/Breadcrumb';

const Edit_Vehicule = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const responseData = useSelector((state) => state.vehicule.car.data);

  // Initialize title with an empty string
  const [title, setTitle] = useState('');

  useEffect(() => {
    // Dispatch the action to fetch car data when the component mounts or when id changes
    dispatch(ShowCar(id));
  }, [dispatch, id]);

  useEffect(() => {
    // Update the title when responseData changes
    if (responseData && responseData.title) {
      setTitle(responseData.title);
    }
  }, [responseData]);

  console.log(title);
    // const [type, setType] = useState(responseData.type)
    // const [options, setOptions] = useState(responseData.options)
    // const [optionsArray, setOptionsArray] = useState([]); // State to store the JSON array

    // const [coefPrice, setCoefPrice] = useState(responseData.coefPrice)
    // const [taxe, setTaxe] = useState(responseData.taxe)



    //   const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData((prevData) => ({
    //       ...prevData,
    //       [name]: value,
    //     }));
    //   };
    
    //   const handleSubmit = (e) => {
    //     e.preventDefault();
        
    //     dispatch(updateCar(id, formData)).then((response) => {
    
    //     });
    //   };


  return (
    <>
                         <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black dark:text-white">                             Type<span className="text-meta-1">*</span>
                         </label>
                      <input value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            type="text"
                            placeholder="Entrer le type"
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                       />
                         {/* {error && error.errors && error.errors.title && <span className='text-danger mb-10'>{error && error?.errors?.title[0]}</span>} */}
                    </div>
    </>
//     <Fragment>
//     <Breadcrumb pageName={id ? 'Edit CAR' : 'Nouvelle Vehicule'} />
//     <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
//         <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
//             <h3 className="font-medium text-black dark:text-white">
//                  Vehicule
//             </h3>
//         </div>
//         <form enctype='multipart/form-data'>
//             <div className="p-6.5">

//                 <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
//                     <div className="w-full xl:w-1/2">
//                         <label className="mb-2.5 block text-black dark:text-white">
//                             Type<span className="text-meta-1">*</span>
//                         </label>
//                         <input value={type}
//                             onChange={(e) => setType(e.target.value)}
//                             type="text"
//                             placeholder="Entrer le type"
//                             className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
//                         />
//                         {/* {error && error.errors && error.errors.title && <span className='text-danger mb-10'>{error && error?.errors?.title[0]}</span>} */}
//                     </div>

//                     <div className="w-full xl:w-1/2">
//                         <label className="mb-3 block text-black dark:text-white">Pièce jointe</label>
//                         <input name='img'
//                             onChange={(e) => setImg(e.target.files[0])} type="file" className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary" />
//                         {error && error.errors && error.errors.img && <span className='text-danger mb-10'>{error && error?.errors?.img[0]}</span>}
//                     </div>

//                 </div>
//                 {id && <img src={imgUrl + `images/blog/${img}`} width='200px' className='my-3' />}
           

//                 <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
//                     <div className="w-full xl:w-1/2">
//                         <label className="mb-2.5 block text-black dark:text-white">
//                             Le titre<span className="text-meta-1">*</span>
//                         </label>
//                         <input value={title}
//                             onChange={(e) => setTitle(e.target.value)}
//                             type="text"
//                             placeholder="Entrer le titre"
//                             className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
//                         />
//                         {error && error.errors && error.errors.title && <span className='text-danger mb-10'>{error && error?.errors?.title[0]}</span>}
//                     </div>

//                     <div className="w-full xl:w-1/2">
//                         <label className="mb-2.5 block text-black dark:text-white">
//                         Les options<span className="text-meta-1">*</span>
//                         </label>
//                         <input value={options}
//                             onChange={(e) => setOptions(e.target.value)}
//                             type="text"
//                             placeholder="Entrer les options (séparées par des virgules)"
//                             className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
//                         />
//                         {error && error.errors && error.errors.title && <span className='text-danger mb-10'>{error && error?.errors?.title[0]}</span>}
//                     </div>

//                 </div>

//                 <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
//                     <div className="w-full xl:w-1/2">
//                         <label className="mb-2.5 block text-black dark:text-white">
//                             Le  coefficient de Prix<span className="text-meta-1">*</span>
//                         </label>
//                         <input value={coefPrice}
//                             onChange={(e) => setCoefPrice(e.target.value)}
//                             type="text"
//                             placeholder="Entrer le coefficient de Prix"
//                             className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
//                         />
//                         {error && error.errors && error.errors.title && <span className='text-danger mb-10'>{error && error?.errors?.title[0]}</span>}
//                     </div>

//                     <div className="w-full xl:w-1/2">
//                         <label className="mb-2.5 block text-black dark:text-white">
//                             Le  taxe<span className="text-meta-1">*</span>
//                         </label>
//                         <input value={taxe}
//                             onChange={(e) => setTaxe(e.target.value)}
//                             type="text"
//                             placeholder="Entrer Taxe"
//                             className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
//                         />
//                         {error && error.errors && error.errors.title && <span className='text-danger mb-10'>{error && error?.errors?.title[0]}</span>}
//                     </div>

//                 </div>
//                 <button onClick={handleSave} className="mt-3 inline-block rounded bg-blite px-6 pb-2 pt-2.5 text-blue hover:text-white font-medium hover:bg-blue transition-all duration-200">
//                     <span><i class="fa-regular fa-bookmark" style={{ background: 'transparent' }}></i> Save</span>
//                 </button>
//                 {/* <button onClick={checkOption} className="mt-3 inline-block rounded bg-blite px-6 pb-2 pt-2.5 text-blue hover:text-white font-medium hover:bg-blue transition-all duration-200">
//                     <span><i class="fa-regular fa-bookmark" style={{ background: 'transparent' }}></i> Save</span>
//                 </button> */}
//             </div>
//         </form>
//     </div>
// </Fragment>
  )
}

export default Edit_Vehicule