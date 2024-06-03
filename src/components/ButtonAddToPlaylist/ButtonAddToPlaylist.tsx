import { Button, Menu, Text } from '@mantine/core';
import { IconCheck, IconChevronDown } from '@tabler/icons-react';
import { useEffect } from 'react';
import { addedInPlaylist } from '../../features/moviesSlice';
import { actionAddMediaToPlaylist, actionFetchUserPlaylists } from '../../features/playlistSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

function ButtonAddToPlaylist({ tmdbId, inPlaylists }: { tmdbId: number; inPlaylists: number[] }) {
  const userPlaylists = useAppSelector((state) => state.playlist.userPlaylists);
  const hasFetchUserPlaylists = useAppSelector((state) => state.playlist.hasFetchUserPlaylists);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!hasFetchUserPlaylists) {
      dispatch(actionFetchUserPlaylists());
    }
  }, [dispatch]);

  // empty space for the placeholder icon in playlists menu
  const PlaceholderIcon = () => <div style={{ width: 24, height: 24 }}></div>;

  const addToPlaylist = (playlist_id: number) => {
    if (!inPlaylists.includes(playlist_id)) {
      // send request to api and then update the state
      dispatch(actionAddMediaToPlaylist({ id: playlist_id, tmdb_id: tmdbId })).then(() => {
        dispatch(addedInPlaylist(playlist_id));
      });
    }
  };

  return (
    <Menu
      transitionProps={{ transition: 'pop-top-right' }}
      position="bottom-end"
      width={220}
      withinPortal
      disabled={!userPlaylists.length}
    >
      <Menu.Target>
        <Button rightSection={<IconChevronDown stroke={1.5} />} variant="outline" color="bg">
          Ajouter à une liste
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        {userPlaylists.map((playlist) => (
          <Menu.Item
            key={playlist.id}
            leftSection={inPlaylists.includes(playlist.id) ? <IconCheck stroke={1.5} /> : <PlaceholderIcon />}
            rightSection={
              <Text size="sm" c="dimmed">
                0
              </Text>
            }
            onClick={() => addToPlaylist(playlist.id)}
          >
            {playlist.name}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}

export default ButtonAddToPlaylist;
