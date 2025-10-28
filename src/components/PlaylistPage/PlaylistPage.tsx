import { ActionIcon, Button, Group, Modal, Text, TextInput } from '@mantine/core';
import { ModalsProvider, openConfirmModal } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconTrash, IconX } from '@tabler/icons-react';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { MovieIdentityType } from '../../@types/MovieType';
import { PlaylistIdentityType } from '../../@types/PlaylistState';
import no_poster from '../../assets/no-poster.webp';
import {
  useCreatePlaylistMutation,
  useDeleteMediaFromPlaylistMutation,
  useDeletePlaylistMutation,
  useGetPlaylistQuery,
  useGetUserPlaylistsQuery,
  useRenamePlaylistMutation,
} from '../../features/playlistApiSlice';
import Loader from '../ui/Loader/Loader';
import AlphabeticalList from './AlphabeticalListNav/AlphabeticalList';
import NavbarSearch from './NavbarSearch';
import './PlaylistPage.scss';

function PlaylistPage() {
  const [playlistId, setPlaylistId] = useState<number>(0);
  const [skip, setSkip] = useState(true);
  const { data: playlists, isLoading: playlistsAreLoading } = useGetUserPlaylistsQuery();
  const [createPlaylist] = useCreatePlaylistMutation();
  const [renamePlaylist] = useRenamePlaylistMutation();
  const [deletePlaylist] = useDeletePlaylistMutation();
  const [deleteMediaFromPlaylist] = useDeleteMediaFromPlaylistMutation();
  const { data: selectedPlaylist } = useGetPlaylistQuery(playlistId, { skip });
  const [opened, setOpened] = useState(false);
  const [newLabel, setNewLabel] = useState('');
  const [editingLabel, setEditingLabel] = useState<null | string>(null);
  const [modalWidth, setModalWidth] = useState('600px');
  const [activeLetter, setActiveLetter] = useState<string>('A');
  const [movieToDelete, setMovieToDelete] = useState<string | null>(null);

  const observer = useRef<IntersectionObserver | null>(null);

  const normalizeString = useCallback(
    (str: string) =>
      str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toUpperCase(),
    []
  );

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
      renamePlaylist({ id: playlistId || 0, name: newLabel });
    } else {
      createPlaylist(newLabel);
    }

    handleClose();
  };

  const openSidebar = (playlist: PlaylistIdentityType) => {
    setPlaylistId(playlist.id);
    setSkip(false);
    // refetchPlaylist();
    document.querySelector('.sidebarPlaylist')?.classList.add('visible');
  };

  const closeSidebar = () => {
    document.querySelector('.sidebarPlaylist')?.classList.remove('visible');
  };

  const removePlaylist = (playlist: PlaylistIdentityType) => {
    deletePlaylist(playlist.id);
    closeSidebar();
    showNotification({
      title: 'Playlist supprimée',
      message: `La playlist "${playlist.name}" a été supprimée.`,
      color: 'red',
    });
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

  const groupMoviesByFirstLetter = useCallback(
    (movies: MovieIdentityType[]) => {
      const groupedMovies: { [key: string]: MovieIdentityType[] } = {};
      movies.forEach((movie) => {
        const firstLetter = normalizeString(movie.title_fr.charAt(0));
        if (!groupedMovies[firstLetter]) {
          groupedMovies[firstLetter] = [];
        }
        groupedMovies[firstLetter].push(movie);
      });
      return groupedMovies;
    },
    [normalizeString]
  );

  const sortedMovies = useMemo(() => {
    if (!selectedPlaylist?.medias) {
      return [];
    }
    return selectedPlaylist.medias
      .slice()
      .sort((a, b) => normalizeString(a.title_fr).localeCompare(normalizeString(b.title_fr)));
  }, [selectedPlaylist, normalizeString]);

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

  const maxLength = 33;

  const getMoviesLabel = (count: number) => {
    if (count < 2) {
      return 'film';
    }
    return 'films';
  };

  const removeMovieFromPlaylist = (movie: MovieIdentityType) => {
    if (selectedPlaylist) {
      deleteMediaFromPlaylist({ id: selectedPlaylist.playlist_id, tmdb_id: movie.tmdb_id });
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
        playlists={playlists || []}
        openAddModal={openAddModal}
        openEditModal={openEditModal}
        confirmRemovePlaylist={confirmRemovePlaylist}
        openSidebar={openSidebar}
        loading={playlistsAreLoading}
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
            {!playlistsAreLoading ? (
              Object.entries(groupMoviesByFirstLetter(sortedMovies)).map(([letter, movies]) => (
                <div key={letter} id={letter} className="letter-section">
                  <h2>{letter}</h2>
                  <div className="movie-row">
                    {movies.map((movie) => (
                      <Link key={movie.tmdb_id} to={`/films/${movie.tmdb_id}`} className="movie-link">
                        <div className="movie">
                          <img
                            src={movie.poster_path.slice(-4) !== 'null' ? movie.poster_path : no_poster}
                            alt={movie.title_fr}
                          />
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
                      </Link>
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
}

export default PlaylistPage;
