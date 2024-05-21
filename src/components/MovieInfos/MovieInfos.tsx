import { FaStar } from 'react-icons/fa';
import MovieType, { Genre } from '../../@types/MovieType';
import { runtimeToString } from '../../utils/utils';

import './MovieInfos.scss';

type MovieInfosProps = {
  movie: MovieType;
};

function MovieInfos({ movie }: MovieInfosProps) {
  return (
    <section className="section-movie-infos">
      <div className="poster-panel">
        <img src={movie.poster_path} alt="poster du film" />
      </div>
      <div className="data-panel">
        <h2>{movie.original_title}</h2>
        <span className="tagline">{movie.tagline}</span>
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
        <div className="detail-infos">
          <div className="detail-infos--item">
            <div className="detail-infos--name">Date de sortie</div>
            <span className="detail-infos--value">{movie.frenchDate}</span>
          </div>
          <div className="detail-infos--item">
            <span className="detail-infos--name">Réalisateur</span>
            <span className="detail-infos--value">{movie.crew[0].name}</span>
          </div>
          <div className="detail-infos--item">
            <span className="detail-infos--name">Pays d'origine</span>
            <span className="detail-infos--value">{movie.country}</span>
          </div>
          <div className="detail-infos--item">
            <span className="detail-infos--name">Langue d'origine</span>
            <span className="detail-infos--value">{movie.original_language}</span>
          </div>
          <div className="detail-infos--item">
            <span className="detail-infos--name">Budget</span>
            <span className="detail-infos--value">{movie.budgetInMillions}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MovieInfos;
