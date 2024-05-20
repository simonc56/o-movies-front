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
      <MovieReviews reviews={movie.reviews} />
      {isLogged && (
        <>
          <NewRating />
          <NewReview />
        </>
      )}
    </section>
  );
}

export default MovieExtraInfos;
