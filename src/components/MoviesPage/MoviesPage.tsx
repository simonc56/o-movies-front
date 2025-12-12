import { Badge, Button, Card, Image, Text } from '@mantine/core';
import { useState } from 'react';
import { Link } from 'react-router';
import { MoviesFilter } from '../../@types/MovieState';
import no_poster from '../../assets/no-poster.webp';
import { useGetMoviesByFilterQuery, useGetMoviesDetailsQuery } from '../../features/moviesApiSlice';
import { useAppSelector } from '../../store/hooks';
import ButtonAddToPlaylist from '../ui/ButtonAddToPlaylist/ButtonAddToPlaylist';
import Loader from '../ui/Loader/Loader';
import classes from './ArticleCard.module.css';
import './MoviesPage.scss';

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

const truncateTextWithSlice = (text: string, maxLength: number) =>
  text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

function MoviesPage({ title, filter }: { title: string; filter: MoviesFilter }) {
  const { data: movieList } = useGetMoviesByFilterQuery(filter);
  const logged = useAppSelector((state) => state.settings.user.logged);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const { data: detailedMovies, isLoading } = useGetMoviesDetailsQuery(movieList || [], {
    skip: !movieList || movieList.length === 0,
  });

  const sortedMovieList = detailedMovies?.length
    ? detailedMovies.slice().sort((a, b) => {
        if (sortOrder === 'asc') {
          return new Date(a.release_date).getTime() - new Date(b.release_date).getTime();
        }
        return new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
      })
    : [];

  const toggleSortOrder = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
  };

  return isLoading ? (
    <div className={classes.loaderContainer}>
      <Loader />
    </div>
  ) : (
    <>
      <div className="header2">
        <h1 className="pageTitle2">{title}&nbsp;</h1>
        <Button onClick={toggleSortOrder} className={classes.sortButton} color="bg" autoContrast>
          Trier par date de sortie ({sortOrder === 'asc' ? 'Croissant' : 'Décroissant'})
        </Button>
      </div>
      <div className={classes.container1}>
        {sortedMovieList.map((movie) => (
          <div key={movie.tmdb_id} className={classes.cardContainer1}>
            <Card withBorder radius="md" className={classes.card1}>
              <Card.Section>
                <Link to={`/films/${movie.tmdb_id}`}>
                  <Image src={movie.poster_path ? movie.poster_path : no_poster} height={380} />
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
                  <ButtonAddToPlaylist
                    tmdbId={movie.tmdb_id}
                    // inPlaylists={movie.user_data ? movie.user_data.in_playlists : []}
                  />
                )}
              </div>
            </Card>
          </div>
        ))}
      </div>
    </>
  );
}

export default MoviesPage;
