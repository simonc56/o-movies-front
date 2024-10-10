import { Button, Paper } from '@mantine/core';
import { BsInstagram, BsTwitterX, BsYoutube } from 'react-icons/bs';
import { ImFacebook2 } from 'react-icons/im';
import './Homepage.scss';
import LastReviews from './LastReviews/LastReviews';
import NewsFeed from './NewsFeed/NewsFeed';
import PosterCarousel from './PosterCarousel/PosterCarousel';

function Homepage() {
  return (
    <div className="homepage">
      <div className="hero">
        <section className="hero__left">
          <Paper shadow="xl" p="md" className="intro">
            <h3>Bienvenue sur votre site dédié aux passionnés de cinéma !</h3>
            Découvrez les nouveautés, explorez les dernières critiques et plongez dans des analyses approfondies de vos
            films préférés. <br />
          </Paper>
        </section>
        <aside className="hero__right">
          <Paper shadow="xl" p="md" className="socials">
            <div className="socials__icons">
              <ImFacebook2 />
              <BsTwitterX />
              <BsInstagram />
              <BsYoutube />
            </div>
            <Button variant="outline" color="bg" size="md" className="newsletter__button">
              Newsletter
            </Button>
          </Paper>
        </aside>
      </div>

      <PosterCarousel />

      <main className="main">
        <section className="news">
          <h2>Actualités</h2>
          <NewsFeed />
        </section>
        <aside>
          <LastReviews />
        </aside>
      </main>
    </div>
  );
}

export default Homepage;
