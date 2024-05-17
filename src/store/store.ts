import { configureStore } from '@reduxjs/toolkit';

import moviesReducer from '../features/moviesSlice';
import settingsReducer from '../features/settingsSlice';

const store = configureStore({ reducer: { settings: settingsReducer, movies: moviesReducer } });

export default store;

export type RootState = ReturnType<typeof store.getState>;
// on recupere le type de la fonction dispatch du store dans AppDispatch
export type AppDispatch = typeof store.dispatch;
