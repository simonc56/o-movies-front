type MovieType = {
  id: number;
  tmdb_id: number;
  title_fr: string;
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
  original_language: string;
  status: string;
  budget: number;
  reviews: Review[];
  cast: Actor[];
  budgetInMillions?: string;
  frenchDate?: string;
  year?: number;
  crew: { name: string }[];
};

export type Genre = {
  id: number;
  name: string;
};

export type Review = {
  review_id: number;
  content: string;
};

export type Actor = {
  id: number;
  name: string;
  character: string;
  profile_path: string;
};

export default MovieType;
