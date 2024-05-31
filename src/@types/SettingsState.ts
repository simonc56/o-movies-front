export type SettingsState = {
  user: UserType;
  successMessage: string | null;
  errorMessage: string | null;
  isLocalStorageRead: boolean;
};

export type UserType = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  birthdate: string;
  logged: boolean;
  token: string;
  commentCount?: number;
  ratingCount?: number;
};
