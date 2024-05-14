import { FaCommentAlt, FaStar } from 'react-icons/fa';

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
        <div className="extra-infos">
          <div className="extra-infos--item">
            <div className="extra-infos--name">Date de sortie</div>
            <span className="extra-infos--value">12 mars 2024</span>
          </div>
          <div className="extra-infos--item">
            <span className="extra-infos--name">Réalisateur</span>
            <span className="extra-infos--value">Denis Villeneuve</span>
          </div>
          <div className="extra-infos--item">
            <span className="extra-infos--name">Pays d'origine</span>
            <span className="extra-infos--value">USA</span>
          </div>
          <div className="extra-infos--item">
            <span className="extra-infos--name">Langue d'origine</span>
            <span className="extra-infos--value">anglais</span>
          </div>
          <div className="extra-infos--item">
            <span className="extra-infos--name">Budget</span>
            <span className="extra-infos--value">70m$</span>
          </div>
        </div>
        <div className="reviews">
          <h3>Commentaires utilisateurs</h3>
          {movie.reviews.map((review: Review) => (
            <div className="review" key={review.id}>
              <span>
                <FaCommentAlt />
              </span>
              <span>{review.content}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MoviePage;
