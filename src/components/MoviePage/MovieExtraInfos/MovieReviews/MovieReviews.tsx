import { FaCommentAlt } from 'react-icons/fa';
import { Review } from '../../../../@types/MovieType';
import { ReviewMetadata } from '../../../Homepage/LastReviews/Review';
import './MovieReviews.scss';

type MovieReviewsProps = {
  reviews: Review[];
};

function MovieReviews({ reviews }: MovieReviewsProps) {
  return (
    <div className="reviews">
      <h3>Commentaires utilisateurs</h3>
      {reviews.map((review: Review) => (
        <div className="review" key={review.review_id}>
          <div className="review__content">
            <FaCommentAlt />
            {review.content}
          </div>
          <ReviewMetadata firstname={review.user_firstname || ''} created_at={review.created_at || ''} />
        </div>
      ))}
      {reviews.length === 0 && <p>Aucun commentaire pour le moment.</p>}
    </div>
  );
}

export default MovieReviews;
