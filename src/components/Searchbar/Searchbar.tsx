import { ChangeEvent, useState } from 'react';
import './Searchbar.scss';

function Searchbar() {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <form className="searchbar-form">
      <input type="text" placeholder="Chercher un film..." value={inputValue} onChange={handleChange} />
    </form>
  );
}

export default Searchbar;
