import { Button, Checkbox, Menu } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { Genre } from '../../@types/MovieType';
import { useAppDispatch } from '../../store/hooks';

function ButtonCheckGenres({
  genresList,
  onGenresSelect,
}: {
  genresList: Genre[];
  onGenresSelect: (selectedGenres: number[]) => void;
}) {
  const dispatch = useAppDispatch();

  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);

  const handleCheckboxChange = (genreId: number) => {
    setSelectedGenres((prevSelectedGenres) => {
      if (prevSelectedGenres.includes(genreId)) {
        return prevSelectedGenres.filter((id) => id !== genreId);
      } else {
        return [...prevSelectedGenres, genreId];
      }
    });
  };

  useEffect(() => {
    onGenresSelect(selectedGenres);
  }, [selectedGenres, onGenresSelect]);

  return (
    <Menu
      transitionProps={{ transition: 'pop-top-right' }}
      position="bottom-end"
      width={220}
      disabled={genresList.length === 0}
      closeOnItemClick={false}
    >
      <Menu.Target>
        <Button
          rightSection={<IconChevronDown stroke={1.5} />}
          variant="outline"
          color="bg"
          data-disabled={genresList.length === 0}
        >
          Genres
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        {genresList.map((genre) => (
          <Menu.Item key={genre.id}>
            <Checkbox
              size="sm"
              color="bg"
              label={genre.name}
              checked={selectedGenres.includes(genre.id)}
              onChange={() => handleCheckboxChange(genre.id)}
            />
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}

export default ButtonCheckGenres;
