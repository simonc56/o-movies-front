import { Button, Card, Center, Group, Loader, Text, rem, useMantineTheme } from '@mantine/core';
import { IconEye, IconMessageCircle } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ParamsType } from '../../@types/MovieState';
import MovieType, { Genre } from '../../@types/MovieType';
import { getGenres, getMoviesByParams } from '../../api';
import ButtonCheckGenres from '../ButtonChoiceGenres/ButtonChoiceGenres';
import InputPageMovies from '../InputMoviesPage/InputMoviesPage';
import InputSortByPageMovies from '../InputSortByMoviesPage/InputSorByMoviesPage';
import classes from '../MovieList/MovieList.module.scss';

export function MovieList() {
  const theme = useMantineTheme();
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [page, setPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>('popularity.desc');

  const handleGenresSelect = (selectedGenres: number[]) => {
    setSelectedGenres(selectedGenres);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const genreResponse = await getGenres();
        const genresData = genreResponse.data.data;
        setGenres(genresData);
        const params: ParamsType = {
          page: page,
          sort_by: sortBy,
          with_genres: selectedGenres.join(','),
        };
        const response = await getMoviesByParams(params);
        setMovies(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setError("Une erreur s'est produite lors du chargement des films.");
        setLoading(false);
      }
    }
    fetchData();
  }, [selectedGenres, page, sortBy]);

  if (loading) {
    return (
      <Center>
        <Loader />
      </Center>
    );
  }

  if (error) {
    return (
      <Center>
        <div>
          <Text color="red">{error}</Text>
          <Button onClick={() => window.location.reload()}>Réessayer</Button>
        </div>
      </Center>
    );
  }

  return (
    <div>
      <div className={classes.inputContainer}>
        <InputPageMovies onPageChange={setPage} value={page} />
        <ButtonCheckGenres genresList={genres} onGenresSelect={handleGenresSelect} />
        <InputSortByPageMovies onPageChange={setSortBy} value={sortBy} />
      </div>
      <div className={classes.cardContainer}>
        {movies.map((movie, index) => (
          <Card
            key={index}
            p="lg"
            shadow="lg"
            className={classes.card}
            radius="md"
            component={Link}
            to={`/films/${movie.tmdb_id}`}
          >
            <div className={classes.image} style={{ backgroundImage: `url(${movie.poster_path})` }} />
            <div className={classes.overlay} />

            <div className={classes.content}>
              <div>
                <Text size="lg" className={classes.title} fw={500} c="white">
                  {movie.title_fr}
                </Text>
                <Text size="sm" className={classes.year} c="white">
                  {new Date(movie.release_date).getFullYear() || ''}
                </Text>
                <Text size="sm" className={classes.genres} c="white">
                  {movie.genres.map((genre: Genre) => genre.name).join(', ')}
                </Text>

                <Group justify="space-between" gap="xs">
                  <Text size="sm" className={classes.author}>
                    {movie.director}
                  </Text>
                  <Group gap="lg">
                    <Center>
                      <IconEye style={{ width: rem(16), height: rem(16) }} stroke={1.5} color={theme.colors.dark[2]} />
                      <Text size="sm" className={classes.bodyText}>
                        {movie.overview}
                      </Text>
                    </Center>
                    <Center>
                      <IconMessageCircle
                        style={{ width: rem(16), height: rem(16) }}
                        stroke={1.5}
                        color={theme.colors.dark[2]}
                      />
                      <Text size="sm" className={classes.bodyText}>
                        {movie.rating}
                      </Text>
                    </Center>
                  </Group>
                </Group>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default MovieList;
