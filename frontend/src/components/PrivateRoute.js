import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const { token } = useUser();

  return token ? <Element {...rest} /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
