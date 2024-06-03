import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  PlaylistState,
  SuccessEmptyResponse,
  SuccessNewPlaylistResponse,
  SuccessPlaylistsResponse,
} from '../@types/PlaylistState';
import * as api from '../api';
import type { RootState } from '../store/store';

const playlistState: PlaylistState = {
  currentPlaylist: [],
  userPlaylists: [],
  hasFetchUserPlaylists: false,
};

// thunk types: createAsyncThunk<returned object type, received arg type>
export const actionCreatePlaylist = createAsyncThunk<SuccessNewPlaylistResponse, string>(
  'playlist/createPlaylist',
  async (name) => {
    const response = await api.createPlaylist(name);
    return response.data;
  }
);
export const actionRenamePlaylist = createAsyncThunk<SuccessEmptyResponse, { id: number; name: string }>(
  'playlist/renamePlaylist',
  async ({ id, name }) => {
    const response = await api.renamePlaylist(id, name);
    return response.data;
  }
);
export const actionDeletePlaylist = createAsyncThunk<SuccessEmptyResponse, number>(
  'playlist/deletePlaylist',
  async (id) => {
    const response = await api.deletePlaylist(id);
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
export const actionDeleteMediaFromPlaylist = createAsyncThunk<SuccessEmptyResponse, { id: number; tmdb_id: number }>(
  'playlist/deleteMediaFromPlaylist',
  async ({ id, tmdb_id }) => {
    const response = await api.deleteMediaFromPlaylist(id, tmdb_id);
    return response.data;
  }
);

const playlistSlice = createSlice({
  name: 'playlist',
  initialState: playlistState,
  reducers: {
    actionResetCurrentPlaylist: (state) => {
      state.currentPlaylist = [];
    },
  },
  extraReducers(builder) {
    builder
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
