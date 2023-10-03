import React, { Fragment, useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the CSS for default styling
import Swal from 'sweetalert2'
import Breadcrumb from '../Layouts/Breadcrumb';
import { imgUrl } from '../../Redux/Utils';
import { Showtransfer, storeTransfer, updatetransfer } from '../../Redux/TransferSlice';

export default function NewTransfer() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { id } = useParams()
    const [desc, setDesc] = useState('')
    const [img, setImg] = useState(null)
    const [title, setTitle] = useState('')
    const [startPoint, setStartPoint] = useState('')
    const error = useSelector((state)=>state.transfer.error)
    const transfer = useSelector((state)=>state.transfer.transfer)
    console.log(transfer, id)
    const handleQuillChange = (value) => {
        setDesc(value);
    };
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
      };

    useEffect(() => {
        if (id) {
          dispatch(Showtransfer(id)); // Dispatch the action to fetch job data
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (id) {
        //   dispatch(ShowService(id)); // Dispatch the action to fetch job data
          if (transfer) {
            console.log('post',transfer);
            setDesc(transfer?.data?.desc);
            setTitle(transfer?.data?.title);
            setImg(transfer?.data?.cover_url);
            setStartPoint(transfer?.data?.startPoint);
        }
        }
    }, [id, transfer]);
   
    const handleSave = (e)=>{
        e.preventDefault()
        var formData = new FormData();
        formData.append('title', title);
        formData.append('desc', desc);
        formData.append('img', img);
        formData.append('startPoint', startPoint);

        if (img) {
            formData.append('img', img);
        }
        if(id){
            dispatch(updatetransfer({id,formData})).then((res) => {
                if (res.type === 'transfer/updatetransfer/fulfilled') {
                  navigate('/admin/transfers')
                  Swal.fire('Success', 'This transfer was updated succefuly', 'success');
                }
              });
            }else{
                dispatch(storeTransfer(formData)).then((res) => {
                    console.log(res)
                    if (res.type === 'transfer/storeTransfer/fulfilled') {
                      navigate('/admin/transfers')
                      Swal.fire('Success', 'This transfer was added succefuly', 'success');
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
                   onChange={handleTitleChange}
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
            <div>
            <div className="w-full mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                    Lieu de depart<span className="text-meta-1">*</span>
                </label>
                <input value={startPoint}
                   onChange={(e)=>setStartPoint(e.target.value)}
                    type="text"
                    placeholder="Entrer un lieu de depart"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
                 {error && error.errors && error.errors.startPoint && <span className='text-danger mb-10'>{error && error?.errors?.startPoint[0]}</span>}
            </div>
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
