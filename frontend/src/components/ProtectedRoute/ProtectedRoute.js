// ProtectedRoute.js
import { Navigate } from "react-router-dom";
import React from 'react';

const ProtectedRouteElement = ({ element: Component, ...props  }) => {
  return (
    props.loggedIn ? <Component {...props} /> : <Navigate to='/' replace/>
)}

export default ProtectedRouteElement;