import { Paper } from '@mantine/core';
import { useGetLastReviewsQuery } from '../../../features/moviesApiSlice';
import './LastReviews.scss';
import Review from './Review';

export default function LastReviews() {
  const { data: lastReviews } = useGetLastReviewsQuery();
  return (
    <>
      <h3>Derniers avis</h3>
      <Paper shadow="xl" p="md" className="last-reviews">
        {lastReviews &&
          lastReviews.map((review) => (
            <Review
              key={review.id}
              tmdb_id={review.media.tmdb_id}
              title_fr={review.media.title_fr}
              content={review.content}
              firstname={review.user.firstname}
              created_at={review.created_at}
            />
          ))}
      </Paper>
    </>
  );
}
