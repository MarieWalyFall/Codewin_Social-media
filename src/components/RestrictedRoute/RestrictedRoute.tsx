import { Navigate } from 'react-router-dom';
import { useAuth } from 'app/hooks/useAuth';
import React, { ReactElement } from 'react';

const profilePaths: { [key: string]: string } = {
  admin: '/admin/users',
  productor: '/sites',
  agronomist: '/productionplans',
};

interface RouteProps {
  children: ReactElement;
}

export const RestrictedRoute: React.FC<RouteProps> = ({ children }) => {
  const { auth } = useAuth();

  if (auth && auth.profile && auth.access_token) {
    // user is authenticated
    const profile = auth.profile;
    const profileHome = profilePaths[profile];
    return <Navigate to={profileHome} />;
  }
  return children;
};
