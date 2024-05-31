import { UserType } from '../@types/SettingsState';

/**
 *
 * @param runtime integer - runtime of media in minutes
 * @returns string (format : 2h30)
 */
export function runtimeToString(runtime: number) {
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  const minutesString = minutes > 10 ? minutes : `0${minutes}`;
  return `${hours}h${minutesString}`;
}

/**
 *
 * @param budget integer - budget in $
 * @returns string - budget in millions $ (format : 100m$)
 */
export function budgetToMillions(budget: number) {
  return `${budget / 1000000}m$`;
}

/**
 *
 * @param isoDate format : "2021-08-04"
 * @returns string (format : 4 août 2021)
 */
export function isoDateToFrench(isoDate: string) {
  const date = new Date(isoDate);
  return `${date.getDate()} ${date.toLocaleDateString('fr-FR', { month: 'long' })} ${date.getFullYear()}`;
}

/**
 * Transform iso date to french readable date
 * @param isoDate format : "2021-08-04"
 * @returns string (format : 2021)
 */
export function isoDateToYear(isoDate: string) {
  const date = new Date(isoDate);
  return date.getFullYear();
}

/**
 * Check if a string contains a number
 * @param id string
 * @returns boolean
 */
export function isNumber(id: string): boolean {
  return !Number.isNaN(Number(id));
}

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
