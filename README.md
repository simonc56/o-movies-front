# O'Movies - front

[![React][react-badge]](https://react.dev/) [![Redux][redux-badge]](https://redux-toolkit.js.org/) [![Mantine][mantine-badge]](https://mantine.dev/)

Site web, conçu en un mois, pour les passionnés de cinéma. Il permet de consulter les informations sur les films existants et à paraître, faire des recherches, commenter, noter et faire des listes personnalisées de films.

![image](https://raw.github.com/simonc56/o-movies-front/main/screenshot.png)

La partie back-end est disponible ici : https://github.com/simonc56/o-movies-back

Source de données : [TMDB](https://www.themoviedb.org/)

[react-badge]: https://img.shields.io/badge/React-18-20232A?logo=react&logoColor=61DAFB
[redux-badge]: https://img.shields.io/badge/Redux_Toolkit-593d88?logo=redux&logoColor=white
[mantine-badge]: https://img.shields.io/badge/Mantine-7.11-blue

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
