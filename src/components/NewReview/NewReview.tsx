import { Textarea } from '@mantine/core';
import { useState } from 'react';

function NewReview() {
  const [review, setReview] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReview(event.target.value);
  };

  return (
    <Textarea
      label="Donnez votre avis sur ce film"
      placeholder="Tapez votre commentaire ici..."
      value={review}
      onChange={handleChange}
    />
  );
}

export default NewReview;
