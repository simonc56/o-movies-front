import axios from 'axios';
import { LoginCredentials, SignupCredentials } from './@types/Credentials';

const instanceAxios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export async function login(credentials: LoginCredentials) {
  const response = await instanceAxios.post('/auth/login', credentials);
  return response;
}
export async function signup(credentials: SignupCredentials) {
  const response = await instanceAxios.post('/auth/signup', credentials);
  return response;
}

export function addTokenJWTToAxiosInstance(token: string) {
  instanceAxios.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export async function getMovieById(id: string) {
  const response = await instanceAxios.get(`/movie/${id}`);
  return response;
}

export async function postReview(review: string, tmdb_id: number, id: number | null) {
  const response = await instanceAxios.post(`/review`, { tmdb_id, id, content: review });
  return response;
}

export async function postRating(rating: number, tmdb_id: number, id: number | null) {
  const response = await instanceAxios.post(`/rating`, { tmdb_id, id, value: rating });
  return response;
}

export async function patchReview(review: string, id: number) {
  const response = await instanceAxios.patch(`/review`, { id, content: review });
  return response;
}

export async function patchRating(rating: number, id: number) {
  const response = await instanceAxios.patch(`/rating`, { id, value: rating });
  return response;
}
