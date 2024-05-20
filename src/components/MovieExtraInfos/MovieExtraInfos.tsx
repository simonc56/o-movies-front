import MovieType from '../../@types/MovieType';
import MovieCast from '../MovieCast/MovieCast';
import MovieReviews from '../MovieReviews/MovieReviews';
import NewReview from '../NewReview/NewReview';

type MovieExtraInfosProps = {
  movie: MovieType;
};

function MovieExtraInfos({ movie }: MovieExtraInfosProps) {
  return (
    <section className="section-extra-infos">
      <MovieCast cast={movie.cast} />
      <MovieReviews reviews={movie.reviews} />
      <NewReview />
      <br />
    </section>
  );
}

export default MovieExtraInfos;
