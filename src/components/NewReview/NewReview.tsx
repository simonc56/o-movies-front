import { Button, Textarea } from '@mantine/core';
import { useState } from 'react';
import { actionPostReview, actionUpdateReview } from '../../features/moviesSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

import './NewReview.scss';

function NewReview() {
  const [newReview, setNewReview] = useState('');
  const tmdbId = useAppSelector((state) => state.movies.currentMovie?.tmdb_id) || 0;
  const alreadyReviewed = useAppSelector((state) => state.movies.currentMovie?.user_data?.review) || undefined;
  const [reviewIsUpdated, setReviewIsUpdated] = useState(false);
  const dispatch = useAppDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewReview(event.target.value);
    if (alreadyReviewed && !reviewIsUpdated) {
      setReviewIsUpdated(true);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!tmdbId) {
      // eslint-disable-next-line no-console
      console.error('No tmdbId provided, impossible to post review');
      return;
    }
    if (alreadyReviewed && !reviewIsUpdated) {
      // no call to api, just set the new review in the state
      setNewReview(alreadyReviewed.content);
    } else if (alreadyReviewed) {
      // call to api to update user's review
      dispatch(actionUpdateReview({ review: newReview, id: alreadyReviewed.review_id }));
      setNewReview('');
      setReviewIsUpdated(false);
    } else {
      // call to api to post a new review
      dispatch(actionPostReview({ review: newReview, tmdbId }));
      setNewReview('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-review">
      <Textarea
        className="textarea-review"
        label="Mon commentaire"
        placeholder="Tapez votre commentaire ici..."
        value={alreadyReviewed && !reviewIsUpdated ? alreadyReviewed.content : newReview}
        onChange={handleChange}
        maxLength={1000}
        disabled={alreadyReviewed && !newReview}
      />
      <Button
        type="submit"
        autoContrast
        disabled={(!newReview && !alreadyReviewed) || (alreadyReviewed && !reviewIsUpdated && !!newReview)}
      >
        {!newReview ? 'Modifier' : 'Commenter'}
      </Button>
    </form>
  );
}

export default NewReview;
