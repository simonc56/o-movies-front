import { Button, Rating } from '@mantine/core';
import { useState } from 'react';
import { actionPostRating } from '../../features/moviesSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

import './NewRating.scss';

function NewRating() {
  const [rating, setRating] = useState(0);
  const tmdbId = useAppSelector((state) => state.movies.currentMovie?.tmdb_id) || 0;
  const dispatch = useAppDispatch();

  const handleChange = (newRating: number) => {
    setRating(newRating);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!tmdbId) {
      // eslint-disable-next-line no-console
      console.error('No tmdbId provided, impossible to post rating');
      return;
    }
    dispatch(actionPostRating({ rating, tmdbId }));
  };

  return (
    <form onSubmit={handleSubmit} className="user-rating-input">
      <span className="label">Ma note</span>
      <div>
        <Rating value={rating} onChange={handleChange} size="lg" color="primary" fractions={2} aria-required />
        <span className="rating-text">{rating}/5</span>
        <Button type="submit" autoContrast disabled={!rating}>
          Noter
        </Button>
      </div>
    </form>
  );
}

export default NewRating;
