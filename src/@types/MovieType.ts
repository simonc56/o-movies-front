type MovieType = {
  original_title: string;
  year: number;
  rating: number;
  genres: Genre[];
  runtime: number;
  poster_path: string;
  overview: string;
};

type Genre = {
  id: number;
  name: String;
};
