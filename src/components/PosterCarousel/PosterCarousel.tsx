import { Carousel } from '@mantine/carousel';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { actionFetchMovies } from '../../features/moviesSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import Loader from '../Loader/Loader';

import './PosterCarousel.scss';

function PosterCarousel() {
  const movieList = useAppSelector((state) => state.movies.movieList);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Fetch a list of recent movies
    dispatch(actionFetchMovies('upcoming'));
  }, [dispatch]);
  return movieList.length > 0 ? (
    <Carousel slideSize={230} slideGap="10" height={350} loop controlSize={38} className="poster-carousel">
      {movieList.map((movie) => (
        <Carousel.Slide key={movie.tmdb_id}>
          <Link to={`/films/${movie.tmdb_id}`}>
            <img src={movie.poster_path} alt={`poster du film ${movie.title_fr}`} />
          </Link>
        </Carousel.Slide>
      ))}
    </Carousel>
  ) : (
    <Loader />
  );
}

export default PosterCarousel;
