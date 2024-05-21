import { Actor } from '../../@types/MovieType';

import './MovieCast.scss';

type MovieCastProps = {
  cast: Actor[];
};

function MovieCast({ cast }: MovieCastProps) {
  return (
    <div className="cast">
      {cast.map((actor: Actor) => (
        <div className="actor" key={actor.id}>
          <img className="actor--picture" src={actor.profile_path} alt={actor.name} />
          <span className="actor--name">{actor.name}</span>
          <span className="actor--character">{actor.character}</span>
        </div>
      ))}
    </div>
  );
}

export default MovieCast;
