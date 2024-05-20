import { FaCommentAlt } from 'react-icons/fa';
import { Review } from '../../@types/MovieType';

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
          <span>
            <FaCommentAlt />
          </span>
          <span>{review.content}</span>
        </div>
      ))}
      {reviews.length === 0 && <p>Aucun commentaire pour le moment</p>}
    </div>
  );
}

export default MovieReviews;
