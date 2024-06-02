import { SettingsState, UserType } from '../@types/SettingsState';
import * as api from '../api';

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
      password: '',
      birthdate: '',
      logged: false,
      token: '',
    },
    successMessage: null,
    errorMessage: null,
  };
  const user = getStoreUser();
  if (user) {
    defaultSettingsState.user = user;
    api.addTokenJWTToAxiosInstance(user.token);
  }
  return defaultSettingsState;
};
