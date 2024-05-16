type MovieType = {
  tmdb_id: number;
  title: string;
  original_title: string;
  rating: number;
  genres: Genre[];
  runtime: number;
  tagline: string;
  poster_path: string;
  overview: string;
  release_date: string;
  director: string;
  country: string;
  language: string;
  budget: number;
  reviews: Review[];
  cast: Actor[];
};

export type Genre = {
  id: number;
  name: string;
};

export type Review = {
  id: number;
  content: string;
};

export type Actor = {
  id: number;
  name: string;
  character: string;
  profile_path: string;
};

export default MovieType;
