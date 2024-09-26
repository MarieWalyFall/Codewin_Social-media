import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from 'utils/BaseUrl';

const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: headers => {
    let token = localStorage.getItem('access_token');
    token && headers.append(`Authorization`, `Bearer ${token}`);
    headers.append('Content-Type', 'application/json');

    return headers;
  },
});

export const rootApi = createApi({
    baseQuery: baseQueryWithAuth,
    tagTypes: [
    ],
    endpoints: builder => ({}),
  });
  