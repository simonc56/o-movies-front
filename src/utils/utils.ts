import countries_fr, { CountryKey } from '../enums/countries';
import languages_fr, { LanguageKey } from '../enums/languages';

/**
 * Transform runtime in minutes to runtime in hours and minutes
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
 * Transform budget in $ to budget in millions $
 * @param budget integer - budget in $
 * @returns string - budget in millions $ (format : 100m$)
 */
export function budgetToMillions(budget: number) {
  if (budget === 0) {
    return 'Inconnu';
  }
  return `${budget / 1000000} millions $`;
}

/**
 * Transform iso date to french readable date
 * @param isoDate format : "2021-08-04T12:00:00Z"
 * @returns string (format : 4 août 2021)
 */
export function isoDateToFrench(isoDate: string, long = false) {
  let cleanDate = isoDate;
  let time = '';
  if (isoDate.length > 10 && isoDate[10] === 'T') {
    cleanDate = isoDate.slice(0, 10);
    time = ` à ${isoDate.slice(11, 16)}`;
  }
  const date = new Date(cleanDate);
  return `${date.getDate()} ${date.toLocaleDateString('fr-FR', { month: long ? 'long' : 'short' })} ${date.getFullYear()}${time}`;
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
 * Transform iso language to french language
 * @param isoLanguage string : iso language code (ex : 'en')
 * @returns string : french language (ex : 'Anglais')
 */
export function isoLanguageToFrench(isoLanguage: string): string | undefined {
  return languages_fr[isoLanguage as LanguageKey] || isoLanguage;
}

/**
 * Transform iso country array to comma-separated french countries
 * @param isoCountry string[] : array of iso country codes (ex : ['US', 'FR'])
 * @returns string : comma-separated french countries (ex : 'États-Unis, France')
 */
export function isoCountriesToFrench(isoCountries: string[]): string {
  return isoCountries.map((countryCode) => countries_fr[countryCode as CountryKey] || countryCode).join(', ');
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
 * Prevent rating to have more than 1 decimal
 * @param rating number
 * @returns
 */
export function cleanRating(rating: number) {
  if (Number.isInteger(rating)) {
    return rating.toFixed(0);
  }
  return rating.toFixed(1);
}
