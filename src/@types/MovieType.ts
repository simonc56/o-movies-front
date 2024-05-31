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
  average_rating: number | null;
  crew: { name: string }[];
  user_data: MovieUserData;
};

export type Genre = {
  id: number;
  name: string;
};

export type Rating = {
  rating_id: number;
  value: number;
};

export type Review = {
  review_id: number;
  content: string;
  user_firstname?: string;
};

export type Actor = {
  id: number;
  name: string;
  character: string;
  profile_path: string;
};

export type MovieUserData = {
  userId: number;
  rating: Rating | null;
  review: Review | null;
};

export default MovieType;
