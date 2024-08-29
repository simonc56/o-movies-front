import { createApi } from '@reduxjs/toolkit/query/react';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { instanceAxios } from './api';

const shouldAddCredentials = (method: string | undefined, url: string) => {
  const credentialsMethods = ['post', 'put', 'patch', 'delete'];
  if (method && credentialsMethods.includes(method.toLowerCase())) return true;
  if (url.endsWith('userdata') || url.endsWith('profil') || url.includes('playlist')) return true;
  return false;
};

type BaseQueryParams = {
  url: string;
  method?: AxiosRequestConfig['method'];
  data?: AxiosRequestConfig['data'];
  params?: AxiosRequestConfig['params'];
};

const apiSlice = createApi({
  baseQuery: async ({ url, method, data, params }: BaseQueryParams) => {
    try {
      let withCredentials = false;
      // cas de figure où on a besoin de withCredentials
      if (shouldAddCredentials(method, url)) withCredentials = true;
      const response = await instanceAxios({ url, method, data, params, withCredentials });
      return response.data;
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  },
  endpoints: () => ({}),
});

export default apiSlice;
