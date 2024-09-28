import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { userService } from '../services/user/userService';

// Define the props for the PrivateRoute component
interface PrivateRouteProps {
  redirectPath?: string; // Optional prop for redirect path
}

// The PrivateRoute component
const PrivateRoute: React.FC<PrivateRouteProps> = ({ redirectPath = '/' }) => {
  const isAuthenticated = !!userService.getLoggedinUser();

  return isAuthenticated ? <Outlet /> : <Navigate to={redirectPath} />;
};

export default PrivateRoute;
