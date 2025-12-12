import { Button, Card, Center, Group, Loader, Text, rem, useMantineTheme } from '@mantine/core';
import { IconEye, IconMessageCircle } from '@tabler/icons-react';
import { useState } from 'react';
import { Link } from 'react-router';
import { ParamsType } from '../../@types/MovieState';
import { Genre } from '../../@types/MovieType';
import no_poster from '../../assets/no-poster.webp';
import { useGetGenresQuery, useGetMoviesByParamsQuery } from '../../features/moviesApiSlice';
import ButtonCheckGenres from './ButtonChoiceGenres/ButtonChoiceGenres';
import InputPageMovies from './InputMoviesPage/InputMoviesPage';
import InputSortByPageMovies from './InputSortByMoviesPage/InputSorByMoviesPage';
import classes from './MovieList.module.scss';

export default function MovieList() {
  const theme = useMantineTheme();
  const [page, setPage] = useState<number>(1);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState<string>('popularity.desc');
  const params: ParamsType = {
    page,
    sort_by: sortBy,
    with_genres: selectedGenres.join(','),
  };
  const {
    data: genres,
    isLoading: genresAreLoading,
    isSuccess: genresSuccess,
    isError: genresError,
  } = useGetGenresQuery();
  const {
    data: movies,
    isLoading: moviesAreLoading,
    isError: moviesError,
  } = useGetMoviesByParamsQuery(params, { skip: !genresSuccess });

  const handleGenresSelect = (genresList: number[]) => {
    setSelectedGenres(genresList);
  };

  if (genresAreLoading || moviesAreLoading || !genres || !movies) {
    return (
      <Center>
        <Loader />
      </Center>
    );
  }

  if (genresError || moviesError) {
    return (
      <Center>
        <div>
          <Text c="red">Une erreur s'est produite lors du chargement des films.</Text>
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
        {movies.map((movie) => (
          <Card
            key={movie.tmdb_id}
            p="lg"
            shadow="lg"
            className={classes.card}
            radius="md"
            component={Link}
            to={`/films/${movie.tmdb_id}`}
          >
            <div
              className={classes.image}
              style={{ backgroundImage: `url(${movie.poster_path ? movie.poster_path : no_poster})` }}
            />
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
                  {movie.genres ? movie.genres?.map((genre: Genre) => genre.name).join(', ') : ''}
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
