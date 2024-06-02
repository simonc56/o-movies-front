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
  birthdate: string;
  token: string;
};
export type SuccessProfilResponse = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  birthdate: string;
  created_at: string;
  updated_at: string;
  count_review: number;
  count_rating: number;
};
