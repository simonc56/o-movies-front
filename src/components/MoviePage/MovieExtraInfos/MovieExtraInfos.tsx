import { Rating } from '@mantine/core';
import { Link } from 'react-router-dom';
import MovieType from '../../../@types/MovieType';
import { useAppSelector } from '../../../store/hooks';
import { cleanRating } from '../../../utils/utils';
import MovieCast from '../MovieCast/MovieCast';
import './MovieExtraInfos.scss';
import MovieReviews from './MovieReviews/MovieReviews';
import NewRating from './NewRating/NewRating';
import NewReview from './NewReview/NewReview';

type MovieExtraInfosProps = {
  movie: MovieType;
};

function MovieExtraInfos({ movie }: MovieExtraInfosProps) {
  const user = useAppSelector((state) => state.settings.user);

  return (
    <section className="section-extra-infos">
      <MovieCast cast={movie.cast} />
      {movie.average_rating && (
        <div>
          <h3>Note utilisateurs</h3>
          <div className="users-ratings">
            <Rating value={movie.average_rating} size="lg" color="primary" readOnly fractions={10} aria-required />
            <span className="rating-text">{cleanRating(movie.average_rating)}/5</span>
          </div>
        </div>
      )}
      <MovieReviews reviews={movie.reviews} />
      {user.logged ? (
        <>
          <NewRating tmdbId={movie.tmdb_id} />
          <NewReview tmdbId={movie.tmdb_id} />
        </>
      ) : (
        <p>
          <Link to="/connexion" style={{ textDecoration: 'None' }}>
            Connectez-vous
          </Link>{' '}
          pour pouvoir noter et commenter ce film.
        </p>
      )}
    </section>
  );
}

export default MovieExtraInfos;
