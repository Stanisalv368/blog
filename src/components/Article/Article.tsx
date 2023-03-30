import { format, parseISO } from "date-fns";
import React, { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { v4 } from "uuid";
import { Popconfirm } from "antd";

import Rate from "../RateButton/RateButton";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getArticle, deleteArticle } from "../../store/ArticleSlice";
import { path } from "../../path/path";

import style from "./Article.module.scss";

const Article = () => {
  const userNameArticle = useAppSelector((state) => state.Articles.author);
  const userNameLogin = useAppSelector((state) => state.User.user.username);
  const token = useAppSelector((state) => state.User.user.token);
  const { author, title, favoritesCount, favorited, createdAt, description, body, tagList } = useAppSelector(
    (state) => state.Articles.article
  );

  const { slug } = useParams<string>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const confirm = () => {
    dispatch(deleteArticle({ slug, token })).then(() => navigate(path.home));
  };

  useEffect(() => {
    if (slug) {
      dispatch(getArticle({ slug, token }));
    }
  }, [slug, dispatch]);

  const isLogin = userNameArticle === userNameLogin;

  return (
    <div className={style.container}>
      <div className={style.box}>
        <div className={style.infoArticle}>
          <div className={style.titleBox}>
            <h1 className={style.title}>{title}</h1>
            <div className={style.buttonBox}>
              <Rate favoritesCount={favoritesCount} favorited={favorited} slug={slug} />
            </div>
          </div>
          <ul className={style.tagList}>
            {tagList.map((el) => {
              return (
                <li key={v4()} className={style.tag}>
                  {el}
                </li>
              );
            })}
          </ul>
        </div>
        <div className={style.boxInfiUser}>
          <div className={style.infoUser}>
            <span className={style.name}>{author.username}</span>
            <span className={style.date}>{createdAt && format(parseISO(createdAt), "PP")}</span>
          </div>
          <div className={style.imgBox}>
            <img src={author.image} alt="logo"></img>
          </div>
        </div>
      </div>
      {isLogin && (
        <div className={style.buttonBoxEdit}>
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={confirm}
            okText="Yes"
            cancelText="No"
          >
            <button className={style.buttonDelete} type="button">
              Delete
            </button>
          </Popconfirm>
          <Link className={style.buttonEdit} type="button" to={`${path.createArticle}edit`}>
            Edit
          </Link>
        </div>
      )}
      <span className={style.discription}>{description}</span>
      <ReactMarkdown className={style.body}>{body}</ReactMarkdown>
    </div>
  );
};

export default Article;
