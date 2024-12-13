import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ element, ...rest }) => {
  const isAuthenticated = localStorage.getItem('token'); // Check token from localStorage
  return isAuthenticated ? <Navigate to="/" replace /> : element;
};

export default PublicRoute;
