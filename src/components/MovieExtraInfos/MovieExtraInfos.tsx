import { FaStar } from 'react-icons/fa';
import MovieType from '../../@types/MovieType';
import { useAppSelector } from '../../store/hooks';
import MovieCast from '../MovieCast/MovieCast';
import MovieReviews from '../MovieReviews/MovieReviews';
import NewRating from '../NewRating/NewRating';
import NewReview from '../NewReview/NewReview';

type MovieExtraInfosProps = {
  movie: MovieType;
};

function MovieExtraInfos({ movie }: MovieExtraInfosProps) {
  const isLogged = useAppSelector((state) => state.settings.user.logged);
  return (
    <section className="section-extra-infos">
      <MovieCast cast={movie.cast} />
      {movie.average_rating && (
        <div className="users-ratings">
          <h3>Note utilisateurs</h3>
          <span className="average-rating">
            <FaStar /> {movie.average_rating.toFixed(1)}
          </span>
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
