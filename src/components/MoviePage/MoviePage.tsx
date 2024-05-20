import { useEffect } from 'react';
import { FaCommentAlt, FaStar } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { Genre, Review } from '../../@types/MovieType';
import { actionFetchOneMovie } from '../../features/moviesSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { runtimeToString } from '../../utils/utils';
import Loader from '../Loader/Loader';
import './MoviePage.scss';

function MoviePage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const movie = useAppSelector((state) => state.movies.currentMovie);

  useEffect(() => {
    if (id) {
      dispatch(actionFetchOneMovie(id));
    }
  }, [id, dispatch]);

  return movie ? (
    <main className="movie-page">
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
          <div className="extra-infos">
            <div className="extra-infos--item">
              <div className="extra-infos--name">Date de sortie</div>
              <span className="extra-infos--value">{movie.frenchDate}</span>
            </div>
            <div className="extra-infos--item">
              <span className="extra-infos--name">Réalisateur</span>
              <span className="extra-infos--value">{movie.crew[0].name}</span>
            </div>
            <div className="extra-infos--item">
              <span className="extra-infos--name">Pays d'origine</span>
              <span className="extra-infos--value">{movie.country}</span>
            </div>
            <div className="extra-infos--item">
              <span className="extra-infos--name">Langue d'origine</span>
              <span className="extra-infos--value">{movie.original_language}</span>
            </div>
            <div className="extra-infos--item">
              <span className="extra-infos--name">Budget</span>
              <span className="extra-infos--value">{movie.budgetInMillions}</span>
            </div>
          </div>
        </div>
      </section>
      <section className="section-additional-infos">
        <div className="cast">
          {movie.cast.map((actor) => (
            <div className="actor" key={actor.id}>
              <img className="actor--picture" src={actor.profile_path} alt={actor.name} />
              <span className="actor--name">{actor.name}</span>
              <span className="actor--character">{actor.character}</span>
            </div>
          ))}
        </div>
        <div className="reviews">
          <h3>Commentaires utilisateurs</h3>
          {movie.reviews.map((review: Review) => (
            <div className="review" key={review.review_id}>
              <span>
                <FaCommentAlt />
              </span>
              <span>{review.content}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  ) : (
    <Loader label="Chargement du film..." />
  );
}

export default MoviePage;
