import { Paper } from '@mantine/core';
import PosterCarousel from '../PosterCarousel/PosterCarousel';

import { Link } from 'react-router-dom';
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
      <h2>Actualités</h2>
      <Paper shadow="xl" p="md" className="news">
        <div className="header-news">
          <h3>Garfield le 17 juillet au cinéma, chat alors !</h3>
          <span>4 juin 2024</span>
        </div>
        <Link to="/films/748783">Garfield</Link>, le célèbre chat d'intérieur, amateur de lasagnes et qui déteste les
        lundis, est sur le point d'être embarqué dans une folle aventure.
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
        Le Festival de Cannes 2024 a couronné "<Link to="/films/1064213">Anora</Link>", un drame poignant du réalisateur
        Sean Baker, qui a remporté la Palme d'Or cette année.
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
        Steven Spielberg a annoncé qu'il réalisera un biopic sur la vie de Léonard de Vinci. Le casting reste encore un
        mystère, mais le projet suscite déjà beaucoup d'attentes.
      </Paper>
      <Paper shadow="xl" p="md" className="news">
        <div className="header-news">
          <h3>🎉 Sortie publique du site !</h3>
          <span>14 mai 2024</span>
        </div>
        Ca y est ! Après de longues heures de préparation, nous avons le plaisir de vous annoncer que votre tout nouveau
        site O'movies est enfin en ligne. Venez découvrir les dernières actualités du monde du cinéma et partagez votre
        passion avec d'autres fans.
      </Paper>
    </div>
  );
}

export default Homepage;
