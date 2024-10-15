import { Button, Menu } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconChevronDown, IconX } from '@tabler/icons-react';
import { useGetUserdataMovieByIdQuery } from '../../../features/moviesApiSlice';
import { useAddMediaToPlaylistMutation, useGetUserPlaylistsQuery } from '../../../features/playlistApiSlice';

// empty space for the placeholder icon in playlists menu
function PlaceholderIcon() {
  return <div style={{ width: 24, height: 24 }} />;
}

function ButtonAddToPlaylist({ tmdbId }: { tmdbId: number }) {
  const [addMediaToPlaylist] = useAddMediaToPlaylistMutation();
  const { data: playlists, isLoading: playlistsAreLoading } = useGetUserPlaylistsQuery();
  const { data: userData, refetch: refetchUserdata } = useGetUserdataMovieByIdQuery(tmdbId);
  const inPlaylists = userData ? userData.in_playlists : [];

  const addToPlaylist = async (playlist_id: number) => {
    if (!inPlaylists.includes(playlist_id)) {
      try {
        // send request to api and then update the state
        await addMediaToPlaylist({ id: playlist_id, tmdb_id: tmdbId });
        refetchUserdata();
        const listName = playlists?.find((playlist) => playlist.id === playlist_id)?.name;
        notifications.show({
          id: 'login-success',
          withCloseButton: true,
          autoClose: 5000,
          // title: 'Vous êtes connecté',
          message: `Film ajouté à la liste ${listName} !`,
          color: 'green',
          icon: <IconCheck />,
          loading: false,
        });
      } catch (error) {
        notifications.show({
          id: 'login-error',
          withCloseButton: true,
          autoClose: 5000,
          // title: 'Erreur',
          message: `Erreur lors de l'ajout du film à la liste`,
          color: 'red',
          icon: <IconX />,
          loading: false,
        });
      }
    }
  };

  return playlists && !playlistsAreLoading ? (
    <Menu
      transitionProps={{ transition: 'pop-top-right' }}
      position="bottom-end"
      width={220}
      withinPortal
      disabled={playlists.length === 0}
    >
      <Menu.Target>
        <Button
          rightSection={<IconChevronDown stroke={1.5} />}
          variant="outline"
          color="bg"
          data-disabled={playlists.length === 0}
        >
          Ajouter à une liste
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        {playlists.map((playlist) => (
          <Menu.Item
            key={playlist.id}
            leftSection={inPlaylists.includes(playlist.id) ? <IconCheck stroke={1.5} /> : <PlaceholderIcon />}
            // rightSection={
            //   <Text size="sm" c="dimmed">
            //     0
            //   </Text>
            // }
            onClick={() => addToPlaylist(playlist.id)}
          >
            {playlist.name}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  ) : (
    <div />
  );
}

export default ButtonAddToPlaylist;
