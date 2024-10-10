import { Link } from 'react-router-dom';

const staticNews = [
  {
    guid: '1',
    title: 'Gladiator 2 : le retour de Maximus',
    pubDate: '2024-09-14',
    description: (
      <>
        Ridley Scott commence la promotion officielle de <Link to="/films/558449">Gladiator 2</Link> avec un deuxième
        trailer qui a été dévoilé cette semaine. Le film sortira en salle le 13 novembre 2024.
      </>
    ),
  },
  {
    guid: '2',
    title: 'La suite des Goonies ?',
    pubDate: '2024-08-28',
    description: (
      <>
        40 ans après, <Link to="/films/9340">Les Goonies</Link> pourraient faire leur grand retour avec le tournage
        d'une suite prévu à l'été 2025 et une sortie en 2026 ou 2027. Le casting sera entièrement renouvelé pour une
        nouvelle aventure.
      </>
    ),
  },
  {
    guid: '3',
    title: 'M-I 8 : Tom Cruise blessé sur le tournage',
    pubDate: '2024-08-17',
    description: (
      <>
        Tom Cruise s'est blessé lors du tournage de <Link to="/films/575265">Mission Impossible 8</Link>. Le tournage a
        été suspendu pour une durée indéterminée.
      </>
    ),
  },
  {
    guid: '4',
    title: 'Garfield le 17 juillet au cinéma, chat alors !',
    pubDate: '2024-06-04',
    description: (
      <>
        <Link to="/films/748783">Garfield</Link>, le célèbre chat d'intérieur, amateur de lasagnes et qui déteste les
        lundis, est sur le point d'être embarqué dans une folle aventure.
      </>
    ),
  },
  {
    guid: '5',
    title: 'Avatar 3 : les premières images',
    pubDate: '2024-05-28',
    description: (
      <>
        Les premières images de <Link to="/films/83533">Avatar 3</Link> ont été dévoilées, révélant des paysages
        sous-marins époustouflants. La sortie est prévue pour décembre 2025.
      </>
    ),
  },
  {
    guid: '6',
    title: 'Festival de Cannes 2024',
    pubDate: '2024-05-26',
    description: (
      <>
        Le Festival de Cannes 2024 a couronné <Link to="/films/1064213">Anora</Link>, un drame poignant du réalisateur
        Sean Baker, qui a remporté la Palme d'Or cette année.
      </>
    ),
  },
  {
    guid: '7',
    title: 'À couteaux tirés: 3ème volet',
    pubDate: '2024-05-22',
    description: (
      <>
        Le réalisateur Rian Johnson a annoncé le troisième volet de la saga de films d'enquêtes policières{' '}
        <Link to="/films/546554">À couteaux tirés</Link>. Le film sera intitulé{' '}
        <Link to="/films/812583">Wake Up, Dead Man</Link>.
      </>
    ),
  },
  {
    guid: '8',
    title: 'Le prochain Spielberg',
    pubDate: '2024-05-18',
    description: (
      <>
        Steven Spielberg a annoncé qu'il réalisera un biopic sur la vie de Léonard de Vinci. Le casting reste encore un
        mystère, mais le projet suscite déjà beaucoup d'attentes.
      </>
    ),
  },
  {
    guid: '9',
    title: '🎉 Sortie publique du site !',
    pubDate: '2024-05-14',
    description: (
      <>
        Ca y est ! Après de longues heures de préparation, nous avons le plaisir de vous annoncer que votre tout nouveau
        site O'movies est enfin en ligne. Venez découvrir les dernières actualités du monde du cinéma et partagez votre
        passion avec d'autres fans.
      </>
    ),
  },
];

export default staticNews;
