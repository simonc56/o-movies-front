export type SettingsState = {
  user: UserType;
  news: NewsType;
};

export type UserType = {
  firstname: string;
  lastname: string;
  email: string;
  birthdate: string;
  logged: boolean;
  token: string;
  created_at?: string;
  count_review?: number;
  count_rating?: number;
};

export type NewsType = {
  rssFeedUrl: string;
  quantity: number;
  forbiddenWords: string[];
  allNews: News[];
};

export type News = {
  title: string;
  pubDate: string;
  description: string;
  guid: string;
};
