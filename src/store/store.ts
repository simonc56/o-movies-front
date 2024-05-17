import { configureStore } from '@reduxjs/toolkit';

import settingsReducer from '../features/settingsSlice';

const store = configureStore({ reducer: { settings: settingsReducer } });

export default store;

export type RootState = ReturnType<typeof store.getState>;
// on recupere le type de la fonction dispatch du store dans AppDispatch
export type AppDispatch = typeof store.dispatch;
