import { EnhancedStore } from '@reduxjs/toolkit';
import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { jwtDecode } from 'jwt-decode';
import { LoginCredentials, SignupCredentials, SuccessRefreshResponse } from './@types/Credentials';
import { MoviesFilter, ParamsType } from './@types/MovieState';
import { logout, updateToken } from './features/settingsSlice';

const instanceAxios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

export function axiosInterceptor(store: EnhancedStore) {
  let lastRefresh = 0;
  const isRefreshRequest = (config: InternalAxiosRequestConfig) => {
    return config.url?.slice(-14) === '/refresh-token';
  };
  // axios interceptor before any request to refresh token before it expires
  instanceAxios.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      const token = store.getState().settings.user.token;
      if (token) {
        const currentTime = Math.floor(Date.now() / 1000);
        const decodedToken = jwtDecode(token) as { exp: number };
        if (
          decodedToken.exp &&
          // refresh token 1 minute before expiration
          decodedToken.exp - currentTime < 30 &&
          // don't refresh again if last refresh was less than 2 seconds ago
          currentTime - lastRefresh > 2 &&
          // don't refresh token if the request is already a refresh
          !isRefreshRequest(config)
        ) {
          lastRefresh = currentTime;
          try {
            const response = await refreshToken();
            const { token: newToken } = response.data.data as SuccessRefreshResponse;
            store.dispatch(updateToken(newToken)); // update token in settings state
            config.headers.Authorization = `Bearer ${newToken}`;
          } catch (error) {
            console.log(error);
            store.dispatch(logout());
            return Promise.reject(new Error('Token refresh failed, user is logged out'));
          }
        } else if (currentTime - lastRefresh <= 2 && !isRefreshRequest(config)) {
          // already refreshed just a sec ago, wait that state gets the new token from previous refresh attempt
          await new Promise((resolve) => setTimeout(resolve, 500));
          const newToken = store.getState().settings.user.token;
          config.headers.Authorization = `Bearer ${newToken}`;
        }
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
}

//#region ==========     User      ==========

export async function login(credentials: LoginCredentials) {
  const response = await instanceAxios.post('/auth/login', credentials);
  return response;
}
export async function register(credentials: SignupCredentials) {
  const response = await instanceAxios.post('/auth/register', credentials);
  return response;
}
export async function refreshToken(): Promise<AxiosResponse> {
  // not executed in a thunk so no rejected action, we need to use try/catch
  const response = await instanceAxios.post('/auth/refresh-token');
  return response;
}
export async function getProfil() {
  const response = await instanceAxios.get('/profil');
  return response;
}

export function addTokenJWTToAxiosInstance(token: string) {
  instanceAxios.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export function removeTokenJWTToAxiosInstance() {
  instanceAxios.defaults.headers.common.Authorization = null;
}
//#endregion

//#region ==========     Movie     ==========

export async function getMovieById(id: string) {
  const response = await instanceAxios.get(`/movie/${id}`);
  return response;
}

export async function getMoviesByParams(params: ParamsType) {
  const response = await instanceAxios.get('/movie', { params });
  return response;
}

export async function getMoviesByFilter(filter: MoviesFilter) {
  const response = await instanceAxios.get(`/movie/${filter}`);
  return response;
}

export async function getGenres() {
  const response = await instanceAxios.get('/movie/genre');
  return response;
}
//#endregion

//#region ========== Rating/review ==========

export async function searchMovies(query: string) {
  const response = await instanceAxios.get('/movie/search', { params: { query } });
  return response;
}

export async function postReview(review: string, tmdb_id: number) {
  const response = await instanceAxios.post(`/review`, { tmdb_id, content: review });
  return response;
}

export async function postRating(rating: number, tmdb_id: number) {
  const response = await instanceAxios.post(`/rating`, { tmdb_id, value: rating });
  return response;
}

export async function patchReview(review: string, id: number) {
  const response = await instanceAxios.patch(`/review/${id}`, { content: review });
  return response;
}

export async function patchRating(rating: number, id: number) {
  const response = await instanceAxios.patch(`/rating/${id}`, { value: rating });
  return response;
}

export async function deleteReview(id: number) {
  const response = await instanceAxios.delete(`/review/${id}`);
  return response;
}

export async function deleteRating(id: number) {
  const response = await instanceAxios.delete(`/rating/${id}`);
  return response;
}
//#endregion

//#region ==========    Playlist   ==========

export async function createPlaylist(name: string) {
  const response = await instanceAxios.post('/playlist', { name });
  return response;
}

export async function renamePlaylist(id: number, name: string) {
  const response = await instanceAxios.patch(`/playlist/${id}`, { name });
  return response;
}

export async function deletePlaylist(id: number) {
  const response = await instanceAxios.delete(`/playlist/${id}`);
  return response;
}

export async function getPlaylist(id: number) {
  const response = await instanceAxios.get(`/playlist/${id}`);
  return response;
}

export async function getUserPlaylists() {
  const response = await instanceAxios.get('/playlist');
  return response;
}

export async function addMediaToPlaylist(id: number, tmdb_id: number) {
  const response = await instanceAxios.post(`/playlist/${id}/addmovie`, { tmdb_id });
  return response;
}

export async function deleteMediaFromPlaylist(id: number, tmdb_id: number) {
  const response = await instanceAxios.delete(`/playlist/${id}/deletemovie/${tmdb_id}`);
  return response;
}
//#endregion
