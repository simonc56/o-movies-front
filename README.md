# O'Movies - front

![React][react-badge] ![Redux][redux-badge] ![Mantine][mantine-badge]

Site web, conçu en un mois, pour les passionnés de cinéma. Il permet de consulter les informations sur les films existants et à paraître, faire des recherches, commenter, noter et faire des listes personnalisées de films.

![image](https://raw.github.com/simonc56/o-movies-front/main/screenshot.png)

La partie back-end est disponible ici : https://github.com/simonc56/o-movies-back

Source de données : [TMDB](https://www.themoviedb.org/)

[react-badge]: https://img.shields.io/badge/React-18-20232A?logo=react&logoColor=61DAFB
[redux-badge]: https://img.shields.io/badge/Redux/toolkit-2.2-blue
[mantine-badge]: https://img.shields.io/badge/Mantine-7.11-yellow

## Fonctionnalités

- Recherche de films par titre
- Affichage des films actuellement/prochainement au cinéma
- Création de compte utilisateur
- Création de playlists personnalisées
- Donner une note aux films
- Donner son avis sur les films (écrire un commentaire)
- Trier et filtrer les films par genre, date, popularité,...
- Voir la moyenne des notes données par les autres utilisateurs du site

## Installation

Cloner le repo :

```
git clone git@github.com:simonc56/filmovies-front.git
```

Installer les dépendances (avec npm, yarn ou pnpm) :

```
pnpm install
```

Copier le `.env.exemple` en `.env` et modifier la variable d'environnement pour communiquer avec la [partie back-end](https://github.com/simonc56/filmovies-back) du site.

```
VITE_API_BASE_URL=http://localhost:3000/api
```

⚠️ Il faut garder le chemin `/api` dans cette url.

Puis build :

```
pnpm build
```

Le site est prêt dans le répertoire `/dist`
Vous pouvez le tester avec :

```
pnpm preview
```

## Technologies utilisée

- html / css > https://developer.mozilla.org/fr/docs/Web
- sass > https://sass-lang.com/documentation/
- react > https://fr.react.dev/reference/react
- react-icons > https://react-icons.github.io/react-icons/
- redux toolkit > https://redux-toolkit.js.org/
- mantine > https://mantine.dev/
- axios > https://axios-http.com/fr/docs/intro
- eslint > https://eslint.org/docs/latest/use/getting-started
