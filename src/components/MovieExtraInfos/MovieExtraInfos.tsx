import { Rating } from '@mantine/core';
import MovieType from '../../@types/MovieType';
import { useAppSelector } from '../../store/hooks';
import MovieCast from '../MovieCast/MovieCast';
import MovieReviews from '../MovieReviews/MovieReviews';
import NewRating from '../NewRating/NewRating';
import NewReview from '../NewReview/NewReview';

import { cleanRating } from '../../utils/utils';
import './MovieExtraInfos.scss';

type MovieExtraInfosProps = {
  movie: MovieType;
};

function MovieExtraInfos({ movie }: MovieExtraInfosProps) {
  const isLogged = useAppSelector((state) => state.settings.user.logged);

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
      {isLogged ? (
        <>
          <NewRating />
          <NewReview />
        </>
      ) : (
        <p>Connectez-vous pour pouvoir noter et commenter ce film.</p>
      )}
    </section>
  );
}

export default MovieExtraInfos;
