import { MovieIdentityType } from './MovieType';

export type PlaylistState = {
  currentPlaylist: Playlist;
  userPlaylists: PlaylistIdentityType[];
  hasFetchUserPlaylists: boolean;
};

// here I create a generic type for 'success' API responses (no export)
// you have to specify the type of T when you want to reuse SuccessResponse<T>
type SuccessResponse<T> = {
  status: 'success';
  data: T;
};

export type PlaylistIdentityType = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  user_id: number;
};

export type Playlist = {
  playlist_id: number;
  name: string;
  medias: MovieIdentityType[];
};

export type SuccessNewPlaylistResponse = SuccessResponse<{ playlist_id: number }>;

export type SuccessEmptyResponse = SuccessResponse<boolean>;

export type SuccessPlaylistResponse = SuccessResponse<Playlist>;

export type SuccessPlaylistsResponse = SuccessResponse<PlaylistIdentityType[]>;
