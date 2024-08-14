import { configureStore } from '@reduxjs/toolkit';

import { axiosInterceptor } from '../api';
import moviesReducer from '../features/moviesSlice';
import playlistReducer from '../features/playlistSlice';
import settingsReducer from '../features/settingsSlice';

const store = configureStore({
  reducer: { settings: settingsReducer, movies: moviesReducer, playlist: playlistReducer },
});

axiosInterceptor(store);

export default store;

export type RootState = ReturnType<typeof store.getState>;
// on recupere le type de la fonction dispatch du store dans AppDispatch
export type AppDispatch = typeof store.dispatch;
