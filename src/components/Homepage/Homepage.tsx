import { Paper } from '@mantine/core';
import { useEffect } from 'react';
import { BsInstagram, BsTwitterX, BsYoutube } from 'react-icons/bs';
import { ImFacebook2 } from 'react-icons/im';
import { moviesApiSlice } from '../../features/moviesApiSlice';
import './Homepage.scss';
import LastReviews from './LastReviews/LastReviews';
import NewsFeed from './NewsFeed/NewsFeed';
import NewsletterSubscribeButton from './NewsletterSubscribeButton/NewsletterSubscribeButton';
import PosterCarousel from './PosterCarousel/PosterCarousel';

function Homepage() {
  const prefetchMovies = moviesApiSlice.usePrefetch('getMoviesByFilter');
  const prefetchMovieList = moviesApiSlice.usePrefetch('getMoviesByParams');

  useEffect(() => {
    prefetchMovies('nowplaying');
    prefetchMovieList({ page: 1, sort_by: 'popularity.desc', with_genres: '' });
  }, [prefetchMovies, prefetchMovieList]);

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
            <NewsletterSubscribeButton />
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
