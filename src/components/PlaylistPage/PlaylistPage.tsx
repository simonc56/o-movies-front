import React, { useState } from 'react';
import { TextInput, Code, ActionIcon, Tooltip, Text, Group, rem, Button, Modal } from '@mantine/core';
import { IconSearch, IconPlus, IconTrash, IconEdit, IconX } from '@tabler/icons-react';
import { showNotification } from '@mantine/notifications';
import { openConfirmModal, ModalsProvider } from '@mantine/modals';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import classes from './NavbarSearch.module.css';
import './PlaylistPage.scss';


interface Playlist {
  emoji: string;
  label: string;
}

const initialPlaylists: Playlist[] = [  
  { emoji: '👌', label: 'Déjà regardé ' },
  { emoji: '🎥', label: 'A voir' },
  { emoji: '💖', label: 'Coup de coeur' },
  { emoji: '🍆', label: 'hmm' },
];

export function NavbarSearch() {
  const [playlists, setPlaylists] = useState<Playlist[]>(initialPlaylists);
  const [opened, setOpened] = useState(false);
  const [newLabel, setNewLabel] = useState('');
  const [newEmoji, setNewEmoji] = useState('🆕');
  const [editingLabel, setEditingLabel] = useState<null | string>(null);
  const [emojiPickerOpened, setEmojiPickerOpened] = useState(false);

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
  };

  const playlistLinks = playlists.map((playlist) => (
    <div key={playlist.label} className={classes.collectionLink}>
      <span style={{ marginRight: rem(5), fontSize: rem(16) }}>{playlist.emoji}</span>
      <span>{playlist.label}</span>
      <div className={classes.collectionLinkIcons}>
        <ActionIcon className="icon" onClick={() => openEditModal(playlist.label, playlist.emoji)} style={{ backgroundColor: 'lightblue', borderRadius: '50%' }}>
          <IconEdit style={{ width: rem(16), height: rem(16), color: 'blue' }} stroke={1.5} />
        </ActionIcon>
        <ActionIcon className="icon" onClick={() => confirmRemovePlaylist(playlist.label)} style={{ backgroundColor: 'lightcoral', borderRadius: '50%' }}>
          <IconTrash style={{ width: rem(16), height: rem(16), color: 'red' }} stroke={1.5} />
        </ActionIcon>
      </div>
    </div>
  ));

  return (
    <ModalsProvider>
      <Modal
        opened={opened}
        onClose={handleClose}
        title={editingLabel ? 'Modifier la Playlist' : 'Nouvelle Playlist'}
      >
        <form onSubmit={handleSave}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div
              style={{ cursor: 'pointer' }}
              onClick={() => setEmojiPickerOpened(!emojiPickerOpened)}
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
      <nav className={classes.navbar1}>
        <div className={classes.section1}>
          <Group className={classes.collectionsHeader} justify="space-between">
            <Text size="lg" fw={700} color="var(--color-bg)" style={{ fontSize: rem(24) }}>
              Mes Playlists
            </Text>
            <Tooltip label="Créer une playlist" withArrow position="right">
              <ActionIcon variant="default" size={24} onClick={openAddModal}>
                <IconPlus style={{ width: rem(14), height: rem(14) }} stroke={1.5} />
              </ActionIcon>
            </Tooltip>
          </Group>
          <TextInput
            placeholder="Rechercher..."
            size="sm"
            leftSection={<IconSearch style={{ width: rem(12), height: rem(12) }} stroke={1.5} />}
            rightSectionWidth={70}
            rightSection={<Code className={classes.searchCode}>Ctrl + K</Code>}
            styles={{ section: { pointerEvents: 'none' } }}
            mb="sm"
          />
          <div className={classes.collections}>{playlistLinks}</div>
        </div>
      </nav>
    </ModalsProvider>
  );
}

export default NavbarSearch;