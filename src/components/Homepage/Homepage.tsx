import { Carousel } from '@mantine/carousel';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { actionFetchMovies } from '../../features/moviesSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import Loader from '../Loader/Loader';

import './Homepage.scss';

function Homepage() {
  const movieList = useAppSelector((state) => state.movies.movieList);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Fetch the list of popular movies
    // Needs to be updated to simpler url when api route is ready
    const params = {
      page: 1,
      sort_by: 'popularity.desc',
      with_release_type: '2|3',
    };
    dispatch(actionFetchMovies(params));
  }, [dispatch]);
  return movieList.length > 0 ? (
    <Carousel withIndicators slideSize={230} slideGap="10" height={350} loop className="carousel-homepage">
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

export default Homepage;
