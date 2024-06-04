export type SettingsState = {
  user: UserType;
  successMessage: string | null;
  errorMessage: string | null;
};

export type UserType = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  birthdate: string;
  logged: boolean;
  token: string;
  subscriptionDate?: string;
  commentCount?: number;
  ratingCount?: number;
};
