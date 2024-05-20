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

export const actionPostReview = createAsyncThunk<SuccessReviewResponse, { review: string; tmdbId: number }>(
  'movie/postReview',
  async (payload, thunkAPI) => {
    const { review, tmdbId } = payload;
    if (review === undefined) {
      return thunkAPI.rejectWithValue('No review provided');
    }
    if (tmdbId === undefined || Number.isNaN(tmdbId)) {
      return thunkAPI.rejectWithValue('No tmdbId provided');
    }
    const response = await api.postReview(review, tmdbId);
    return response.data;
  }
);

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
        console.log(action.error.message);
      });
  },
});

export default moviesSlice.reducer;

export const { editMovieList } = moviesSlice.actions;
