import { ActionIcon, Group, Text, TextInput, Tooltip, rem } from '@mantine/core';
import { IconEdit, IconPlus, IconSearch, IconTrash } from '@tabler/icons-react';
import React, { useState } from 'react';
import { PlaylistIdentityType } from '../../@types/PlaylistState';
import classes from './NavbarSearch.module.css';

interface NavbarSearchProps {
  playlists: PlaylistIdentityType[];
  openAddModal: () => void;
  openEditModal: (playlist: PlaylistIdentityType) => void;
  confirmRemovePlaylist: (playlist: PlaylistIdentityType) => void;
  openSidebar: (playlist: PlaylistIdentityType) => void;
}

// Function to normalize strings by removing accents and converting to lowercase
const normalizeString = (str: string) => {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
};

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
    normalizeString(playlist.name).includes(normalizeString(searchTerm))
  );

  const maxLength = 26;

  const playlistLinks = filteredPlaylists.map((playlist) => (
    <div
      key={playlist.name}
      style={{ cursor: 'pointer' }}
      className={classes.collectionLink}
      onClick={() => openSidebar(playlist)}
    >
      <span>{playlist.name.length > maxLength ? `${playlist.name.slice(0, maxLength)}...` : playlist.name}</span>
      <div className={classes.collectionLinkIcons}>
        <ActionIcon
          className="icon"
          onClick={(e) => {
            e.stopPropagation();
            openEditModal(playlist);
          }}
          style={{ backgroundColor: 'lightblue', borderRadius: '50%' }}
        >
          <IconEdit style={{ width: rem(16), height: rem(16), color: 'blue' }} stroke={1.5} />
        </ActionIcon>
        <ActionIcon
          className="icon"
          onClick={(e) => {
            e.stopPropagation();
            confirmRemovePlaylist(playlist);
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
