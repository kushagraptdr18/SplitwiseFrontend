import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, ...rest }) => {
  const isAuthenticated = localStorage.getItem('token'); // Check token from local storage
  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
