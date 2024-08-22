import { configureStore } from '@reduxjs/toolkit';
import { axiosInterceptor } from '../apiHandler/api';
import apiSlice from '../apiHandler/apiSlice';
import settingsReducer from '../features/settingsSlice';

const store = configureStore({
  reducer: {
    settings: settingsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

axiosInterceptor(store);

export default store;

export type RootState = ReturnType<typeof store.getState>;
// on recupere le type de la fonction dispatch du store dans AppDispatch
export type AppDispatch = typeof store.dispatch;
