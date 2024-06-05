import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  Playlist,
  PlaylistState,
  SuccessEmptyResponse,
  SuccessNewPlaylistResponse,
  SuccessPlaylistResponse,
  SuccessPlaylistsResponse,
} from '../@types/PlaylistState';
import * as api from '../api';
import type { RootState } from '../store/store';

// empty Playlist object for initial state
const noPlaylist = {
  playlist_id: 0,
  name: '',
  medias: [],
};

const playlistState: PlaylistState = {
  currentPlaylist: noPlaylist,
  userPlaylists: [],
  hasFetchUserPlaylists: false,
};

// thunk types: createAsyncThunk<returned object type, received arg type>
export const actionCreatePlaylist = createAsyncThunk<[SuccessNewPlaylistResponse, string], string>(
  'playlist/createPlaylist',
  async (name) => {
    const response = await api.createPlaylist(name);
    return [response.data, name];
  }
);
export const actionRenamePlaylist = createAsyncThunk<[string, number], { id: number; name: string }>(
  'playlist/renamePlaylist',
  async ({ id, name }) => {
    await api.renamePlaylist(id, name);
    return [name, id];
  }
);
export const actionDeletePlaylist = createAsyncThunk<number, number>('playlist/deletePlaylist', async (id) => {
  await api.deletePlaylist(id);
  return id;
});
export const actionFetchPlaylist = createAsyncThunk<SuccessPlaylistResponse, number>(
  'playlist/fetchPlaylist',
  async (id) => {
    const response = await api.getPlaylist(id);
    return response.data;
  }
);
export const actionFetchUserPlaylists = createAsyncThunk<SuccessPlaylistsResponse>(
  'playlist/fetchUserPlaylists',
  async () => {
    const response = await api.getUserPlaylists();
    return response.data;
  }
);
export const actionAddMediaToPlaylist = createAsyncThunk<SuccessEmptyResponse, { id: number; tmdb_id: number }>(
  'playlist/addMediaToPlaylist',
  async ({ id, tmdb_id }, thunkAPI) => {
    const response = await api.addMediaToPlaylist(id, tmdb_id);
    const state = thunkAPI.getState() as RootState;
    if (state.movies.currentMovie?.user_data) {
      state.movies.currentMovie.user_data.in_playlists.push(id);
    } else {
      state.movies.currentMovie!.user_data = {
        userId: 0,
        rating: null,
        review: null,
        in_playlists: [id],
      };
    }
    return response.data;
  }
);
export const actionDeleteMediaFromPlaylist = createAsyncThunk<number, { id: number; tmdb_id: number }>(
  'playlist/deleteMediaFromPlaylist',
  async ({ id, tmdb_id }) => {
    await api.deleteMediaFromPlaylist(id, tmdb_id);
    return tmdb_id;
  }
);

const playlistSlice = createSlice({
  name: 'playlist',
  initialState: playlistState,
  reducers: {
    actionResetCurrentPlaylist: (state) => {
      state.currentPlaylist = noPlaylist;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(actionFetchPlaylist.fulfilled, (state, action) => {
        const response = action.payload;
        state.currentPlaylist = response.data as Playlist;
      })
      .addCase(actionCreatePlaylist.fulfilled, (state, action) => {
        const [response, name] = action.payload;
        state.userPlaylists.push({ id: response.data.playlist_id, name, created_at: '', updated_at: '', user_id: 0 });
      })
      .addCase(actionDeletePlaylist.fulfilled, (state, action) => {
        const id = action.payload;
        state.userPlaylists = state.userPlaylists.filter((playlist) => playlist.id !== id);
      })
      .addCase(actionDeleteMediaFromPlaylist.fulfilled, (state, action) => {
        const id = action.payload;
        state.currentPlaylist.medias = state.currentPlaylist.medias.filter((movie) => movie.tmdb_id !== id);
      })
      .addCase(actionRenamePlaylist.fulfilled, (state, action) => {
        const [name, id] = action.payload;
        state.currentPlaylist.name = name;
        state.userPlaylists.map((playlist) => {
          if (playlist.id === id) {
            playlist.name = name;
          }
          return playlist;
        });
      })
      .addCase(actionFetchUserPlaylists.fulfilled, (state, action) => {
        const response = action.payload as any;
        state.userPlaylists = response.data;
        state.hasFetchUserPlaylists = true;
      })
      .addCase(actionFetchUserPlaylists.rejected, (_, action) => {
        // eslint-disable-next-line no-console
        console.log('Error :', action.error.message);
        if (action.payload) {
          // eslint-disable-next-line no-console
          console.log('Error :', action.payload);
        }
      });
  },
});

export default playlistSlice.reducer;

export const { actionResetCurrentPlaylist } = playlistSlice.actions;
