export type LoginCredentials = {
  email: string;
  password: string;
};

export type SignupCredentials = {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  birthdate: string;
};

export type SuccessLoginResponse = {
  firstname: string;
  lastname: string;
  email: string;
  token: string;
  logged: boolean;
};
