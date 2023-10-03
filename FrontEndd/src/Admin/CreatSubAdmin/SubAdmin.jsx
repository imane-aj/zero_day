import React, { useState, useEffect, Fragment } from 'react';
// import axios from 'axios';
import Select from 'react-select';
import axios, { getCookie } from './../../Redux/Utils';
import Breadcrumb from '../Layouts/Breadcrumb';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';

function SubAdmin() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        lastName:'',
        password: '',
        permissions: [], // Store selected permissions here
    });

    const [permissionsOptions, setPermissionsOptions] = useState([]); // Options for the select dropdown

    const { id } = useParams(); // Get the ID from the route params
    const isUpdateMode = !!id;

    useEffect(() => {
        // Fetch the list of permissions associated with the 'admin' role
        const token = getCookie('token')
        axios.get('permissions', {headers: {
              'Content-Type': 'multipart/form-data',
              'accept': 'application/json',
              'Authorization': `Bearer ${token}`,
        },})
            .then((response) => {
                const options = response.data.map((permission) => ({
                    label: permission.name,
                    value: permission.id,
                }));
                setPermissionsOptions(options);
            })
            .catch((error) => {
                // Handle errors
            });

               // Fetch existing sub-admin data in update mode
    if (isUpdateMode) {
        axios.get(`get-sub-admin/${id}`, {headers: {
                'Content-Type': 'multipart/form-data',
                'accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
        .then((response) => {
            // Update formData state with existing data
            const existingData = response.data;
            console.log('existingData',existingData)
            const options = existingData.permissions.map((permission) => ({
                label: permission.name,
                value: permission.id,
            }));
            setFormData({
                name: existingData.name,
                email: existingData.email,
                lastName: existingData.lastName,
                password: '', // Don't set the password for security reasons
                permissions: options,
            });
        })
        .catch((error) => {
            // Handle errors
        });
    }
    }, [id, isUpdateMode]);


    const handleChange = (selectedValue) => {
        setFormData({ ...formData, permissions: selectedValue });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = getCookie('token');
            const requestData = {
                name: formData.name,
                email: formData.email,
                lastName: formData.lastName,
                password: formData.password,
                permissions: formData.permissions.map((permission) => permission.value),
            };

            if (isUpdateMode) {
                // Update sub-admin
                const response = await axios.post(`update-sub-admin/${id}`, requestData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'accept': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.status === 200) {
                    Swal.fire('Success', 'Sub-admin updated successfully', 'success');
                }
            } else {
                // Create sub-admin
                const response = await axios.post('create-sub-admin', requestData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'accept': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.status === 201) {
                    Swal.fire('Success', 'Sub-admin created successfully', 'success');
                }
            }

            // Clear the form after success
            setFormData({ name: '', lastName: '', email: '', password: '', permissions: [] });
        } catch (error) {
            // Handle errors
            console.error('Error:', error);

            // Display an error message
            Swal.fire('Error', 'An error occurred', 'error');
        }
    };
console.log(formData.permissions)
    return (
        <Fragment>
            <Breadcrumb pageName={'Permissions'}/>
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                        Affecter des permission
                    </h3>
                </div>
                <form enctype='multipart/form-data' onSubmit={handleSubmit}>
                    <div className="p-6.5">

                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                        <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black dark:text-white">
                            Nom<span className="text-meta-1">*</span>
                        </label>
                        <input type="text" name="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Entrer le nom"
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                        {/* {error && error.errors && error.errors.title && <span className='text-danger mb-10'>{error && error?.errors?.title[0]}</span>} */}
                        </div>

                        <div className="w-full xl:w-1/2">
                            <label className="mb-3 block text-black dark:text-white">Prenom</label>
                            <input type="text" name="name" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                placeholder="Entrer le prenom"
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            />
                            {/* {error && error.errors && error.errors.img && <span className='text-danger mb-10'>{error && error?.errors?.img[0]}</span>} */}
                        </div>
                    </div>
                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                        <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black dark:text-white">
                            Email<span className="text-meta-1">*</span>
                        </label>
                        <input type="email" name="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="Entrer l'email"
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                        {/* {error && error.errors && error.errors.title && <span className='text-danger mb-10'>{error && error?.errors?.title[0]}</span>} */}
                        </div>

                        <div className="w-full xl:w-1/2">
                            <label className="mb-3 block text-black dark:text-white">Mot de passe</label>
                            <input type="password" name="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                placeholder="Entrer le mot de passe"
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            />
                            {/* {error && error.errors && error.errors.img && <span className='text-danger mb-10'>{error && error?.errors?.img[0]}</span>} */}
                        </div>
                    </div>

                    <div>
                    <label>Permissions:</label>
                    <Select
                        name="permissions"
                        options={permissionsOptions}
                        isMulti
                        onChange={handleChange} // Make sure this is set to your handleChange function
                        value={formData.permissions}
                    />
                </div>
                        {/* {id && <img src={img} width='200px' className='my-3'/>} */}
                    
                    <button type="submit" className="mt-3 inline-block rounded bg-blite px-6 pb-2 pt-2.5 text-blue hover:text-white font-medium hover:bg-blue transition-all duration-200">
                        <span><i class="fa-regular fa-bookmark"></i> Save</span>
                    </button>
                    </div>
                </form>
            </div>
        </Fragment>
    );
}

export default SubAdmin;
