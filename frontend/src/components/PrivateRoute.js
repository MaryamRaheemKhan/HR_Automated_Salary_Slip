import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem('token'); // Check if the user is logged in
  return token ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
