type MovieType = {
  original_title: string;
  year: number;
  rating: number;
  genres: Genre[];
  poster_path: string;
  overview: string;
};

type Genre = {
  id: number;
  name: String;
};
