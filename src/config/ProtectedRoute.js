import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  // If no token is found, redirect to login
  if (!token) {
    return <Navigate to="/login" />;
  }

  // If token exists, render the children (protected content)
  return children;
};

export default ProtectedRoute;