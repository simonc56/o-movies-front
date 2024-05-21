import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { MoviesState, SuccessOneMovieResponse, SuccessReviewResponse } from '../@types/MoviesState';
import * as api from '../api';
// import type { RootState } from '../store/store';
import { budgetToMillions, isNumber, isoDateToFrench, isoDateToYear } from '../utils/utils';

const moviesState: MoviesState = {
  currentMovie: null,
  movieList: [],
};

export const actionFetchOneMovie = createAsyncThunk<SuccessOneMovieResponse, string>(
  'movies/fetchOneMovie',
  async (id, thunkAPI) => {
    if (id === undefined) {
      return thunkAPI.rejectWithValue('No id provided');
    }
    if (!isNumber(id as string)) {
      return thunkAPI.rejectWithValue('Invalid id');
    }
    const response = await api.getMovieById(id as string);
    return response.data;
  }
);

export const actionPostReview = createAsyncThunk<
  SuccessReviewResponse,
  { review: string; tmdbId: number; id: number | null }
>('movie/postReview', async (payload, thunkAPI) => {
  const { review, tmdbId, id } = payload;
  // utiliser Jest ici pour validation de données
  if (review === undefined) {
    return thunkAPI.rejectWithValue('No review provided');
  }
  if (tmdbId === undefined || Number.isNaN(tmdbId)) {
    return thunkAPI.rejectWithValue('No tmdbId provided');
  }
  const response = await api.postReview(review, tmdbId, id);
  return response.data;
});

export const actionPostRating = createAsyncThunk<
  SuccessReviewResponse,
  { rating: number; tmdbId: number; id: number | null }
>('movie/postReview', async (payload, thunkAPI) => {
  const { rating, tmdbId, id } = payload;
  // utiliser Jest ici pour validation de données
  const allowedRatings = [1, 2, 3, 4, 5];
  if (rating === undefined || Number.isNaN(rating) || !allowedRatings.includes(rating)) {
    return thunkAPI.rejectWithValue('No rating provided');
  }
  if (tmdbId === undefined || Number.isNaN(tmdbId)) {
    return thunkAPI.rejectWithValue('No tmdbId provided');
  }
  const response = await api.postRating(rating, tmdbId, id);
  return response.data;
});

const moviesSlice = createSlice({
  name: 'movies',
  initialState: moviesState,
  reducers: {
    editMovieList: (state, action: PayloadAction<string>) => {
      state.movieList = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(actionFetchOneMovie.fulfilled, (state, action) => {
        const response = action.payload as SuccessOneMovieResponse;
        state.currentMovie = response.data;
        state.currentMovie.budgetInMillions = budgetToMillions(state.currentMovie.budget);
        state.currentMovie.frenchDate = isoDateToFrench(state.currentMovie.release_date);
        state.currentMovie.year = isoDateToYear(state.currentMovie.release_date);
      })
      .addCase(actionFetchOneMovie.rejected, (_, action) => {
        // eslint-disable-next-line no-console
        console.log('Error :', action.error.message);
        if (action.payload) {
          // eslint-disable-next-line no-console
          console.log('Error :', action.payload);
        }
      })
      .addCase(actionPostReview.fulfilled, (state, action) => {
        const response = action.payload as SuccessReviewResponse;
        // state.currentMovie?.reviews.push(response.data.review);
      });
  },
});

export default moviesSlice.reducer;

export const { editMovieList } = moviesSlice.actions;
