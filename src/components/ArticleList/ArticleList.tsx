import { Pagination } from "antd";
import React from "react";
import { v4 } from "uuid";

import { getArticles, changePage } from "../../store/ArticleSlice";
import ArticleItem from "../ArticleItem/ArticleItem";
import { useAppSelector, useAppDispatch } from "../../hooks";

import style from "./ArticleList.module.scss";

const ArticleList = () => {
  const { articles, articlesCount } = useAppSelector((state) => state.Articles);
  const { token } = useAppSelector((state) => state.User.user);

  const dispatch = useAppDispatch();

  const newPage = (page: number) => {
    dispatch(changePage(page));
    dispatch(getArticles({ page, token }));
  };
  return (
    <ul className={style.container}>
      {articles.map((el) => (
        <li key={v4()}>
          <ArticleItem {...el} />
        </li>
      ))}
      {articlesCount > 5 && (
        <Pagination
          defaultCurrent={1}
          total={articlesCount}
          defaultPageSize={5}
          onChange={newPage}
          showSizeChanger={false}
          hideOnSinglePage
        />
      )}
    </ul>
  );
};

export default ArticleList;
