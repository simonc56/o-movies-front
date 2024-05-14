export function runtimeToString(runtime: number) {
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  const minutesString = minutes > 10 ? minutes : `0${minutes}`;
  return `${hours}h${minutesString}`;
}

export function budgetToMillions(budget: number) {
  return `${budget / 1000000}m$`;
}

export function isoDateToFrench(isoDate: string) {
  const date = new Date(isoDate);
  return `${date.getDate()} ${date.toLocaleDateString('fr-FR', { month: 'long' })} ${date.getFullYear()}`;
}
