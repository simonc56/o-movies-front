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
  reviews: Review[];
};

type Genre = {
  id: number;
  name: String;
};

type Review = {
  id: number;
  content: string;
};
