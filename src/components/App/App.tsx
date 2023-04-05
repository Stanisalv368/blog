import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "../Header/Header";
import ArticleList from "../ArticleList/ArticleList";
import Article from "../Article/Article";
import SignIn from "../SignIn/SignIn";
import SignUp from "../SignUp/SignUp";
import ArticleForm from "../ArticleForm/ArticleForm";
import EditProfileForm from "../EditProfileForm/EditProfileForm";
import { getArticles } from "../../store/ArticleSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { routes } from "../../routes/routes";
import { loginUSer } from "../../store/UserSlice";

import style from "./App.module.scss";

const App = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.User.user.token);
  const reloadPage = useAppSelector((state) => state.User.reloadPage);
  const { reload, page } = useAppSelector((state) => state.Articles);

  useEffect(() => {
    dispatch(getArticles({ page, token }));
  }, [dispatch, reload, reloadPage]);

  useEffect(() => {
    if (localStorage.getItem("email")) {
      const user: any = {
        email: localStorage.getItem("email"),
        password: localStorage.getItem("password"),
      };
      dispatch(loginUSer(user));
    }
  }, []);

  return (
    <div className={style.container}>
      <Header />
      <Routes>
        <Route path={routes.home} element={<ArticleList />} />
        <Route path={`${routes.article}:slug`} element={<Article />} />
        <Route path={routes.signIn} element={<SignIn />} />
        <Route path={routes.signUp} element={<SignUp />} />
        <Route path={routes.createArticle} element={<ArticleForm />} />
        <Route path={routes.editProfile} element={<EditProfileForm />} />
        <Route path={`${routes.createArticle}:edit`} element={<ArticleForm />} />
      </Routes>
    </div>
  );
};

export default App;
