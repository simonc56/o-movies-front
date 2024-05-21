import { Rating } from '@mantine/core';
import { useState } from 'react';
import { actionPostRating } from '../../features/moviesSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import SimpleButton from '../SimpleButton/SimpleButton';

import './NewRating.scss';

function NewRating() {
  const [rating, setRating] = useState(0);
  const tmdbId = useAppSelector((state) => state.movies.currentMovie?.tmdb_id);
  const id = useAppSelector((state) => state.movies.currentMovie?.id);
  const dispatch = useAppDispatch();

  const handleChange = (newRating: number) => {
    setRating(newRating);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!tmdbId || !id) {
      // eslint-disable-next-line no-console
      console.error('No tmdbId or id provided, impossible to post review');
      return;
    }
    dispatch(actionPostRating({ rating, tmdbId, id }));
  };

  return (
    <form onSubmit={handleSubmit} className="user-rating-input">
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
