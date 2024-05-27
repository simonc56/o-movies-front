import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { actionFetchOneMovie, actionResetCurrentMovie } from '../../features/moviesSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import Loader from '../Loader/Loader';
import MovieExtraInfos from '../MovieExtraInfos/MovieExtraInfos';
import MovieInfos from '../MovieInfos/MovieInfos';
import './MoviePage.scss';

function MoviePage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const movie = useAppSelector((state) => state.movies.currentMovie);

  useEffect(() => {
    if (id) {
      dispatch(actionResetCurrentMovie());
      dispatch(actionFetchOneMovie(id));
    }
  }, [id, dispatch]);

  return movie ? (
    <main className="movie-page">
      <MovieInfos movie={movie} />
      <MovieExtraInfos movie={movie} />
    </main>
  ) : (
    <Loader label="Chargement du film..." />
  );
}

export default MoviePage;
