import { createListenerMiddleware } from '@reduxjs/toolkit';
import { moviesApiSlice } from '../features/moviesApiSlice';
import { playlistApiSlice } from '../features/playlistApiSlice';
import { logout } from '../features/settingsSlice';

export const logoutListener = createListenerMiddleware();

// This listener will invalidate the cache for the MovieUserdata
// and Playlists tags when the logout action is dispatched
logoutListener.startListening({
  actionCreator: logout,
  effect: async (_action, listenerApi) => {
    listenerApi.dispatch(moviesApiSlice.util.invalidateTags(['MovieUserdata']));
    listenerApi.dispatch(playlistApiSlice.util.invalidateTags(['Playlists']));
  },
});
