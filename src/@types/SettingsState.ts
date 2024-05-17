export type SettingsState = {
  user: {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    birthdate: string;
    logged: boolean;
    token: string;
  };
};
