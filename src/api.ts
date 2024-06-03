import axios from 'axios';
import { LoginCredentials, SignupCredentials } from './@types/Credentials';
import { MoviesFilter, ParamsType } from './@types/MovieState';

const instanceAxios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

//#region ==========     User      ==========

export async function login(credentials: LoginCredentials) {
  const response = await instanceAxios.post('/auth/login', credentials);
  return response;
}
export async function register(credentials: SignupCredentials) {
  const response = await instanceAxios.post('/auth/register', credentials);
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
//#endregion

//#region ========== Rating/review ==========

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
