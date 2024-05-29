import { Paper } from '@mantine/core';
import PosterCarousel from '../PosterCarousel/PosterCarousel';

import './Homepage.scss';

function Homepage() {
  return (
    <div className="homepage">
      <Paper shadow="xl" p="md" className="intro">
        <h3>Bienvenue sur votre site dédié aux passionnés de cinéma !</h3>
        Découvrez les nouveautés, explorez les dernières critiques et plongez dans des analyses approfondies de vos
        films préférés.
      </Paper>
      <PosterCarousel />
    </div>
  );
}

export default Homepage;
