import {  Navigate } from 'react-router-dom';
import { getCookie } from '../Redux/Utils';

const ProtectedUser = ({ element: Element, roles, ...rest }) => {
  const userRole = localStorage.getItem('role');

  const token = getCookie('token');
  if (!token) {
    return <Navigate to="/login2" />;
  }

  if (roles && token && !roles.includes(userRole)) {
    return <Navigate to="/login2" />;
  }

  return <Element {...rest} />;
};

export default ProtectedUser;