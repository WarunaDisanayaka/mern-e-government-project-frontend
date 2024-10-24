import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token'); // Check if the token exists in localStorage

    if (!token) {
        // If no token, redirect to the login page
        return <Navigate to="/" replace />;
    }

    // If token exists, allow access to the route
    return children;
};

export default ProtectedRoute;
