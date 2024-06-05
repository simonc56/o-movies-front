import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { actionFetchMovies } from '../../features/moviesSlice';
import { Card, Image, Text, Badge, Group, Button } from '@mantine/core';
import { Link } from 'react-router-dom';
import ButtonAddToFavorites from '../ButtonAddToPlaylist/ButtonAddToPlaylist';
import MovieType from '../../@types/MovieType';
import classes from './ArticleCard.module.css';
import './UpcomingMoviesPage.scss';
import { getMovieById } from '../../api';
import Loader from '../Loader/Loader';

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const truncateTextWithSlice = (text: string, maxLength: number) => {
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
};

function UpcomingMoviesPage() {
  const dispatch = useAppDispatch();
  const movieList = useAppSelector((state) => state.movies.movieList as MovieType[]);
  const logged = useAppSelector((state) => state.settings.user.logged);
  const [detailedMovies, setDetailedMovies] = useState<MovieType[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    dispatch(actionFetchMovies('upcoming'));
  }, [dispatch]);

  useEffect(() => {
    async function fetchDetails() {
      const detailedList = [];
      for (const movie of movieList) {
        try {
          const response = await getMovieById(movie.tmdb_id.toString());
          detailedList.push({ ...movie, ...response.data.data });
          await sleep(0); //desactive for the moment. limit rate back up to 300
        } catch (error) {         
        }
      }
      setDetailedMovies(detailedList);
      setLoading(false);
    }
    if (movieList.length > 0) {
      fetchDetails();
    }
  }, [movieList]);

  useEffect(() => {
    console.log(detailedMovies);
    detailedMovies.forEach((movie, index) => {     
    });
  }, [detailedMovies]);

  const sortedMovieList = detailedMovies.slice().sort((a, b) => {
    if (sortOrder === 'asc') {
      return new Date(a.release_date).getTime() - new Date(b.release_date).getTime();
    }
    return new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
  });

  const toggleSortOrder = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
  };

  return (
    <>
      <div className="header2">
        <h1 className="pageTitle2">Prochaines sorties&nbsp;</h1>
        <Button onClick={toggleSortOrder} className={classes.sortButton} color="bg" autoContrast>
          Trier par date de sortie ({sortOrder === 'asc' ? 'Croissant' : 'Décroissant'})
        </Button>
      </div>
      {loading ? (
        <div className={classes.loaderContainer}>
          <Loader />
        </div>
      ) : (
        <div className={classes.container1}>
          {sortedMovieList.map((movie, index) => (
            <div key={index} className={classes.cardContainer1}>
              <Card withBorder radius="md" className={classes.card1}>
                <Card.Section>
                  <Link to={`/films/${movie.tmdb_id}`}>
                    <Image src={movie.poster_path} height={380} />
                  </Link>
                </Card.Section>

                <Badge className={classes.rating1} variant="gradient" gradient={{ from: 'blue', to: 'black' }}>
                  Sortie le &nbsp;{formatDate(movie.release_date)}
                </Badge>

                <Text className={classes.articleTitle1} fw={500} component={Link} to={`/films/${movie.tmdb_id}`}>
                  {movie.title_fr}
                </Text>

                <Text fz="sm" c="dimmed">
                  {truncateTextWithSlice(movie.overview || 'Synopsis non disponible', 350)}{' '}
                </Text>

                <div className={classes.footer1}>
                  {logged && (
                    <ButtonAddToFavorites
                      tmdbId={movie.tmdb_id}
                      inPlaylists={movie.user_data ? movie.user_data.in_playlists : []}
                    />
                  )}
                </div>
              </Card>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default UpcomingMoviesPage;
