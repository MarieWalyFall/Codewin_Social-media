import {
  RegistrationData,
  AuthenticationData,
  AccessTokenResponse,
  RefreshTokenData,
  ResetPasswordInitData,
  ResetPasswordFinishData,
} from 'types';
import { rootApi } from '..';

const AuthApi = rootApi.injectEndpoints({
  endpoints: builder => ({
    register: builder.mutation<void, RegistrationData>({
      query: (data: RegistrationData) => {
        const body = JSON.stringify(data);
        return {
          url: 'register',
          method: 'POST',
          body: JSON.stringify(body),
        };
      },
    }),
    authenticate: builder.mutation<AccessTokenResponse, AuthenticationData>({
      query: data => ({
        url: 'authentication',
        method: 'POST',
        body: data,
      }),
    }),
    refreshToken: builder.mutation<AccessTokenResponse, RefreshTokenData>({
      query: data => ({
        url: 'refresh-token',
        method: 'POST',
        body: data,
      }),
    }),
    resetPasswordInit: builder.mutation<void, ResetPasswordInitData>({
      query: data => ({
        url: 'account/reset-password/init',
        method: 'POST',
        body: data,
      }),
    }),
    resetPasswordFinish: builder.mutation<void, ResetPasswordFinishData>({
      query: data => ({
        url: 'account/reset-password/finish',
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation<void, string>({
      query: refreshToken => ({
        url: `logout/${refreshToken}`,
        method: 'GET',
      }),
    }),
  }),
});
// Export the hooks for each endpoint
export const {
  useAuthenticateMutation,
  useRegisterMutation,
  useRefreshTokenMutation,
  useResetPasswordInitMutation,
  useResetPasswordFinishMutation,
  useLogoutMutation,
} = AuthApi;

export default AuthApi;
