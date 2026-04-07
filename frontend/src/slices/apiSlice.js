import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants';
import { logout } from './authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,

  // ✅ ADD THIS PART
  prepareHeaders: (headers, { getState }) => {
    const { userInfo } = getState().auth;

    if (userInfo?.token) {
      headers.set('Authorization', `Bearer ${userInfo.token}`);
    }

    return headers;
  },
});

async function baseQueryWithAuth(args, api, extra) {
  const result = await baseQuery(args, api, extra);

  // ✅ KEEP THIS (your logout logic)
  if (result.error && result.error.status === 401) {
    api.dispatch(logout());
  }

  return result;
}

export const apiSlice = createApi({
  baseQuery: baseQueryWithAuth,
  tagTypes: ['Product', 'Order', 'User'],
  endpoints: (builder) => ({}),
});
