export default function runtimeToString(runtime: number) {
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  const minutes_string = minutes > 10 ? minutes : `0${minutes}`;
  return `${hours}h${minutes_string}`;
}
