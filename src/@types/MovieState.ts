import MovieType, { MovieResultType } from './MovieType';

export type MovieState = {
  currentMovie: MovieType | null;
  movieList: MovieType[];
  movieResultList: MovieResultType[];
};

export type ParamsType = {
  page: number;
  sort_by: string;
  with_genres?: string;
};

export type MoviesFilter = 'nowplaying' | 'popular' | 'upcoming' | 'toprated';

export type SuccessOneMovieResponse = {
  data: MovieType;
};

export type SuccessMoviesResponse = {
  data: MovieType[];
};

export type SuccessMoviesSearchResponse = {
  data: MovieResultType[];
};

// here I create a generic type for 'success' API responses (no export)
// you have to specify the type of T when you want to reuse SuccessResponse<T>
type SuccessResponse<T> = {
  status: 'success';
  data: T;
};

type RatingResponse = {
  rating_id?: number; // only returned with a POST request
  media_id: number;
  movie_average_rating: number; // recalculated each time a rating is added/updated
};

type ReviewResponse = {
  review_id?: number; // only returned with a POST request
  content: string;
};

export type FailResponse = {
  data: {
    status: 'fail';
    error: string;
  };
};

export type SuccessReviewResponse = SuccessResponse<ReviewResponse>;

export type SuccessRatingResponse = SuccessResponse<RatingResponse>;
