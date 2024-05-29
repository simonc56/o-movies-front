import MovieType from './MovieType';

export type MoviesState = {
  currentMovie: MovieType | null;
  movieList: MovieType[];
};

export type ParamsType = {
  page: number;
  sort_by: string;
  with_release_type: string;
};

export type MoviesFilter = 'nowplaying' | 'popular' | 'upcoming' | 'toprated';

export type SuccessOneMovieResponse = {
  data: MovieType;
};

export type SuccessMoviesResponse = {
  data: MovieType[];
};

// here I create a generic type for 'success' API responses (no export)
// you have to specify the type of T when you want to reuse SuccessResponse<T>
type SuccessResponse<T> = {
  status: 'success';
  data: T;
};

export type FailResponse = {
  data: {
    status: 'fail';
    error: string;
  };
};

export type SuccessReviewResponse = SuccessResponse<{ reviewId: number }>;

export type SuccessRatingResponse = SuccessResponse<{ ratingId: number }>;
