import { Button, Rating } from '@mantine/core';
import { useState } from 'react';
import { actionPostRating, actionUpdateRating } from '../../features/moviesSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

import './NewRating.scss';

function NewRating() {
  const [newRating, setNewRating] = useState(0);
  const tmdbId = useAppSelector((state) => state.movies.currentMovie?.tmdb_id) || 0;
  const alreadyRated = useAppSelector((state) => state.movies.currentMovie?.userData.rating);
  const [ratingIsUpdated, setRatingIsUpdated] = useState(false);
  const dispatch = useAppDispatch();

  const handleChange = (rating: number) => {
    setNewRating(rating);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!tmdbId) {
      // eslint-disable-next-line no-console
      console.error('No tmdbId provided, impossible to post rating');
      return;
    }
    if (alreadyRated && !ratingIsUpdated) {
      // no call to api, just set the new review in the state
      setNewRating(alreadyRated.value);
    } else if (alreadyRated) {
      // call to api to update user's review
      dispatch(actionUpdateRating({ rating: newRating, id: alreadyRated.rating_id }));
      setNewRating(0);
      setRatingIsUpdated(false);
    } else {
      // call to api to post a new review
      dispatch(actionPostRating({ rating: newRating, tmdbId }));
      setNewRating(0);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="user-rating-input">
      <span className="label">Ma note</span>
      <div>
        <Rating
          value={alreadyRated && !ratingIsUpdated ? alreadyRated.value : newRating}
          onChange={handleChange}
          size="lg"
          color="primary"
          fractions={2}
          aria-required
          readOnly={alreadyRated && !newRating}
        />
        <span className="rating-text">{newRating}/5</span>
        <Button
          type="submit"
          autoContrast
          disabled={(!newRating && !alreadyRated) || (alreadyRated && !ratingIsUpdated && !!newRating)}
        >
          {!newRating ? 'Modifier' : 'Noter'}
        </Button>
      </div>
    </form>
  );
}

export default NewRating;
