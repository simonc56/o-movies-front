import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { SuccessLoginResponse } from '../@types/Credentials';
import { SettingsState } from '../@types/SettingsState';
import * as api from '../api';
import type { RootState } from '../store/store';
import { getStoreUser, removeStoreUser, setStoreUser } from '../utils/utils';

const settingsState: SettingsState = {
  user: {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    birthdate: '',
    logged: false,
    token: '',
  },
  successMessage: null,
  errorMessage: null,
};

export const actionLogin = createAsyncThunk('settings/login', async (_, thunkAPI) => {
  const state = thunkAPI.getState() as RootState;
  const { email, password } = state.settings.user;
  const response = await api.login({ email, password });
  return response.data;
});

export const actionSignup = createAsyncThunk('settings/signup', async (_, thunkAPI) => {
  const state = thunkAPI.getState() as RootState;
  const { email, password, firstname, lastname, birthdate } = state.settings.user;
  const response = await api.register({ email, password, firstname, lastname, birthdate });
  return response.data;
});

const settingsSlice = createSlice({
  name: 'settings',
  initialState: settingsState,
  reducers: {
    loadStoreUser: (state) => {
      const user = getStoreUser();
      if (user) {
        state.user = user;
      }
    },
    logout: (state) => {
      state.user.firstname = '';
      state.user.lastname = '';
      state.user.email = '';
      state.user.password = '';
      state.user.birthdate = '';
      state.user.logged = false;
      state.user.token = '';
      api.removeTokenJWTToAxiosInstance();
      removeStoreUser();
    },
    editFirstname: (state, action: PayloadAction<string>) => {
      state.user.firstname = action.payload;
    },
    editLastName: (state, action: PayloadAction<string>) => {
      state.user.lastname = action.payload;
    },
    editEmail: (state, action: PayloadAction<string>) => {
      state.user.email = action.payload;
    },
    editPassword: (state, action: PayloadAction<string>) => {
      state.user.password = action.payload;
    },
    editBirthdate: (state, action: PayloadAction<string>) => {
      state.user.birthdate = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(actionLogin.fulfilled, (state, action) => {
        const response = action.payload.data as SuccessLoginResponse;
        state.user.firstname = response.firstname;
        state.user.lastname = response.lastname;
        state.user.birthdate = response.birthdate;
        state.user.token = response.token;
        state.user.logged = true;
        state.user.password = '';
        api.addTokenJWTToAxiosInstance(response.token);
        setStoreUser(state.user);
        state.errorMessage = null;
        state.successMessage = "Vous êtes connecté. Redirection vers la page d'accueil...";
      })
      .addCase(actionLogin.rejected, (state, action) => {
        state.successMessage = null;
        if (action.error.code === 'ERR_NETWORK') {
          state.errorMessage = 'Impossible de se connecter. Veuillez vérifier votre connexion Internet.';
          return;
        }
        state.errorMessage = "Impossible de se connecter. Veuillez vérifier vos informations d'identification.";
      })
      .addCase(actionSignup.fulfilled, (state, action) => {
        const response = action.payload as SuccessLoginResponse;
        // renvoyer un message de confirmation
      })
      .addCase(actionSignup.rejected, (_, action) => {
        // eslint-disable-next-line no-console
        console.log(action.error.message);
      });
  },
});

export const selectUser = (state: RootState) => state.settings.user;

export default settingsSlice.reducer;

export const { loadStoreUser, logout, editEmail, editPassword, editFirstname, editLastName, editBirthdate } =
  settingsSlice.actions;
