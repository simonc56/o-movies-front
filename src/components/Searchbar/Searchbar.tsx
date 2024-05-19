import { ChangeEvent, useState } from 'react';
import './Searchbar.scss';

function Searchbar() {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <form className="searchbar-form">
      <input type="text" placeholder="Rechercher..." value={inputValue} onChange={handleChange} />
    </form>
  );
}

export default Searchbar;
