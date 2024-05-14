import { FaStar } from 'react-icons/fa';
import movieData from '../../../fakeData/oneMovieData.json';
import runtimeToString from '../../utils/utils';
import './MoviePage.scss';

function MoviePage() {
  const movie = movieData as MovieType;

  return (
    <div className="movie-page">
      <div className="poster-panel">
        <img src={movie.poster_path} alt="poster du film" />
      </div>
      <div className="data-panel">
        <h1>{movie.original_title}</h1>
        <div className="infos">
          <span className="year">{movie.year}</span>
          <span className="rating">
            <FaStar /> {movie.rating}
          </span>
          <span>{runtimeToString(movie.runtime)}</span>
        </div>
        <p>{movie.overview}</p>
        <div className="categories">
          {movie.genres.map((genre: Genre) => (
            <span className="category" key={genre.id}>
              {genre.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MoviePage;
