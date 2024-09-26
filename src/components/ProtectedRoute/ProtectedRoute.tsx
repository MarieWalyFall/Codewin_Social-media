import { Navigate } from 'react-router-dom';
import { useAuth } from 'app/hooks/useAuth';
import { userMenu } from 'data/Menus';

export const ProtectedRoute = ({ children }) => {
  const { auth } = useAuth();
  if (!(auth && auth.profile && auth.access_token)) {
    // user is not authenticated
    return <Navigate to="/" />;
  }

  return children;
};
