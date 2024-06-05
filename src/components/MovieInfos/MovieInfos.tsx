import { FaStar } from 'react-icons/fa';
import MovieType, { Genre } from '../../@types/MovieType';
import { runtimeToString } from '../../utils/utils';
import ButtonAddToPlaylist from '../ButtonAddToPlaylist/ButtonAddToPlaylist';

import { useAppSelector } from '../../store/hooks';
import './MovieInfos.scss';

type MovieInfosProps = {
  movie: MovieType;
};

function MovieInfos({ movie }: MovieInfosProps) {
  const logged = useAppSelector((state) => state.settings.user.logged);
  const truncateOverview = movie.overview.length > 500 ? `${movie.overview.slice(0, 500)}...` : movie.overview;

  return (
    <section className="section-movie-infos">
      <div className="poster-panel">
        <img src={movie.poster_path} alt="poster du film" />
        {logged && (
          <ButtonAddToPlaylist
            tmdbId={movie.tmdb_id}
            inPlaylists={movie.user_data ? movie.user_data.in_playlists : []}
          />
        )}
      </div>
      <div className="data-panel">
        <h2>{movie.title_fr}</h2>
        <span className="tagline">{movie.tagline}</span>
        <div className="infos">
          <span className="year">{movie.year}</span>
          <span className="rating">
            <FaStar /> {movie.rating.toFixed(1)}
          </span>
          <span>{runtimeToString(movie.runtime)}</span>
        </div>
        <p>{truncateOverview}</p>
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
