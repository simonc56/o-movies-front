import { useParams } from 'react-router';
import Loader from '../ui/Loader/Loader';
import MovieExtraInfos from './MovieExtraInfos/MovieExtraInfos';
import MovieInfos from './MovieInfos/MovieInfos';

import { useGetMovieByIdQuery } from '../../features/moviesApiSlice';
import './MoviePage.scss';

function MoviePage() {
  const { id = 0 } = useParams<{ id: string }>();
  const { data: movie, isLoading, isFetching } = useGetMovieByIdQuery(id);

  return movie && !isLoading && !isFetching ? (
    <main className="movie-page">
      <MovieInfos movie={movie} />
      <MovieExtraInfos movie={movie} />
    </main>
  ) : (
    <Loader label="Chargement du film..." />
  );
}

export default MoviePage;
