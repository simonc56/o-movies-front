import { Carousel } from '@mantine/carousel';
import { Link } from 'react-router';
import no_poster from '../../../assets/no-poster.webp';
import { useGetMoviesByFilterQuery } from '../../../features/moviesApiSlice';
import './PosterCarousel.scss';
import PosterImage from './PosterImage';

// Empty list of movies to display while fetching the movieList
const emptyList = Array.from({ length: 10 }, (_, i) => ({ title_fr: '', poster_path: no_poster, tmdb_id: i + 1 }));

function PosterCarousel() {
  const { data: movieList } = useGetMoviesByFilterQuery('upcoming');

  const displayedList = movieList && movieList.length > 0 ? movieList : emptyList;

  return (
    <Carousel
      slideSize={230}
      slideGap="10"
      height={350}
      controlSize={38}
      emblaOptions={{ loop: true }}
      className="poster-carousel"
    >
      {displayedList.map((movie) => (
        <Carousel.Slide key={movie.tmdb_id}>
          <Link to={movie.title_fr.length ? `/films/${movie.tmdb_id}` : ''}>
            <PosterImage title_fr={movie.title_fr} poster_path={movie.poster_path} />
          </Link>
        </Carousel.Slide>
      ))}
    </Carousel>
  );
}

export default PosterCarousel;
