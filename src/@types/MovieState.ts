import MovieType, { MovieResultType } from './MovieType';

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

export type RatingResponse = {
  rating_id: number; // only returned with a POST request
  rating: number;
  media_id: number;
  media_average_rating: number; // recalculated each time a rating is added/updated
};

export type ReviewResponse = {
  review_id: number; // only returned with a POST request
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
