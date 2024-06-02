import React, { useEffect, useState, useRef } from 'react';
import { TextInput, Text, Group, Button, Modal } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { openConfirmModal, ModalsProvider } from '@mantine/modals';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import NavbarSearch from './NavbarSearch';
import AlphabeticalList from '../AlphabeticalListNav/AlphabeticalList';
import moviesData, { Movie } from './moviesData';
import './PlaylistPage.scss';

interface Playlist {
  emoji: string;
  label: string;
  movies?: Movie[];
}
//example playlist
const initialPlaylists: Playlist[] = [
  { emoji: '👌', label: 'Déjà regardé', movies: moviesData },
  { emoji: '🎥', label: 'A voir' },
  { emoji: '💖', label: 'Coup de coeur' },
];

const PlaylistPage: React.FC = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>(initialPlaylists);
  const [opened, setOpened] = useState(false);
  const [newLabel, setNewLabel] = useState('');
  const [newEmoji, setNewEmoji] = useState('🆕');
  const [editingLabel, setEditingLabel] = useState<null | string>(null);
  const [emojiPickerOpened, setEmojiPickerOpened] = useState(false);
  const [modalWidth, setModalWidth] = useState('600px');
  const [selectedPlaylist, setSelectedPlaylist] = useState<null | Playlist>(null);
  const [sortedMovies, setSortedMovies] = useState<Movie[]>([]);
  const [activeLetter, setActiveLetter] = useState<string>('A');

  const observer = useRef<IntersectionObserver | null>(null);

  //function to normalize special character letters in the alphabeticalList (é à etc)
  const normalizeString = (str: string) => {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toUpperCase();
  };

  const openAddModal = () => {
    setNewLabel('');
    setNewEmoji('🆕');
    setOpened(true);
  };

  const openEditModal = (label: string, emoji: string) => {
    setEditingLabel(label);
    setNewLabel(label);
    setNewEmoji(emoji);
    setOpened(true);
  };

  const handleClose = () => {
    setOpened(false);
    setEditingLabel(null);
    setModalWidth('600px');
  };

  const handleSave = (event: React.FormEvent) => {
    event.preventDefault();

    if (editingLabel) {
      setPlaylists((prevPlaylists) =>
        prevPlaylists.map((playlist) =>
          playlist.label === editingLabel ? { emoji: newEmoji, label: newLabel, movies: playlist.movies } : playlist
        )
      );
    } else {
      const newPlaylist: Playlist = { emoji: newEmoji, label: newLabel };
      setPlaylists((prevPlaylists) => [...prevPlaylists, newPlaylist]);
    }

    handleClose();
  };

  const confirmRemovePlaylist = (label: string) => {
    openConfirmModal({
      title: 'Confirmer la suppression',
      children: (
        <Text size="sm">
          Êtes-vous sûr de vouloir supprimer la playlist <strong>{label}</strong> ? Cette action est irréversible.
        </Text>
      ),
      labels: { confirm: 'Supprimer', cancel: 'Annuler' },
      confirmProps: { color: 'red' },
      onConfirm: () => removePlaylist(label),
    });
  };

  const removePlaylist = (label: string) => {
    setPlaylists((prevPlaylists) => prevPlaylists.filter((playlist) => playlist.label !== label));
    showNotification({
      title: 'Playlist supprimée',
      message: `La playlist "${label}" a été supprimée.`,
      color: 'red',
    });
  };

  const onEmojiClick = (emojiData: EmojiClickData) => {
    setNewEmoji(emojiData.emoji);
    setEmojiPickerOpened(false);
    setModalWidth('600px');
  };
  
  //for open or close emojiPicker
  const handleEmojiPickerToggle = () => {
    setEmojiPickerOpened(!emojiPickerOpened);
    setModalWidth(emojiPickerOpened ? '600px' : '800px');
  };

  const openSidebar = (playlist: Playlist) => {
    setSelectedPlaylist(playlist);
  };

  const closeSidebar = () => {
    setSelectedPlaylist(null);
    setSortedMovies([]);
  };

  //to sort movies alphabetic in database
  const sortMoviesAlphabetically = (movies: Movie[]) => {
    return movies.slice().sort((a, b) => normalizeString(a.title).localeCompare(normalizeString(b.title)));
  };

  //Function to group movies by first letter
  const groupMoviesByFirstLetter = (movies: Movie[]) => {
    const groupedMovies: { [key: string]: Movie[] } = {};
    movies.forEach((movie) => {
      const firstLetter = normalizeString(movie.title.charAt(0));
      if (!groupedMovies[firstLetter]) {
        groupedMovies[firstLetter] = [];
      }
      groupedMovies[firstLetter].push(movie);
    });
    return groupedMovies;
  };

  useEffect(() => {
    if (selectedPlaylist?.movies) {
      const sorted = sortMoviesAlphabetically(selectedPlaylist.movies);
      setSortedMovies(sorted);
    } else {
      setSortedMovies([]);
    }
  }, [selectedPlaylist]);

  // Effect to observe letter sections and update the active letter
  useEffect(() => {
    const sections = document.querySelectorAll('.letter-section');

    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const letter = entry.target.id;
            setActiveLetter(letter);
          }
        });
      },
      { threshold: 0.1 }
    );

    sections.forEach((section) => {
      observer.current?.observe(section);
    });

    return () => {
      observer.current?.disconnect();
    };
  }, [sortedMovies]);

  //block characters at 33 to add punctuation for the title movies
  const maxLength = 33;

  //plural or singular for the number of films in a playlist
  const getMoviesLabel = (count: number) => {
    if (count === 0) {
      return 'aucun film';
    } else if (count === 1) {
      return 'film';
    } else {
      return 'films';
    }
  };

  return (
    <ModalsProvider>
      <NavbarSearch
        playlists={playlists}
        openAddModal={openAddModal}
        openEditModal={openEditModal}
        confirmRemovePlaylist={confirmRemovePlaylist}
        openSidebar={openSidebar}
      />

      <Modal
        opened={opened}
        onClose={handleClose}
        title={editingLabel ? 'Modifier la Playlist' : 'Nouvelle Playlist'}
        style={{ width: modalWidth, maxWidth: '90vw' }}
      >
        <form onSubmit={handleSave}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ cursor: 'pointer' }} onClick={handleEmojiPickerToggle}>
              {newEmoji}
            </div>
            {emojiPickerOpened && <EmojiPicker onEmojiClick={onEmojiClick} />}
            <TextInput
              label="Nom de la playlist"
              placeholder="Par exemple: Films d'actions"
              value={newLabel}
              onChange={(event) => setNewLabel(event.currentTarget.value)}
              style={{ flexGrow: 1 }}
            />
          </div>
          <Group justify="flex-end" mt="md">
            <Button type="submit" color="bg" autoContrast>
              Enregistrer
            </Button>
          </Group>
        </form>
      </Modal>

      {selectedPlaylist && (
        <>
          <div className="sidebarPlaylist">
            <div
              className="sidebar-headerPlaylist"
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <Text size="lg">
                {selectedPlaylist.emoji} {selectedPlaylist.label}
              </Text>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {selectedPlaylist.movies?.length === 0 ? (
                  <Text size="sm" style={{ marginRight: '1rem' }}>
                    Vous n'avez aucun film dans cette playlist
                  </Text>
                ) : (
                  <Text size="sm" style={{ marginRight: '1rem' }}>
                    Vous avez {selectedPlaylist.movies ? selectedPlaylist.movies.length : 0}{' '}
                    {getMoviesLabel(selectedPlaylist.movies ? selectedPlaylist.movies.length : 0)} dans cette playlist
                  </Text>
                )}
                <Button type="submit" color="bg" autoContrast onClick={closeSidebar}>
                  Fermer &#10060;
                </Button>
              </div>
            </div>
            <div className="sidebar-content-wrapperPL">
              <div className="sidebar-content">
                {Object.entries(groupMoviesByFirstLetter(sortedMovies)).map(([letter, movies]) => (
                  <div key={letter} id={letter} className="letter-section">
                    <h2>{letter}</h2>
                    <div className="movie-row">
                      {movies.map((movie, index) => (
                        <div key={index} className="movie">
                          <img src={movie.imageUrl} alt={`Image de ${movie.title}`} />
                          <div className="movie-infoPL">
                            <Text size="md">
                              {movie.title.length > maxLength ? `${movie.title.slice(0, maxLength)}...` : movie.title}
                            </Text>
                            <Text size="sm">{movie.year}</Text>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <AlphabeticalList activeLetter={activeLetter} />
        </>
      )}
    </ModalsProvider>
  );
};

export default PlaylistPage;
