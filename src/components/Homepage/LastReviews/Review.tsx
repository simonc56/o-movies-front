import { FaCommentAlt } from 'react-icons/fa';
import { MdMovie } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { isoDateToFrench } from '../../../utils/utils';
import './Review.scss';

type ReviewProps = {
  tmdb_id: number;
  title_fr: string;
  content: string;
  firstname: string;
  created_at: string;
};

export function ReviewMetadata({ firstname, created_at }: { firstname: string; created_at: string }) {
  return (
    <div className="review__metadata">
      {firstname && <span className="review__author">{firstname}</span>}
      {firstname && created_at && ', '}
      {created_at && <span className="review__date">le {isoDateToFrench(created_at)}</span>}
    </div>
  );
}

export default function Review({ tmdb_id, title_fr, content, firstname, created_at }: ReviewProps) {
  return (
    <div className="review">
      <Link to={`/films/${tmdb_id}`} className="review__title">
        <MdMovie />
        {title_fr}
      </Link>
      <div className="review__content">
        <FaCommentAlt />
        {content}
      </div>
      <ReviewMetadata firstname={firstname} created_at={created_at} />
    </div>
  );
}
