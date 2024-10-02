import { SettingsState, UserType } from '../@types/SettingsState';

/**
 * Store the current logged user in localStorage
 * @param user UserType
 */
export function setStoreUser(user: UserType) {
  localStorage.setItem('user', JSON.stringify(user));
}

/**
 * Read and return the user stored in localStorage
 * @returns user UserType
 */
export function getStoreUser() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

/**
 * Remove the user stored in localStorage
 */
export function removeStoreUser() {
  localStorage.removeItem('user');
}

/**
 * Get the initial state of the settingsSlice from localStorage
 */
export const getInitialSettingsState = (): SettingsState => {
  const defaultSettingsState: SettingsState = {
    user: {
      firstname: '',
      lastname: '',
      email: '',
      birthdate: '',
      logged: false,
      token: '',
    },
    news: {
      rssFeedUrl: 'https://www.premiere.fr/rss/actu-cinema',
      quantity: 3, // number of rss news to display
      // forbidden words in news title
      forbiddenWords: ['bande-annonce', 'trailer', 'teaser', 'première', 'voici'],
      allNews: [], // all news fetched from rss feed url
    },
  };
  const user = getStoreUser();
  if (user) {
    defaultSettingsState.user = user;
  }
  return defaultSettingsState;
};
