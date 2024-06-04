import React from 'react';
import './AlphabeticalList.scss';

interface AlphabeticalListProps {
  activeLetter: string;
}

const normalizeString = (str: string) => {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();
};

const AlphabeticalList: React.FC<AlphabeticalListProps> = ({ activeLetter }) => {
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
};

export default AlphabeticalList;
