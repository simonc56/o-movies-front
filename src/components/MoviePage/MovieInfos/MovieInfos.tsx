import { FaStar } from 'react-icons/fa';
import MovieType, { Genre } from '../../../@types/MovieType';
import no_poster from '../../../assets/no-poster.webp';
import { useAppSelector } from '../../../store/hooks';
import {
  budgetToMillions,
  isoCountriesToFrench,
  isoDateToFrench,
  isoLanguageToFrench,
  runtimeToString,
} from '../../../utils/utils';
import ButtonAddToPlaylist from '../../ui/ButtonAddToPlaylist/ButtonAddToPlaylist';
import './MovieInfos.scss';

type MovieInfosProps = {
  movie: MovieType;
};

function MovieInfos({ movie }: MovieInfosProps) {
  const user = useAppSelector((state) => state.settings.user);
  const truncateOverview = movie.overview.length > 500 ? `${movie.overview.slice(0, 500)}...` : movie.overview;

  return (
    <section className="section-movie-infos">
      <div className="poster-panel">
        <img src={movie.poster_path ? movie.poster_path : no_poster} alt="poster du film" />
        {user.logged && <ButtonAddToPlaylist tmdbId={movie.tmdb_id} />}
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
            <span className="detail-infos--value">{isoDateToFrench(movie.release_date, true)}</span>
          </div>
          {!!movie.crew.length && (
            <div className="detail-infos--item">
              <span className="detail-infos--name">Réalisateur</span>
              <span className="detail-infos--value">{movie.crew[0].name}</span>
            </div>
          )}
          <div className="detail-infos--item">
            <span className="detail-infos--name">Pays d'origine</span>
            <span className="detail-infos--value">{isoCountriesToFrench(movie.country)}</span>
          </div>
          <div className="detail-infos--item">
            <span className="detail-infos--name">Langue d'origine</span>
            <span className="detail-infos--value">{isoLanguageToFrench(movie.original_language)}</span>
          </div>
          <div className="detail-infos--item">
            <span className="detail-infos--name">Budget</span>
            <span className="detail-infos--value">{budgetToMillions(movie.budget)}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MovieInfos;
