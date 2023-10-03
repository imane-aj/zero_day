
import { useEffect } from 'react';
import axios from './../../Redux/Utils';
import { useState } from 'react';
const fetchUserPermissions = async () => {
  try {
    const response = await axios.get('permissions', {headers: {
        'Content-Type': 'multipart/form-data',
        'accept': 'application/json',
        'Authorization': `Bearer ${token}`,
  },}) // Replace with your actual API endpoint
    return response.data; // Assuming your API returns the permissions as an array or object
  } catch (error) {
    console.error('Error fetching permissions:', error);
    return [];
  }
};

const [userPermissions, setUserPermissions] = useState([]);

useEffect(() => {
  fetchUserPermissions().then((permissions) => {
    setUserPermissions(permissions);
  });
}, []);

const hasPermission = (permission) => {
return userPermissions.includes(permission);
};