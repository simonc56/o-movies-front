import { createApi } from '@reduxjs/toolkit/query/react';
import { AxiosError, AxiosRequestConfig } from 'axios';
import {instanceAxios} from './api';

export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  withCredentials?: boolean;
}

const shouldAddCredentials = (method: string | undefined, url: string | undefined) => {
  const credentialsMethods = ['post', 'put', 'patch', 'delete'];
  if (method && credentialsMethods.includes(method.toLowerCase())) return true;
  return !!(url && (url.endsWith('userdata') || url.endsWith('profil') || url.includes('playlist')));
};

const apiSlice = createApi({
  baseQuery: async (args: AxiosRequestConfig) => {
    try {
      const { url, method, data, params } = args;
      const requestConfig: CustomAxiosRequestConfig = {
        url,
        method,
        data,
        params,
        withCredentials: shouldAddCredentials(method, url)
      };
      const response = await instanceAxios(requestConfig);
      return {data: response.data.data};
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
