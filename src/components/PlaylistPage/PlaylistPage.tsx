import { ActionIcon, Button, Group, Modal, Text, TextInput } from '@mantine/core';
import { ModalsProvider, openConfirmModal } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconTrash, IconX } from '@tabler/icons-react';
import React, { useEffect, useRef, useState } from 'react';
import { MovieIdentityType } from '../../@types/MovieType';
import { PlaylistIdentityType } from '../../@types/PlaylistState';
import {
  actionCreatePlaylist,
  actionDeleteMediaFromPlaylist,
  actionDeletePlaylist,
  actionFetchPlaylist,
  actionFetchUserPlaylists,
  actionRenamePlaylist,
  actionResetCurrentPlaylist,
} from '../../features/playlistSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import AlphabeticalList from '../AlphabeticalListNav/AlphabeticalList';
import Loader from '../Loader/Loader';
import NavbarSearch from './NavbarSearch';
import './PlaylistPage.scss';

const PlaylistPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const playlists = useAppSelector((state) => state.playlist.userPlaylists);
  const hasFetchUserPlaylists = useAppSelector((state) => state.playlist.hasFetchUserPlaylists);
  const [opened, setOpened] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newLabel, setNewLabel] = useState('');
  const [playlistId, setPlaylistId] = useState<number | null>(null);
  const [editingLabel, setEditingLabel] = useState<null | string>(null);
  const [modalWidth, setModalWidth] = useState('600px');
  const selectedPlaylist = useAppSelector((state) => state.playlist.currentPlaylist);
  const [sortedMovies, setSortedMovies] = useState<MovieIdentityType[]>([]);
  const [activeLetter, setActiveLetter] = useState<string>('A');
  const [movieToDelete, setMovieToDelete] = useState<string | null>(null); // nouvel état pour la confirmation de suppression de film

  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!hasFetchUserPlaylists) dispatch(actionFetchUserPlaylists()).then(() => setLoading(false));
  }, [dispatch, hasFetchUserPlaylists]);

  // Fonction pour normaliser les lettres à caractères spéciaux dans la liste alphabétique (é à etc)
  const normalizeString = (str: string) => {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toUpperCase();
  };

  const openAddModal = () => {
    setNewLabel('');
    setOpened(true);
  };

  const openEditModal = (playlist: PlaylistIdentityType) => {
    setEditingLabel(playlist.name);
    setNewLabel(playlist.name);
    setPlaylistId(playlist.id);
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
      // renommer la playlist
      dispatch(actionRenamePlaylist({ id: playlistId || 0, name: newLabel }));
    } else {
      // créer une nouvelle playlist
      dispatch(actionCreatePlaylist(newLabel));
    }

    handleClose();
  };

  const confirmRemovePlaylist = (playlist: PlaylistIdentityType) => {
    openConfirmModal({
      title: 'Confirmer la suppression',
      children: (
        <Text size="sm">
          Êtes-vous sûr de vouloir supprimer la playlist <strong>{playlist.name}</strong> ? Cette action est
          irréversible.
        </Text>
      ),
      labels: { confirm: 'Supprimer', cancel: 'Annuler' },
      confirmProps: { color: 'red' },
      onConfirm: () => removePlaylist(playlist),
    });
  };

  const removePlaylist = (playlist: PlaylistIdentityType) => {
    dispatch(actionDeletePlaylist(playlist.id));
    closeSidebar();
    showNotification({
      title: 'Playlist supprimée',
      message: `La playlist "${playlist.name}" a été supprimée.`,
      color: 'red',
    });
  };

  const openSidebar = (playlist: PlaylistIdentityType) => {
    dispatch(actionFetchPlaylist(playlist.id));
    document.querySelector('.sidebarPlaylist')?.classList.add('visible');
    console.log('Barre latérale ouverte pour la playlist:', playlist.name);
  };

  const closeSidebar = () => {
    console.log('Fermeture de la barre latérale...');
    dispatch(actionResetCurrentPlaylist());
    setSortedMovies([]);
    setLoading(false);
    document.querySelector('.sidebarPlaylist')?.classList.remove('visible');
    console.log('Barre latérale fermée');
  };

  // Pour trier les films par ordre alphabétique dans la base de données
  const sortMoviesAlphabetically = (movies: MovieIdentityType[]) => {
    return movies.slice().sort((a, b) => normalizeString(a.title_fr).localeCompare(normalizeString(b.title_fr)));
  };

  // Fonction pour regrouper les films par première lettre
  const groupMoviesByFirstLetter = (movies: MovieIdentityType[]) => {
    const groupedMovies: { [key: string]: MovieIdentityType[] } = {};
    movies.forEach((movie) => {
      const firstLetter = normalizeString(movie.title_fr.charAt(0));
      if (!groupedMovies[firstLetter]) {
        groupedMovies[firstLetter] = [];
      }
      groupedMovies[firstLetter].push(movie);
    });
    return groupedMovies;
  };

  useEffect(() => {
    if (selectedPlaylist?.medias) {
      const sorted = sortMoviesAlphabetically(selectedPlaylist.medias);
      setSortedMovies(sorted);
    } else {
      setSortedMovies([]);
    }
  }, [selectedPlaylist]);

  // Effet pour observer les sections de lettres et mettre à jour la lettre active
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
      { threshold: 0.9 }
    );

    sections.forEach((section) => {
      observer.current?.observe(section);
    });

    return () => {
      observer.current?.disconnect();
    };
  }, [sortedMovies]);

  // Limite des caractères à 33 pour ajouter des points de suspension pour les titres de films
  const maxLength = 33;

  // Pluriel ou singulier pour le nombre de films dans une playlist
  const getMoviesLabel = (count: number) => {
    if (count < 2) {
      return 'film';
    } else {
      return 'films';
    }
  };

  // Fonction pour supprimer un film de la playlist sélectionnée
  const removeMovieFromPlaylist = (movie: MovieIdentityType) => {
    if (selectedPlaylist) {
      dispatch(actionDeleteMediaFromPlaylist({ id: selectedPlaylist.playlist_id, tmdb_id: movie.tmdb_id }));
      showNotification({
        title: 'Film supprimé',
        message: `Le film "${movie.title_fr}" a été supprimé de la playlist "${selectedPlaylist.name}".`,
        color: 'green',
      });
      setMovieToDelete(null);
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
        loading={!hasFetchUserPlaylists}
      />

      <Modal
        opened={opened}
        onClose={handleClose}
        title={editingLabel ? 'Modifier la Playlist' : 'Nouvelle Playlist'}
        style={{ width: modalWidth, maxWidth: '90vw' }}
      >
        <form onSubmit={handleSave}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
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

      <div className="sidebarPlaylist">
        <div
          className="sidebar-headerPlaylist"
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingLeft: '0.5rem' }}
        >
          <Text size="lg">{selectedPlaylist?.name}</Text>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {selectedPlaylist?.medias && selectedPlaylist.medias.length === 0 ? (
              <Text size="sm" style={{ marginRight: '1rem' }}>
                Vous n'avez aucun film dans cette playlist
              </Text>
            ) : (
              <Text size="sm" style={{ marginRight: '1rem' }}>
                Vous avez {selectedPlaylist?.medias ? selectedPlaylist.medias.length : 0}{' '}
                {getMoviesLabel(selectedPlaylist?.medias ? selectedPlaylist.medias.length : 0)} dans cette playlist
              </Text>
            )}
            <Button type="submit" color="bg" autoContrast onClick={closeSidebar}>
              Fermer &#10060;
            </Button>
          </div>
        </div>
        <div className="sidebar-content-wrapperPL">
          <div className="sidebar-content">
            {!loading ? (
              Object.entries(groupMoviesByFirstLetter(sortedMovies)).map(([letter, movies]) => (
                <div key={letter} id={letter} className="letter-section">
                  <h2>{letter}</h2>
                  <div className="movie-row">
                    {movies.map((movie, index) => (
                      // attention en localhost, à modifier pour le serveur Simon. Movie en .id
                      <a key={index} href={`http://localhost:5173/films/${movie.tmdb_id}`} className="movie-link">
                        <div className="movie">
                          <img src={movie.poster_path} alt={`Image de ${movie.title_fr}`} />
                          <ActionIcon
                            onClick={(e) => {
                              e.preventDefault();
                              setMovieToDelete(movie.title_fr);
                            }}
                            className="remove-button"
                          >
                            <IconTrash />
                          </ActionIcon>
                          {movieToDelete === movie.title_fr && (
                            <div className="confirm-delete">
                              <ActionIcon
                                onClick={(e) => {
                                  e.preventDefault();
                                  removeMovieFromPlaylist(movie);
                                }}
                                className="confirm-button"
                              >
                                <IconCheck />
                              </ActionIcon>
                              <ActionIcon
                                onClick={(e) => {
                                  e.preventDefault();
                                  setMovieToDelete(null);
                                }}
                                className="cancel-button"
                              >
                                <IconX />
                              </ActionIcon>
                            </div>
                          )}
                          <div className="movie-infoPL">
                            <Text size="md">
                              {movie.title_fr.length > maxLength
                                ? `${movie.title_fr.slice(0, maxLength)}...`
                                : movie.title_fr}
                            </Text>
                            <Text size="sm">{movie.release_date.slice(0, 4)}</Text>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <Loader />
            )}
          </div>
          {selectedPlaylist && <AlphabeticalList activeLetter={activeLetter} />}
        </div>
      </div>
    </ModalsProvider>
  );
};

export default PlaylistPage;
