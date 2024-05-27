import { Button, Textarea } from '@mantine/core';
import { useState } from 'react';
import { actionPostReview } from '../../features/moviesSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

import './NewReview.scss';

function NewReview() {
  const [review, setReview] = useState('');
  const tmdbId = useAppSelector((state) => state.movies.currentMovie?.tmdb_id) || 0;
  const dispatch = useAppDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReview(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!tmdbId) {
      // eslint-disable-next-line no-console
      console.error('No tmdbId provided, impossible to post review');
      return;
    }
    dispatch(actionPostReview({ review, tmdbId }));
    setReview('');
  };

  return (
    <form onSubmit={handleSubmit} className="form-review">
      <Textarea
        className="textarea-review"
        label="Mon commentaire"
        placeholder="Tapez votre commentaire ici..."
        value={review}
        onChange={handleChange}
        maxLength={1000}
      />
      <Button type="submit" autoContrast disabled={!review}>
        Commenter
      </Button>
    </form>
  );
}

export default NewReview;
