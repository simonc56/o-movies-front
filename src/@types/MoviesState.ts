import MovieType from './MovieType';

export type MoviesState = {
  currentMovie: MovieType | null;
  movieList: MovieType[];
};

export type SuccessOneMovieResponse = {
  data: MovieType;
};
