import React, { useState } from 'react';
import { TextInput, Text, Group, Button, Modal } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { openConfirmModal, ModalsProvider } from '@mantine/modals';
import { IconX } from '@tabler/icons-react';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import NavbarSearch from './NavbarSearch';
import './PlaylistPage.scss';

interface Movie {
  title: string;
  year: number;
  imageUrl: string;
}

interface Playlist {
  emoji: string;
  label: string;
  movies?: Movie[];
}

const initialPlaylists: Playlist[] = [
  { emoji: '👌', label: 'Déjà regardé ' },
  { emoji: '🎥', label: 'A voir' },
  { emoji: '💖', label: 'Coup de coeur' },
  {
    emoji: '🍆', label: 'hmm', movies: [
      { title: 'Moi moche et méchant 4', year: 2024, imageUrl: 'https://image.tmdb.org/t/p/w300_and_h450_bestv2//vFbafXs0OYPGW1Vj2VGAHFKpAsW.jpg' },
      { title: 'Exemple de Film 2', year: 2023, imageUrl: 'https://image.tmdb.org/t/p/w300_and_h450_bestv2//vFbafXs0OYPGW1Vj2VGAHFKpAsW.jpg' },
      { title: 'Exemple de Film 3', year: 2022, imageUrl: 'https://image.tmdb.org/t/p/w300_and_h450_bestv2//vFbafXs0OYPGW1Vj2VGAHFKpAsW.jpg' },
      { title: 'Moi moche et méchant', year: 2024, imageUrl: 'https://image.tmdb.org/t/p/w300_and_h450_bestv2//vFbafXs0OYPGW1Vj2VGAHFKpAsW.jpg' },
      { title: 'Exemple de Film 1', year: 2023, imageUrl: 'https://image.tmdb.org/t/p/w300_and_h450_bestv2//vFbafXs0OYPGW1Vj2VGAHFKpAsW.jpg' },
      { title: 'Exemple de Film 31', year: 2022, imageUrl: 'https://image.tmdb.org/t/p/w300_and_h450_bestv2//vFbafXs0OYPGW1Vj2VGAHFKpAsW.jpg' },
      { title: 'Exemple de Film 2', year: 2023, imageUrl: 'https://image.tmdb.org/t/p/w300_and_h450_bestv2//vFbafXs0OYPGW1Vj2VGAHFKpAsW.jpg' },
      { title: 'Exemple de Film 3', year: 2022, imageUrl: 'https://image.tmdb.org/t/p/w300_and_h450_bestv2//vFbafXs0OYPGW1Vj2VGAHFKpAsW.jpg' },
      { title: 'Moi moche et méchant', year: 2024, imageUrl: 'https://image.tmdb.org/t/p/w300_and_h450_bestv2//vFbafXs0OYPGW1Vj2VGAHFKpAsW.jpg' },
      { title: 'Exemple de Film 1', year: 2023, imageUrl: 'https://image.tmdb.org/t/p/w300_and_h450_bestv2//vFbafXs0OYPGW1Vj2VGAHFKpAsW.jpg' },
      { title: 'Exemple de Film 31', year: 2022, imageUrl: 'https://image.tmdb.org/t/p/w300_and_h450_bestv2//vFbafXs0OYPGW1Vj2VGAHFKpAsW.jpg' },
      { title: 'Exemple de Film 2', year: 2023, imageUrl: 'https://image.tmdb.org/t/p/w300_and_h450_bestv2//vFbafXs0OYPGW1Vj2VGAHFKpAsW.jpg' },
      { title: 'Exemple de Film 3', year: 2022, imageUrl: 'https://image.tmdb.org/t/p/w300_and_h450_bestv2//vFbafXs0OYPGW1Vj2VGAHFKpAsW.jpg' },
      { title: 'Moi moche et méchant', year: 2024, imageUrl: 'https://image.tmdb.org/t/p/w300_and_h450_bestv2//vFbafXs0OYPGW1Vj2VGAHFKpAsW.jpg' },
      { title: 'Exemple de Film 1', year: 2023, imageUrl: 'https://image.tmdb.org/t/p/w300_and_h450_bestv2//vFbafXs0OYPGW1Vj2VGAHFKpAsW.jpg' },
      { title: 'Exemple de Film 31', year: 2022, imageUrl: 'https://image.tmdb.org/t/p/w300_and_h450_bestv2//vFbafXs0OYPGW1Vj2VGAHFKpAsW.jpg' },
      { title: 'Exemple de Film 3', year: 2022, imageUrl: 'https://image.tmdb.org/t/p/w300_and_h450_bestv2//vFbafXs0OYPGW1Vj2VGAHFKpAsW.jpg' },
      { title: 'Moi moche et méchant', year: 2024, imageUrl: 'https://image.tmdb.org/t/p/w300_and_h450_bestv2//vFbafXs0OYPGW1Vj2VGAHFKpAsW.jpg' },
      { title: 'Exemple de Film 1', year: 2023, imageUrl: 'https://image.tmdb.org/t/p/w300_and_h450_bestv2//vFbafXs0OYPGW1Vj2VGAHFKpAsW.jpg' },
      { title: 'Exemple de Film 31', year: 2022, imageUrl: 'https://image.tmdb.org/t/p/w300_and_h450_bestv2//vFbafXs0OYPGW1Vj2VGAHFKpAsW.jpg' },
      { title: 'Exemple de Film 2', year: 2023, imageUrl: 'https://image.tmdb.org/t/p/w300_and_h450_bestv2//vFbafXs0OYPGW1Vj2VGAHFKpAsW.jpg' },
      { title: 'Exemple de Film 3', year: 2022, imageUrl: 'https://image.tmdb.org/t/p/w300_and_h450_bestv2//vFbafXs0OYPGW1Vj2VGAHFKpAsW.jpg' },
      { title: 'Moi moche et méchant', year: 2024, imageUrl: 'https://image.tmdb.org/t/p/w300_and_h450_bestv2//vFbafXs0OYPGW1Vj2VGAHFKpAsW.jpg' },
      { title: 'Exemple de Film 1', year: 2023, imageUrl: 'https://image.tmdb.org/t/p/w300_and_h450_bestv2//vFbafXs0OYPGW1Vj2VGAHFKpAsW.jpg' },
      { title: 'Exemple de Film 31', year: 2022, imageUrl: 'https://image.tmdb.org/t/p/w300_and_h450_bestv2//vFbafXs0OYPGW1Vj2VGAHFKpAsW.jpg' },
      { title: 'Exemple de Film 2', year: 2023, imageUrl: 'https://image.tmdb.org/t/p/w300_and_h450_bestv2//vFbafXs0OYPGW1Vj2VGAHFKpAsW.jpg' },
      { title: 'Exemple de Film 3', year: 2022, imageUrl: 'https://image.tmdb.org/t/p/w300_and_h450_bestv2//vFbafXs0OYPGW1Vj2VGAHFKpAsW.jpg' },
      { title: 'Moi moche et méchant', year: 2024, imageUrl: 'https://image.tmdb.org/t/p/w300_and_h450_bestv2//vFbafXs0OYPGW1Vj2VGAHFKpAsW.jpg' },
      { title: 'Exemple de Film 1', year: 2023, imageUrl: 'https://image.tmdb.org/t/p/w300_and_h450_bestv2//vFbafXs0OYPGW1Vj2VGAHFKpAsW.jpg' },
      { title: 'Exemple de Film 31', year: 2022, imageUrl: 'https://image.tmdb.org/t/p/w300_and_h450_bestv2//vFbafXs0OYPGW1Vj2VGAHFKpAsW.jpg' },
    ]
  },
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

    if (newLabel.length > 17) {
      showNotification({
        title: 'Nom trop long',
        message: 'Le nom de la playlist doit contenir 17 caractères ou moins.',
        color: 'red',
        icon: <IconX size={16} />,
      });
      return;
    }

    if (editingLabel) {
      setPlaylists((prevPlaylists) =>
        prevPlaylists.map((playlist) =>
          playlist.label === editingLabel ? { emoji: newEmoji, label: newLabel } : playlist
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

  const handleEmojiPickerToggle = () => {
    setEmojiPickerOpened(!emojiPickerOpened);
    setModalWidth(emojiPickerOpened ? '600px' : '800px');
  };

  const openSidebar = (playlist: Playlist) => {
    setSelectedPlaylist(playlist);
  };

  const closeSidebar = () => {
    setSelectedPlaylist(null);
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
            <div
              style={{ cursor: 'pointer' }}
              onClick={handleEmojiPickerToggle}
            >
              {newEmoji}
            </div>
            {emojiPickerOpened && <EmojiPicker onEmojiClick={onEmojiClick} />}
            <TextInput
              label="Nom de la playlist - 17 caractères maximum"
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
        <div className="sidebar">
          <div className="sidebar-header">
            <Text size="xl">{selectedPlaylist.emoji} {selectedPlaylist.label}</Text>
            <Button type="submit" color="bg" autoContrast onClick={closeSidebar}>Fermer</Button>
            </div>
          <div className="sidebar-content">
            {selectedPlaylist.movies && selectedPlaylist.movies.map((movie, index) => (
              <div className="movie" key={index}>
                <img src={movie.imageUrl} alt={`Image de ${movie.title}`} />
                <div className="movie-info">
                  <Text size="sm">{movie.title}</Text>
                  <Text size="sm">Année de production : {movie.year}</Text>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </ModalsProvider>
  );
};

export default PlaylistPage;