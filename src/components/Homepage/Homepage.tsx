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
      <h2>Actualités</h2>
      <Paper shadow="xl" p="md" className="news">
        <div className="header-news">
          <h3>Garfield le 17 juillet au cinéma, chat alors !</h3>
          <span>04/06/2024</span>
        </div>
        <a href="/films/748783">Garfield</a>, le célèbre chat d'intérieur, amateur de lasagnes et qui déteste les
        lundis, est sur le point d'être embarqué dans une folle aventure.
      </Paper>
      <Paper shadow="xl" p="md" className="news">
        <div className="header-news">
          <h3>Avatar 3 : les premières images</h3>
          <span>28/05/2024</span>
        </div>
        Les premières images de "<a href="/films/83533">Avatar 3</a>" ont été dévoilées, révélant des paysages
        sous-marins époustouflants. La sortie est prévue pour décembre 2025.
      </Paper>
      <Paper shadow="xl" p="md" className="news">
        <div className="header-news">
          <h3>Festival de Cannes 2024</h3>
          <span>26/05/2024</span>
        </div>
        Le Festival de Cannes 2024 a couronné "<a href="/films/1064213">Anora</a>", un drame poignant du réalisateur
        Sean Baker, qui a remporté la Palme d'Or cette année.
      </Paper>
      <Paper shadow="xl" p="md" className="news">
        <div className="header-news">
          <h3>Le prochain Spielberg</h3>
          <span>18/05/2024</span>
        </div>
        Steven Spielberg a annoncé qu'il réalisera un biopic sur la vie de Léonard de Vinci. Le casting reste encore un
        mystère, mais le projet suscite déjà beaucoup d'attentes.
      </Paper>
      <Paper shadow="xl" p="md" className="news">
        <div className="header-news">
          <h3>Retour à la SF pour Scarlett Johansson</h3>
          <span>01/06/2024</span>
        </div>
        Scarlett Johansson vient d'annoncer qu'elle jouera le rôle principal dans le prochain thriller de
        science-fiction "Starbreaker", réalisé par Denis Villeneuve.
      </Paper>
      <Paper shadow="xl" p="md" className="news">
        <div className="header-news">
          <h3>Sortie publique du site !</h3>
          <span>14/05/2024</span>
        </div>
        Ca y est ! Après de longues heures de préparation, nous avons le plaisir de vous annoncer que votre tout nouveau
        site O'movies est enfin en ligne. Venez découvrir les dernières actualités du monde du cinéma et partagez votre
        passion avec d'autres fans.
      </Paper>
    </div>
  );
}

export default Homepage;
