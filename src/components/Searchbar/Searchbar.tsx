import { TextInput } from '@mantine/core';
import { ChangeEvent, useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import './Searchbar.scss';

function Searchbar() {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <form className="searchbar-form">
      <TextInput
        radius="xl"
        size="sm"
        placeholder="Rechercher..."
        leftSection={<IoIosSearch />}
        value={inputValue}
        onChange={handleChange}
      />
    </form>
  );
}

export default Searchbar;
