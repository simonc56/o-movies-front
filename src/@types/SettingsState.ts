export type SettingsState = {
  user: UserType;
};

export type UserType = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  birthdate: string;
  logged: boolean;
  token: string;
};
