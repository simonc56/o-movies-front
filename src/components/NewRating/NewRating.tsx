import { Rating } from '@mantine/core';
import { useState } from 'react';

import SimpleButton from '../SimpleButton/SimpleButton';
import './NewRating.scss';

function NewRating() {
  const [rating, setRating] = useState(0);

  const handleChange = (newRating: number) => {
    setRating(newRating);
  };

  return (
    <form className="user-rating-input">
      <span className="label">Ma note</span>
      <div>
        <Rating value={rating} onChange={handleChange} size="lg" color="primary" fractions={2} aria-required />
        <span className="rating-text">{rating}/5</span>
        <SimpleButton label="Noter" type="submit" disabled={!rating} />
      </div>
    </form>
  );
}

export default NewRating;
