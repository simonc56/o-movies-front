import { Autocomplete, Loader } from '@mantine/core';
import { useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { actionSearchMovies, resetMovieResultList } from '../../features/moviesSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { isoDateToYear } from '../../utils/utils';
import './Searchbar.scss';

function Searchbar({ onFound }: { onFound?: () => void }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [myTimeout, setMyTimeout] = useState<number>();
  const results = useAppSelector((state) => state.movies.movieResultList).slice(0, 7);
  // i add year in title to avoid duplicates
  const resultsWithYear = results.map((result) => {
    return { ...result, title_fr: `${result.title_fr} (${isoDateToYear(result.release_date)})` };
  });
  // dictionary of "title_fr: tmdb_id" to have tmdb_id when user click a result
  const moviesIds = resultsWithYear.reduce(
    (acc, result) => {
      acc[result.title_fr] = result.tmdb_id;
      return acc;
    },
    {} as { [key: string]: number }
  );
  // i use a set to remove duplicates (can occur even with year)
  const moviesTitle = [...new Set(resultsWithYear.map((result) => result.title_fr))];

  const handleChange = (value: string) => {
    if (value === '') {
      dispatch(resetMovieResultList());
    }
    if (moviesTitle.includes(value)) {
      // if input value correspond to one of the list, it means the user clicked a result
      setInputValue('');
      dispatch(resetMovieResultList());
      // action when user click a result, used to close drawer in mobile mode
      if (onFound) onFound();
      return navigate(`/films/${moviesIds[value]}`);
    }
    setInputValue(value);
    clearTimeout(myTimeout);
    if (value.length < 2) return;
    // no more than 1 request every 500ms
    setLoading(true);
    setMyTimeout(
      setTimeout(() => {
        dispatch(actionSearchMovies(value)).then(() => setLoading(false));
      }, 500)
    );
  };

  return (
    <div className="searchbar">
      <Autocomplete
        radius="xl"
        placeholder="Rechercher..."
        leftSection={<IoIosSearch />}
        // to be over the drawer
        comboboxProps={{ zIndex: 1000001 }}
        value={inputValue}
        onChange={handleChange}
        rightSection={loading && <Loader size={20} color="gray.6" />}
        onSubmit={(event) => event.preventDefault()}
        dropdownOpened={inputValue.length > 1}
        data={moviesTitle.length ? moviesTitle : ['Pas de résultats.']}
      />
    </div>
  );
}

export default Searchbar;
