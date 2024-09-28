import { Button, Paper } from '@mantine/core';
import { BsInstagram, BsTwitterX, BsYoutube } from 'react-icons/bs';
import { ImFacebook2 } from 'react-icons/im';
import { Link } from 'react-router-dom';
import LastReviews from '../LastReviews/LastReviews';
import NewsFeed from '../NewsFeed/NewsFeed';
import PosterCarousel from '../PosterCarousel/PosterCarousel';
import './Homepage.scss';

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
          <Paper shadow="xl" p="md" className="news">
            <div className="header-news">
              <h3>Gladiator 2 : le retour de Maximus</h3>
              <span>14 septembre 2024</span>
            </div>
            Ridley Scott commence la promotion officielle de "<Link to="/films/558449">Gladiator 2</Link>" avec un
            deuxième trailer qui a été dévoilé cette semaine. Le film sortira en salle le 13 novembre 2024.
          </Paper>
          <Paper shadow="xl" p="md" className="news">
            <div className="header-news">
              <h3>La suite des Goonies ?</h3>
              <span>28 août 2024</span>
            </div>
            40 ans après, "<Link to="/films/9340">les Goonies</Link>" pourraient faire leur grand retour avec le
            tournage d'une suite prévu à l'été 2025 et une sortie en 2026 ou 2027. Le casting sera entièrement renouvelé
            pour une nouvelle aventure.
          </Paper>
          <Paper shadow="xl" p="md" className="news">
            <div className="header-news">
              <h3>M-I 8 : Tom Cruise blessé sur le tournage</h3>
              <span>17 août 2024</span>
            </div>
            Tom Cruise s'est blessé lors du tournage de "<Link to="/films/575265">Mission Impossible 8</Link>". Le
            tournage a été suspendu pour une durée indéterminée.
          </Paper>
          <Paper shadow="xl" p="md" className="news">
            <div className="header-news">
              <h3>Garfield le 17 juillet au cinéma, chat alors !</h3>
              <span>4 juin 2024</span>
            </div>
            <Link to="/films/748783">Garfield</Link>, le célèbre chat d'intérieur, amateur de lasagnes et qui déteste
            les lundis, est sur le point d'être embarqué dans une folle aventure.
          </Paper>
          <Paper shadow="xl" p="md" className="news">
            <div className="header-news">
              <h3>Avatar 3 : les premières images</h3>
              <span>28 mai 2024</span>
            </div>
            Les premières images de "<Link to="/films/83533">Avatar 3</Link>" ont été dévoilées, révélant des paysages
            sous-marins époustouflants. La sortie est prévue pour décembre 2025.
          </Paper>
          <Paper shadow="xl" p="md" className="news">
            <div className="header-news">
              <h3>Festival de Cannes 2024</h3>
              <span>26 mai 2024</span>
            </div>
            Le Festival de Cannes 2024 a couronné "<Link to="/films/1064213">Anora</Link>", un drame poignant du
            réalisateur Sean Baker, qui a remporté la Palme d'Or cette année.
          </Paper>
          <Paper shadow="xl" p="md" className="news">
            <div className="header-news">
              <h3>À couteaux tirés: 3ème volet</h3>
              <span>22 mai 2024</span>
            </div>
            Le réalisateur Rian Johnson a annoncé le troisième volet de la saga de films d'enquêtes policières "
            <Link to="/films/546554">À couteaux tirés</Link>" qui sera intitulé "Wake Up, Dead Man".
          </Paper>
          <Paper shadow="xl" p="md" className="news">
            <div className="header-news">
              <h3>Le prochain Spielberg</h3>
              <span>18 mai 2024</span>
            </div>
            Steven Spielberg a annoncé qu'il réalisera un biopic sur la vie de Léonard de Vinci. Le casting reste encore
            un mystère, mais le projet suscite déjà beaucoup d'attentes.
          </Paper>
          <Paper shadow="xl" p="md" className="news">
            <div className="header-news">
              <h3>🎉 Sortie publique du site !</h3>
              <span>14 mai 2024</span>
            </div>
            Ca y est ! Après de longues heures de préparation, nous avons le plaisir de vous annoncer que votre tout
            nouveau site O'movies est enfin en ligne. Venez découvrir les dernières actualités du monde du cinéma et
            partagez votre passion avec d'autres fans.
          </Paper>
        </section>
        <aside>
          <LastReviews />
        </aside>
      </main>
    </div>
  );
}

export default Homepage;
