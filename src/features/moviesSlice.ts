import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  MoviesState,
  SuccessOneMovieResponse,
  SuccessRatingResponse,
  SuccessReviewResponse,
} from '../@types/MoviesState';
import * as api from '../api';
// import type { RootState } from '../store/store';
import { budgetToMillions, isNumber, isoDateToFrench, isoDateToYear } from '../utils/utils';

const moviesState: MoviesState = {
  currentMovie: null,
  movieList: [],
};

// thunk types: createAsyncThunk<returned object type, received arg type>
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

export const actionPostReview = createAsyncThunk<[SuccessReviewResponse, string], { review: string; tmdbId: number }>(
  'movie/postReview',
  async (payload, thunkAPI) => {
    const { review, tmdbId } = payload;
    // use Jest here for data validation
    if (review === undefined) {
      return thunkAPI.rejectWithValue('No review provided');
    }
    if (tmdbId === undefined || Number.isNaN(tmdbId)) {
      return thunkAPI.rejectWithValue('No tmdbId provided');
    }
    const response = await api.postReview(review, tmdbId);
    // send both api response and review content because content is not provided by api
    return [response.data, review];
  }
);

export const actionPostRating = createAsyncThunk<[SuccessRatingResponse, number], { rating: number; tmdbId: number }>(
  'movie/postRating',
  async (payload, thunkAPI) => {
    const { rating, tmdbId } = payload;
    // use Jest here for data validation
    const allowedRatings = [1, 2, 3, 4, 5];
    if (rating === undefined || Number.isNaN(rating) || !allowedRatings.includes(rating)) {
      return thunkAPI.rejectWithValue('No rating provided');
    }
    if (tmdbId === undefined || Number.isNaN(tmdbId)) {
      return thunkAPI.rejectWithValue('No tmdbId provided');
    }
    const response = await api.postRating(rating, tmdbId);
    // send both api response and rating value because value is not provided by api
    return [response.data, rating];
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
        console.log('Error :', action.error.message);
        if (action.payload) {
          // eslint-disable-next-line no-console
          console.log('Error :', action.payload);
        }
      })
      .addCase(actionPostReview.fulfilled, (state, action) => {
        const [response, review] = action.payload;
        if (response.data.status === 'success') {
          const { reviewId } = response.data.data;
          state.currentMovie?.reviews.push({ review_id: reviewId, content: review });
        }
      })
      .addCase(actionPostRating.fulfilled, (state, action) => {
        const [response, rating] = action.payload;
        if (response.data.status === 'success') {
          const { ratingId } = response.data.data;
          // what to do here ?
          // recalculate average rating ?
        }
      });
  },
});

export default moviesSlice.reducer;

export const { editMovieList } = moviesSlice.actions;
