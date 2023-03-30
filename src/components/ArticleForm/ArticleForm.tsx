import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { createArticle, updateArticle } from "../../store/ArticleSlice";
import { CreateArticleType } from "../../Types";
import { path } from "../../path/path";
import { createArticleSchema } from "../../yup/yup";
import TagList from "../TagList/TagList";

import style from "./ArticleForm.module.scss";

const ArticleForm = () => {
  const user = useAppSelector((state) => state.User.user);
  const { title, description, body, tagList, slug } = useAppSelector((state) => state.Articles.article);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { edit } = useParams();

  const visibl = edit === "edit";

  const [tagLists, setTagList] = useState<string[]>([]);

  const getTagList = (taglist: any) => {
    setTagList(taglist.map((el: { value: string }) => el.value));
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<CreateArticleType>({ mode: "onBlur", resolver: yupResolver(createArticleSchema) });

  const unSubmit: SubmitHandler<CreateArticleType> = (article) => {
    const data = { ...article, tagLists };
    if (visibl) {
      dispatch(updateArticle({ data, token: user.token, slug })).then(() => navigate(path.home));
    } else {
      dispatch(createArticle({ data, token: user.token })).then(() => navigate(path.home));
    }
  };

  useEffect(() => {
    if (visibl) {
      setValue("title", title);
      setValue("description", description);
      setValue("body", body);
    }
  }, [visibl]);

  return (
    <div className={style.container}>
      <span className={style.title}>{visibl ? "Edit article" : "Create new article"}</span>
      <form className={style.form} onSubmit={handleSubmit(unSubmit)}>
        <label className={style.formbox}>
          <span> title</span>
          <input placeholder="title" {...register("title")}></input>
          {errors?.title && <span className={style.errorMessage}>{errors?.title?.message}</span>}
        </label>
        <label className={style.formbox}>
          <span> Short description</span>
          <input placeholder="Short description" {...register("description")}></input>
          {errors?.description && <span className={style.errorMessage}>{errors?.description?.message}</span>}
        </label>
        <label className={style.formBoxTextarea}>
          <span>Text</span>
          <input className={style.textarea} type="textarea" placeholder="text" {...register("body")}></input>
          {errors?.body && <span className={style.errorMessage}>{errors?.body?.message}</span>}
        </label>
        <span className={style.spanText}>Tags</span>
        <TagList getTagList={getTagList} tagList={tagList} />
        <input className={style.submitt} type="submit" value="Send"></input>
      </form>
    </div>
  );
};

export default ArticleForm;
