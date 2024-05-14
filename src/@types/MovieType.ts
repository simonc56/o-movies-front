type MovieType = {
  tmdb_id: number;
  title: string;
  original_title: string;
  year: number;
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
};

export type Genre = {
  id: number;
  name: string;
};

export type Review = {
  id: number;
  content: string;
};

export default MovieType;
