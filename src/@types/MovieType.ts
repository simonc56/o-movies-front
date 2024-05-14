type MovieType = {
  tmdb_id: number;
  original_title: string;
  year: number;
  rating: number;
  genres: Genre[];
  runtime: number;
  tagline: string;
  poster_path: string;
  release_date: string;
  overview: string;
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
