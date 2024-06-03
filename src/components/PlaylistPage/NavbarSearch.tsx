import React, { useState } from 'react';
import { TextInput, ActionIcon, Tooltip, Text, Group, rem } from '@mantine/core';
import { IconSearch, IconPlus, IconTrash, IconEdit } from '@tabler/icons-react';
import classes from './NavbarSearch.module.css';

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

interface NavbarSearchProps {
  playlists: Playlist[];
  openAddModal: () => void;
  openEditModal: (label: string, emoji: string) => void;
  confirmRemovePlaylist: (label: string) => void;
  openSidebar: (playlist: Playlist) => void;
}

const NavbarSearch: React.FC<NavbarSearchProps> = ({
  playlists,
  openAddModal,
  openEditModal,
  confirmRemovePlaylist,
  openSidebar,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.currentTarget.value);
  };

  const filteredPlaylists = playlists.filter((playlist) =>
    playlist.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const maxLength = 17;

  const playlistLinks = filteredPlaylists.map((playlist) => (
    <div key={playlist.label} className={classes.collectionLink} onClick={() => openSidebar(playlist)}>
      <span style={{ marginRight: rem(5), fontSize: rem(16) }}>{playlist.emoji}</span>
      <span>
        {playlist.label.length > maxLength
          ? `${playlist.label.slice(0, maxLength)}...`
          : playlist.label}
      </span>
      <div className={classes.collectionLinkIcons}>
        <ActionIcon
          className="icon"
          onClick={(e) => {
            e.stopPropagation();
            openEditModal(playlist.label, playlist.emoji);
          }}
          style={{ backgroundColor: 'lightblue', borderRadius: '50%' }}
        >
          <IconEdit style={{ width: rem(16), height: rem(16), color: 'blue' }} stroke={1.5} />
        </ActionIcon>
        <ActionIcon
          className="icon"
          onClick={(e) => {
            e.stopPropagation();
            confirmRemovePlaylist(playlist.label);
          }}
          style={{ backgroundColor: 'lightcoral', borderRadius: '50%' }}
        >
          <IconTrash style={{ width: rem(16), height: rem(16), color: 'red' }} stroke={1.5} />
        </ActionIcon>
      </div>
    </div>
  ));

  return (
    <nav className={classes.navbarPlaylist}>
      <div className={classes.sectionPlaylist}>
        <Group className={classes.collectionsHeaderPlaylist} justify="space-between">
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
          placeholder="Rechercher une playlist"
          size="sm"
          value={searchTerm}
          onChange={handleSearchChange}
          leftSection={<IconSearch style={{ width: rem(12), height: rem(12) }} stroke={1.5} />}
          mb="sm"
        />
        <div className={classes.collectionsPlayList}>{playlistLinks}</div>
      </div>
    </nav>
  );
};

export default NavbarSearch;
