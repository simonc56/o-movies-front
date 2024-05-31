import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PlaylistState } from '../@types/PlaylistState';
import * as api from '../api';
// import type { RootState } from '../store/store';

const playlistState: PlaylistState = {
  currentPlaylist: [],
  userPlaylists: [],
  hasFetchUserPlaylists: false,
};

// thunk types: createAsyncThunk<returned object type, received arg type>
export const actionFetchUserPlaylists = createAsyncThunk('playlist/fetchUserPlaylists', async (id, thunkAPI) => {
  const response = await api.getUserPlaylists();
  return response.data;
});

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
