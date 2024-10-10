import { Button, Textarea } from '@mantine/core';
import { useState } from 'react';
import {
  useGetUserdataMovieByIdQuery,
  usePatchReviewMutation,
  usePostReviewMutation,
} from '../../../../features/moviesApiSlice';
import { useAppSelector } from '../../../../store/hooks';
import type { RootState } from '../../../../store/store';
import './NewReview.scss';

function NewReview({ tmdbId }: { tmdbId: number }) {
  const [newReview, setNewReview] = useState('');
  const { data: userData } = useGetUserdataMovieByIdQuery(tmdbId);
  const alreadyReviewed = userData?.review || undefined;
  const [reviewIsUpdated, setReviewIsUpdated] = useState(false);
  const [updateReview] = usePatchReviewMutation();
  const [postReview] = usePostReviewMutation();
  const { firstname } = useAppSelector((state: RootState) => state.settings.user);

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
      updateReview({ review: newReview, id: alreadyReviewed.review_id, tmdbId });
      setNewReview('');
      setReviewIsUpdated(false);
    } else {
      // call to api to post a new review
      postReview({ review: newReview, tmdbId, firstname });
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
