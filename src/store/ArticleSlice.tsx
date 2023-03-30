import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { ArticlesStateType, DeleteArticleType } from "../Types";
import ServicesArticle from "../services/ServicesArticle";

const initialState: ArticlesStateType = {
  articles: [],
  articlesCount: 0,
  article: {
    author: { username: "", image: "", following: false },
    body: "",
    createdAt: "",
    description: "",
    favorited: false,
    favoritesCount: 0,
    slug: "",
    tagList: [""],
    title: "",
    updatedAt: "",
  },
  author: "",
  isLoad: false,
  reload: false,
  page: 1,
};

const ServiceArticle = new ServicesArticle();

export const getArticles = createAsyncThunk<ArticlesStateType, any>(
  "articles/getPosts",
  async function ({ page, token }) {
    return ServiceArticle.getArticles(page, token);
  }
);

export const getArticle = createAsyncThunk<any, any>("articles/getArticle", async function ({ slug, token }) {
  return ServiceArticle.getArticle({ slug, token });
});

export const createArticle = createAsyncThunk<any, any>("article,createArticle", async function ({ data, token }) {
  return ServiceArticle.createArticle(data, token);
});

export const deleteArticle = createAsyncThunk<any, any>("articles/deleteArticle", async function ({ slug, token }) {
  return ServiceArticle.deleteArticle(slug, token);
});

export const updateArticle = createAsyncThunk<ArticlesStateType, any>(
  "articleSlice/updateArticle",
  async function ({ data, token, slug }) {
    return ServiceArticle.articleUpdate({ data, token, slug });
  }
);

export const likeArticle = createAsyncThunk<ArticlesStateType, DeleteArticleType>(
  "articleSlice/likeArticle",
  async (value) => ServiceArticle.articleLike(value)
);

export const likeDelete = createAsyncThunk<ArticlesStateType, DeleteArticleType>(
  "articleSlice/likeDelete",
  async (value) => ServiceArticle.deleteLike(value)
);

const ArticlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    changePage(state, action) {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getArticles.fulfilled, (state, action) => {
        state.articles = action.payload.articles;
        state.articlesCount = action.payload.articlesCount;
      })
      .addCase(getArticle.pending, (state) => {
        state.isLoad = true;
      })
      .addCase(getArticle.fulfilled, (state, action) => {
        state.article = action.payload.article;
        state.author = action.payload.article.author.username;
        state.isLoad = false;
      })
      .addCase(createArticle.pending, (state) => {
        state.isLoad = true;
      })
      .addCase(createArticle.fulfilled, (state) => {
        state.isLoad = false;
        state.reload = !state.reload;
      })
      .addCase(deleteArticle.pending, (state) => {
        state.isLoad = true;
      })
      .addCase(deleteArticle.fulfilled, (state) => {
        state.isLoad = false;
        state.reload = !state.reload;
      })
      .addCase(updateArticle.pending, (state) => {
        state.isLoad = true;
      })
      .addCase(updateArticle.fulfilled, (state) => {
        state.isLoad = false;
        state.reload = !state.reload;
      })
      .addCase(likeArticle.fulfilled, (state, action) => {
        state.article = action.payload.article;
        state.reload = !state.reload;
      })
      .addCase(likeDelete.fulfilled, (state, action) => {
        state.article = action.payload.article;
        state.reload = !state.reload;
      });
  },
});

export const { changePage } = ArticlesSlice.actions;

export default ArticlesSlice.reducer;
