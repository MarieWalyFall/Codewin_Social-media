import React from 'react';
import { Route, Navigate, RouteProps } from 'react-router-dom';
import { userService } from '../services/user/userService';
import { DefaultProps } from 'types';

// Define the props for the PrivateRoute component
interface PrivateRouteProps {
  component: React.ComponentType<any>; 
  path?: string;
}
const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, path, ...rest }) => {
  const isAuthenticated = !!userService.getLoggedinUser(); // Ensure it's a boolean

  return (
    <Route
      {...rest}
      element={isAuthenticated ? <Component /> : <Navigate to={path?path:"main"} />}
    />
  );
};

export default PrivateRoute;
