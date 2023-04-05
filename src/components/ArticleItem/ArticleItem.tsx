import { format, parseISO } from "date-fns";
import React from "react";
import { Link } from "react-router-dom";
import { v4 } from "uuid";

import { ArticleType } from "../../Types";
import { routes } from "../../routes/routes";
import RateButton from "../RateButton/RateButton";

import style from "./ArticleItem.module.scss";

const ArticleItem = (props: ArticleType) => {
  const { author, createdAt, title, description, slug, tagList, favoritesCount, favorited } = props;

  const date = format(parseISO(createdAt), "PP");
  return (
    <div className={style.container}>
      <div className={style.containerInfo}>
        <div>
          <div className={style.titleBox}>
            <Link className={style.title} to={`${routes.article}${slug}`}>
              {title}
            </Link>
            <div className={style.buttonBox}>
              <RateButton favoritesCount={favoritesCount} favorited={favorited} slug={slug} />
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
          <span className={style.text}>{description}</span>
        </div>
        <div className={style.info}>
          <div className={style.infoUser}>
            <span className={style.name}>{author.username}</span>
            <span className={style.date}>{date}</span>
          </div>
          <div className={style.imgBox}>
            <img src={author.image} alt="logo"></img>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ArticleItem;
