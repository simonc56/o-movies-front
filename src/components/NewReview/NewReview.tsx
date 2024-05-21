import { Textarea } from '@mantine/core';
import { useState } from 'react';
import { actionPostReview } from '../../features/moviesSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import SimpleButton from '../SimpleButton/SimpleButton';

import './NewReview.scss';

function NewReview() {
  const [review, setReview] = useState('');
  const tmdbId = useAppSelector((state) => state.movies.currentMovie?.tmdb_id);
  const id = useAppSelector((state) => state.movies.currentMovie?.id);
  const dispatch = useAppDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReview(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // eslint-disable-next-line no-console
    console.log(review);
    if (!tmdbId) {
      // eslint-disable-next-line no-console
      console.error('No tmdbId provided, impossible to post review');
      return;
    }
    dispatch(actionPostReview({ review, tmdbId, id }));
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
      />
      <SimpleButton type="submit" label="Commenter" disabled={!review} />
    </form>
  );
}

export default NewReview;
