import React,  {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'pages/Authentication/useLocalStorage';
import {
  useAuthenticateMutation,
  useRefreshTokenMutation,
} from "../services/Api/AuthApi";
import { AuthenticationData, DefaultProps } from "types";



const initialContext = {
  auth: {
    profile: { id: null, name: null, profession: null, connections: { length:null}, imgUrl: null},
    access_token: null,
    refresh_token: null,
    expiration_time: null,
  },
  login: (data: any) => {},
  logout: () => {},
  refreshToken: (token: any) => {},
};
const AuthContext = createContext(initialContext);

export const AuthProvider = ({ children }: DefaultProps) => {
  const [Auth] = useAuthenticateMutation();
  const [refresh] = useRefreshTokenMutation();
  const [auth, setAuth] = useLocalStorage('auth', initialContext);
  const navigate = useNavigate();

  // login

  const login = useCallback(
    (data: AuthenticationData) => {
      console.log(data);
      setAuth({ profile: data.profile, access_token: 'admin' });
      navigate('/');
    },
    [navigate, setAuth],
  );

  // const login = useCallback(
  //   async (data: AuthenticationData) => {
  //     try {
  //       const result = await Auth(data);
  //       if ('data' in result) {
  //         const { access_token, refresh_token, expires_in } = result.data;
  //         localStorage.setItem('access_token', access_token);

  //         // Extract expiration time from the token payload
  //         const expiration_time = new Date().getTime() + expires_in * 1000; // Convert to milliseconds
  //         setAuth({
  //           profile: data.profile,
  //           access_token: access_token,
  //           refresh_token,
  //           expiration_time,
  //         });
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   },
  //   [Auth, setAuth],
  // );

  // refresh token
  const refreshToken = useCallback(
    async (refresh_token: any) => {
      const result = await refresh(refresh_token);
      if ('data' in result) {
        const { access_token, refresh_token, expires_in } = result.data;
        const expiration_time = new Date().getTime() + expires_in * 1000;
        localStorage.setItem('access_token', access_token);
        setAuth({
          ...auth,
          access_token,
          refresh_token,
          expiration_time,
        });
      }
    },
    [auth, refresh, setAuth],
  );

  // logout
  const logout = useCallback(() => {
    setAuth(initialContext);
    localStorage.removeItem('access_token');
    navigate('/', { replace: true });
  }, [setAuth, navigate]);

  // Extend Active Sessions
  useEffect(() => {
    if (
      auth &&
      auth.access_token &&
      auth.refresh_token &&
      auth.expiration_time
    ) {
      const { refresh_token, expiration_time } = auth;
      // Calculate the time before the token expires
      const timeBeforeExpiry = expiration_time - Date.now();

      // Set up a timer to refresh the token a bit before it expires
      const timer = setTimeout(async () => {
        try {
          await refreshToken(refresh_token);
        } catch (error) {
          console.log('Error refreshing token');
        }
      }, timeBeforeExpiry - 3 * 60 * 1000); // Refresh 2 minutes before expiry

      // Clean up the timer when the component unmounts or auth/refreshToken changes
      return () => clearTimeout(timer);
    }
  }, [auth, refreshToken]);

  const value = useMemo(
    () => ({
      auth,
      login,
      logout,
      refreshToken,
    }),
    [auth, login, logout, refreshToken],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
