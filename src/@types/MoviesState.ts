import MovieType from './MovieType';

export type MoviesState = {
  currentMovie: MovieType | null;
  movieList: MovieType[];
};

export type SuccessOneMovieResponse = {
  data: MovieType;
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

export type SuccessReviewResponse = {
  data: SuccessResponse<{ review_id: number }>;
};

export type SuccessRatingResponse = {
  data: SuccessResponse<{ rating_id: number }>;
};
