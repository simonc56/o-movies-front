import './AlphabeticalList.scss';

interface AlphabeticalListProps {
  activeLetter: string;
}

const normalizeString = (str: string) =>
  str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase();

export default function AlphabeticalList({ activeLetter }: AlphabeticalListProps) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <div className="alphabet-nav-vertical">
      {alphabet.map((letter) => (
        <a
          key={letter}
          href={`#${normalizeString(letter)}`}
          className={`alphabet-link ${normalizeString(activeLetter) === normalizeString(letter) ? 'active' : ''}`}
        >
          {letter}
        </a>
      ))}
    </div>
  );
}
