import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { userService } from '../services/user/userService';

// Define the props for the OpenRoute component
interface OpenRouteProps {
  redirectPath?: string; // Optional prop for redirect path
}

// The OpenRoute component
const OpenRoute: React.FC<OpenRouteProps> = ({ redirectPath = '/feed' }) => {
  const isAuthenticated = !!userService.getLoggedinUser();

  return isAuthenticated ? <Navigate to={redirectPath} /> : <Outlet />;
};

export default OpenRoute;
