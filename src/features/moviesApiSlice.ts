import { BaseQueryFn, EndpointBuilder } from '@reduxjs/toolkit/query';
import { MoviesFilter, ParamsType, RatingResponse, ReviewResponse } from '../@types/MovieState';
import MovieType, { Genre, MovieResultType, MovieUserData } from '../@types/MovieType';
import apiSlice from '../apiHandler/apiSlice';

export const moviesApiSlice = apiSlice.enhanceEndpoints({ addTagTypes: ['MovieUserdata'] }).injectEndpoints({
  endpoints: (builder: EndpointBuilder<BaseQueryFn, string, string>) => ({
    getMovieById: builder.query<MovieType, string | number>({
      query: (id) => ({
        url: `/movie/${id}`,
      }),
    }),
    getUserdataMovieById: builder.query<MovieUserData, string | number>({
      query: (id) => ({
        url: `/movie/${id}/userdata`,
      }),
      providesTags: (_, __, id) => [
        { type: 'MovieUserdata', id }, // Tag the specific movie
      ],
    }),
    getMoviesByParams: builder.query<MovieType[], ParamsType>({
      query: (params: ParamsType) => ({
        url: `/movie`,
        params,
      }),
    }),
    getMoviesByFilter: builder.query<MovieType[], MoviesFilter>({
      query: (filter: MoviesFilter) => ({
        url: `/movie/${filter}`,
      }),
    }),
    getGenres: builder.query<Genre[], void>({
      query: () => ({
        url: `/movie/genre`,
      }),
    }),
    searchMovies: builder.query<MovieResultType[], string>({
      query: (query: string) => ({
        url: `/movie/search`,
        params: { query },
      }),
      transformResponse: (response: MovieResultType[]) => response.slice(0, 7),
    }),
    postReview: builder.mutation<ReviewResponse, { review: string; tmdbId: number }>({
      query: ({ review, tmdbId }) => ({
        url: `/review`,
        method: 'POST',
        data: { content: review, tmdb_id: tmdbId },
      }),
      onQueryStarted: async ({ tmdbId }, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        // Update the userdata cache with the new review
        dispatch(
          moviesApiSlice.util.updateQueryData('getUserdataMovieById', tmdbId, (draft) => {
            draft.review = { content: data.content, review_id: data.review_id };
          })
        );
        // Add the review to the movie cache
        dispatch(
          moviesApiSlice.util.updateQueryData('getMovieById', tmdbId.toString(), (draft) => {
            draft.reviews = [...draft.reviews, { content: data.content, review_id: data.review_id }];
          })
        );
      },
    }),
    postRating: builder.mutation<RatingResponse, { rating: number; tmdbId: number }>({
      query: ({ rating, tmdbId }) => ({
        url: `/rating`,
        method: 'POST',
        data: { value: rating, tmdb_id: tmdbId },
      }),
      onQueryStarted: async ({ tmdbId }, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        // Update the userdata cache with the new rating
        dispatch(
          moviesApiSlice.util.updateQueryData('getUserdataMovieById', tmdbId, (draft) => {
            draft.rating = { value: data.rating || 0, rating_id: data.rating_id };
          })
        );
        // Update the average rating of the movie
        dispatch(
          moviesApiSlice.util.updateQueryData('getMovieById', tmdbId.toString(), (draft) => {
            draft.average_rating = data.media_average_rating;
          })
        );
      },
    }),
    patchReview: builder.mutation<ReviewResponse, { review: string; id: number; tmdbId: number }>({
      query: ({ review, id }) => ({
        url: `/review/${id}`,
        method: 'PATCH',
        data: { content: review },
      }),
      onQueryStarted: async ({ review, id, tmdbId }, { dispatch, queryFulfilled }) => {
        // Update the userdata cache with the new review
        const patchUserdataResult = dispatch(
          moviesApiSlice.util.updateQueryData('getUserdataMovieById', tmdbId, (draft) => {
            // draft.review = { content: data.content, review_id: data.review_id };
            draft.review = { content: review, review_id: id };
          })
        );
        // Update the review in the movie cache
        const patchMovieResult = dispatch(
          moviesApiSlice.util.updateQueryData('getMovieById', tmdbId.toString(), (draft) => {
            const reviewIndex = draft.reviews.findIndex((reviewItem) => reviewItem.review_id === id);
            draft.reviews[reviewIndex].content = review;
          })
        );
        try {
          await queryFulfilled;
        } catch (error) {
          // If the patch request fails, undo the changes
          patchUserdataResult.undo();
          patchMovieResult.undo();
        }
      },
    }),
    patchRating: builder.mutation<RatingResponse, { rating: number; id: number; tmdbId: number }>({
      query: ({ rating, id }) => ({
        url: `/rating/${id}`,
        method: 'PATCH',
        data: { value: rating },
      }),
      onQueryStarted: async ({ rating, id, tmdbId }, { dispatch, queryFulfilled }) => {
        // Update the userdata cache with the new rating
        const patchUserdataResult = dispatch(
          moviesApiSlice.util.updateQueryData('getUserdataMovieById', tmdbId, (draft) => {
            draft.rating = { value: rating, rating_id: id };
          })
        );
        try {
          const { data } = await queryFulfilled;
          // Update the average rating of the movie
          dispatch(
            moviesApiSlice.util.updateQueryData('getMovieById', tmdbId.toString(), (draft) => {
              draft.average_rating = data.media_average_rating;
            })
          );
        } catch (error) {
          // If the patch request fails, undo the changes
          patchUserdataResult.undo();
        }
      },
    }),
    deleteReview: builder.mutation<void, number>({
      query: (id) => ({
        url: `/review/${id}`,
        method: 'DELETE',
      }),
    }),
    deleteRating: builder.mutation<void, number>({
      query: (id) => ({
        url: `/rating/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

// RTK Query automatically generates hooks for each endpoint
// as use{EndpointName}Query or use{EndpointName}Mutation
export const {
  useGetMovieByIdQuery,
  useGetUserdataMovieByIdQuery,
  useGetMoviesByParamsQuery,
  useGetMoviesByFilterQuery,
  useGetGenresQuery,
  useSearchMoviesQuery,
  usePostReviewMutation,
  usePostRatingMutation,
  usePatchReviewMutation,
  usePatchRatingMutation,
  useDeleteReviewMutation,
  useDeleteRatingMutation,
} = moviesApiSlice;
