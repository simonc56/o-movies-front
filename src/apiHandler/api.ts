import { EnhancedStore } from '@reduxjs/toolkit';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { jwtDecode } from 'jwt-decode';
import { SignupCredentials, SuccessRefreshResponse } from '../@types/Credentials';
import { logout, updateToken } from '../features/settingsSlice';

export const instanceAxios: AxiosInstance = axios.create({
  baseURL: '/api',
});

// here are API requests that I could not put in a RTK Query

// #region ==========     User      ==========

export async function register(credentials: SignupCredentials) {
  return await instanceAxios.post('/auth/register', credentials);
}
export async function refreshToken(currentToken: string): Promise<AxiosResponse> {
  const config: AxiosRequestConfig = {
    withCredentials: true,
    headers: { Authorization: `Bearer ${currentToken}` },
  };
  return await instanceAxios.post('/auth/refresh-token', null, config);
}
// #endregion

// #region ==========     Movie     ==========

// not as a RTK Query because called in a loop in MoviesPage.tsx (hook in a loop is forbidden)
export async function getMovieById(id: string) {
  return await instanceAxios.get(`/movie/${id}`);
}
// #endregion

export function axiosInterceptor(store: EnhancedStore) {
  let isRefreshing = false;
  let refreshPromise: Promise<string | AxiosResponse> | null = null;

  const isRefreshRequest = (config: InternalAxiosRequestConfig) => config.url?.slice(-14) === '/refresh-token';
  // axios interceptor before any request to refresh token before it expires
  instanceAxios.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      const { token } = store.getState().settings.user;
      if (token && config.withCredentials && !isRefreshRequest(config)) {
        const currentTime = Math.floor(Date.now() / 1000);
        const decodedToken = jwtDecode(token) as { exp: number };
        const newConfig = { ...config };
        if (decodedToken.exp - currentTime < 30) {
          if (!isRefreshing) {
            isRefreshing = true;
            refreshPromise = refreshToken(token)
              .then((response) => {
                const { token: newToken } = response.data.data as SuccessRefreshResponse;
                store.dispatch(updateToken(newToken)); // update token in settings state
                return newToken;
              })
              .catch((error) => {
                // eslint-disable-next-line no-console
                console.log('Token refresh failed', error?.message);
                store.dispatch(logout());
                throw new Error('Token refresh failed, user is logged out');
              })
              .finally(() => {
                isRefreshing = false;
                refreshPromise = null;
              });
          }
          // kind of stop point here, wait for the new token before sending the request
          const newToken = await refreshPromise;
          newConfig.headers.Authorization = `Bearer ${newToken}`;
        } else {
          newConfig.headers.Authorization = `Bearer ${token}`;
        }
        return newConfig;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
  // axios interceptor after any request, if error is 401 we logout
  instanceAxios.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error) => {
      if (error.response?.status === 401) {
        store.dispatch(logout());
      }
      return Promise.reject(error);
    }
  );
}
