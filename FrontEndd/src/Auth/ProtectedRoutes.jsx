import {  Navigate } from 'react-router-dom';
import { getCookie } from '../Redux/Utils';

const ProtectedRoute = ({ element: Element, roles, ...rest }) => {
  const userRole = localStorage.getItem('role');
  console.log(userRole)
  const token = getCookie('token');
  if (!token) {
    return <Navigate to="/login" />;
  }

  if (roles && token && !roles.includes(userRole)) {
    return <Navigate to="/login" />;
  }

  return <Element {...rest} />;
};

export default ProtectedRoute;