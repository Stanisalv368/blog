export type ArticlesStateType = {
  articles: Array<ArticleType>;
  articlesCount: number;
  article: ArticleType;
  author: string;
  isLoad: boolean;
  reload: boolean;
  page: number;
};

export type AuthorType = {
  username: string;
  image: string;
  following: boolean;
};

export type ArticleType = {
  author: AuthorType;
  body: string;
  createdAt: string;
  description: string;
  favorited: boolean;
  favoritesCount: number;
  slug: string;
  tagList: Array<string>;
  title: string;
  updatedAt: string;
};

export type GetArticlesType = {
  value: number;
};

export type CreateUserType = {
  email: string;
  password: string;
  username: string;
  repeatPassword: string;
  checkbox: boolean;
};

export type EditProfileType = {
  email: string;
  newPassword: string;
  username: string;
  avatarUrl: string;
};

export type LoginUserType = {
  email: string;
  password: string;
};

export type UserType = {
  email: string;
  password: string;
  username: string;
  repeatPassword: string;
};

export type UserStateType = {
  isLogin: boolean;
  user: {
    token: string;
    username: string;
    email: string;
    image: string;
  };
  error: { username?: string; email?: string };
  isLoad: boolean;
  reloadPage: boolean;
};

export type UserUpdateType = {
  email: string;
  newPassword: string;
  username: string;
  avatarUrl: string;
};

export type CreateArticleType = {
  title: string;
  description: string;
  body: string;
  tagLists: Array<string>;
};

export type TagType = {
  valeu: string;
  id: string;
};

export type ArticleMiniType = {
  title: string;
  description: string;
  body: string;
};

export type UpdateArticleType = {
  article: ArticleMiniType;
  token: string;
  slug: string;
  tagList: Array<string>;
};

export type DeleteArticleType = {
  slug: string;
  token: string;
};
