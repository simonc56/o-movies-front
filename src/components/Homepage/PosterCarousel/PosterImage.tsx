import { useState } from 'react';

function PosterImage({ title_fr, poster_path }: { title_fr: string; poster_path: string }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="poster-container">
      <div className={`poster-placeholder ${imageLoaded ? 'hidden' : ''}`} />
      <img
        width={230}
        src={poster_path}
        alt={`poster du film ${title_fr}`}
        title={title_fr}
        className={`poster-image ${imageLoaded ? 'loaded' : ''}`}
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageLoaded(false)}
      />
    </div>
  );
}

export default PosterImage;
