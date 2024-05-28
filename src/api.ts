import axios from 'axios';
import { LoginCredentials, SignupCredentials } from './@types/Credentials';
import { ParamsType } from './@types/MoviesState';

const instanceAxios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export async function login(credentials: LoginCredentials) {
  const response = await instanceAxios.post('/auth/login', credentials);
  return response;
}
export async function register(credentials: SignupCredentials) {
  const response = await instanceAxios.post('/auth/register', credentials);
  return response;
}

export function addTokenJWTToAxiosInstance(token: string) {
  instanceAxios.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export async function getMovieById(id: string) {
  const response = await instanceAxios.get(`/movie/${id}`);
  return response;
}

export async function getMoviesByParams(params: ParamsType) {
  const response = await instanceAxios.get(`/movie`, { params });
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
  const response = await instanceAxios.patch(`/review/${id}`, { review });
  return response;
}

export async function patchRating(rating: number, id: number) {
  const response = await instanceAxios.patch(`/rating/${id}`, { rating });
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
