import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SuccessLoginResponse } from '../@types/Credentials';
import type { RootState } from '../store/store';
import { getInitialSettingsState, removeStoreUser, setStoreUser } from '../utils/localStorage';

const settingsSlice = createSlice({
  name: 'settings',
  initialState: getInitialSettingsState,
  reducers: {
    logout: (state) => {
      state.user.firstname = '';
      state.user.lastname = '';
      state.user.email = '';
      state.user.password = '';
      state.user.birthdate = '';
      state.user.logged = false;
      state.user.token = '';
      removeStoreUser();
    },
    login: (state, action: PayloadAction<SuccessLoginResponse>) => {
      const { firstname, lastname, email, token } = action.payload;
      state.user.token = token;
      state.user.firstname = firstname;
      state.user.lastname = lastname;
      state.user.email = email;
      state.user.logged = true;
      setStoreUser(state.user);
    },
    updateToken: (state, action: PayloadAction<string>) => {
      state.user.token = action.payload;
      setStoreUser(state.user);
    },
  },
});

export const selectUser = (state: RootState) => state.settings.user;

export default settingsSlice.reducer;

export const { logout, login, updateToken } = settingsSlice.actions;
