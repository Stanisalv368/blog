import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { EditProfileType } from "../../Types";
import { path } from "../../path/path";
import { editProfileSchema } from "../../yup/yup";
import { updateUser } from "../../store/UserSlice";

import style from "./EditProfileForm.module.scss";

const EditProfileForm = () => {
  const user = useAppSelector((state) => state.User.user);
  const dispath = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<EditProfileType>({ mode: "onBlur", resolver: yupResolver(editProfileSchema) });

  const unSubmit: SubmitHandler<EditProfileType> = (data) => {
    dispath(updateUser({ data, token: user.token })).then(() => navigate(path.home));
  };

  useEffect(() => {
    setValue("username", user.username);
    setValue("email", user.email);
  }, [setValue, user]);

  return (
    <div className={style.container}>
      <span className={style.title}>Edit Profile</span>
      <form className={style.form} onSubmit={handleSubmit(unSubmit)}>
        <label className={style.formbox}>
          <span>User name</span>
          <input {...register("username")} placeholder="User name"></input>
          {errors?.username && <span className={style.errorMessage}>{errors?.username?.message}</span>}
        </label>
        <label className={style.formbox}>
          <span>Email address</span>
          <input {...register("email")} placeholder="Email address"></input>
          <div className={style.errorMessage}>{errors?.email && <span>{errors?.email?.message} </span>}</div>
        </label>
        <label className={style.formbox}>
          <span>Password</span>
          <input {...register("newPassword")} placeholder="New password"></input>
          <div className={style.errorMessage}>
            {errors?.newPassword && <span>{errors?.newPassword?.message} </span>}
          </div>
        </label>
        <label className={style.formbox}>
          <span>Avatar image (url)</span>
          <input {...register("avatarUrl")} placeholder="Avatar image (url)"></input>
          <div className={style.errorMessage}>{errors?.avatarUrl && <span>{errors?.avatarUrl?.message} </span>}</div>
        </label>
        <input type="submit" className={style.submit} value={"Create"}></input>
      </form>
    </div>
  );
};

export default EditProfileForm;
