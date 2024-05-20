import { Rating } from '@mantine/core';
import { useState } from 'react';

import './NewRating.scss';

function NewRating() {
  const [rating, setRating] = useState(0);

  const handleChange = (newRating: number) => {
    setRating(newRating);
  };

  return (
    <div className="user-rating-input">
      <span className="label">Donnez une note à ce film</span>
      <div>
        <Rating defaultValue={rating} value={rating} onChange={handleChange} size="lg" />
        <span>{rating}/5</span>
      </div>
    </div>
  );
}

export default NewRating;
