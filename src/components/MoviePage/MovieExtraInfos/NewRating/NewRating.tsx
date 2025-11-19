import { Button, Rating } from '@mantine/core';
import { useState } from 'react';
import {
  useGetUserdataMovieByIdQuery,
  usePatchRatingMutation,
  usePostRatingMutation,
} from '../../../../features/moviesApiSlice';
import './NewRating.scss';

function NewRating({ tmdbId }: { tmdbId: number }) {
  const [newRating, setNewRating] = useState(0);
  const { data: userData } = useGetUserdataMovieByIdQuery(tmdbId);
  const alreadyRated = userData?.rating || undefined;
  const [ratingIsUpdated, setRatingIsUpdated] = useState(false);
  const [updateRating] = usePatchRatingMutation();
  const [postRating] = usePostRatingMutation();

  const handleChange = (rating: number) => {
    setNewRating(rating);
    if (alreadyRated && !ratingIsUpdated) {
      setRatingIsUpdated(true);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!tmdbId) {
      console.error('No tmdbId provided, impossible to post rating');
      return;
    }
    if (alreadyRated && !ratingIsUpdated) {
      // no call to api, just set the new review in the state
      setNewRating(alreadyRated.value);
    } else if (alreadyRated) {
      // call to api to update user's review
      updateRating({ rating: newRating, id: alreadyRated.rating_id, tmdbId });
      setNewRating(0);
      setRatingIsUpdated(false);
    } else {
      // call to api to post a new review
      postRating({ rating: newRating, tmdbId });
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
          color={alreadyRated && !newRating ? 'gray.5' : 'primary'}
          fractions={2}
          aria-required
          readOnly={alreadyRated && !newRating}
        />
        <span className="rating-text">{alreadyRated && !ratingIsUpdated ? alreadyRated.value : newRating}/5</span>
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
