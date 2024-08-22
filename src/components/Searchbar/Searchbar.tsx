import { Autocomplete, Loader } from '@mantine/core';
import { useEffect, useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { MovieResultType } from '../../@types/MovieType';
import { useSearchMoviesQuery } from '../../features/moviesApiSlice';
import { isoDateToYear } from '../../utils/utils';
import './Searchbar.scss';

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

function Searchbar({ onFound }: { onFound?: () => void }) {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const debouncedSearchTerm = useDebounce(inputValue, 300);
  const {
    data: results,
    isSuccess,
    isFetching,
  } = useSearchMoviesQuery(debouncedSearchTerm, { skip: debouncedSearchTerm.length < 3 });
  // i add year in title to avoid duplicates
  let resultsWithYear: MovieResultType[] = [];
  if (isSuccess) {
    resultsWithYear = results.map((result) => ({
      ...result,
      title_fr: `${result.title_fr} (${isoDateToYear(result.release_date)})`,
    }));
  }
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
    if (moviesTitle.includes(value)) {
      // if input value correspond to one of the list, it means the user clicked a result
      setInputValue('');
      // action when user click a result, used to close drawer in mobile mode
      if (onFound) onFound();
      return navigate(`/films/${moviesIds[value]}`);
    }
    return setInputValue(value);
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
        rightSection={isFetching && <Loader size={20} color="gray.6" />}
        onSubmit={(event) => event.preventDefault()}
        dropdownOpened={inputValue.length > 1}
        data={moviesTitle.length ? moviesTitle : ['Pas de résultats.']}
      />
    </div>
  );
}

export default Searchbar;
