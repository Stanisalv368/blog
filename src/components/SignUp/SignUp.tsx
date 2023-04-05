import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

import { routes } from "../../routes/routes";
import { CreateUserType } from "../../Types";
import { signUpSchema } from "../../yup/yup";
import { createUser } from "../../store/UserSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";

import style from "./SignUp.module.scss";

const SignUp = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { email, username } = useAppSelector((state) => state.User.error);
  const isLoad = useAppSelector((state) => state.User.isLoad);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateUserType>({ mode: "onBlur", resolver: yupResolver(signUpSchema) });

  const unSubmit: SubmitHandler<CreateUserType> = (data) => {
    dispatch(createUser(data)).then((res) => {
      if (res.type === "user/createUser/rejected") {
        console.log("q");
      } else {
        navigate(routes.signIn);
      }
    });
  };

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return (
    <div className={style.container}>
      <div className={style.load}>
        <Spin indicator={antIcon} spinning={isLoad} />
      </div>
      <span className={style.title}>Create new account</span>
      <form className={style.form} onSubmit={handleSubmit(unSubmit)}>
        <label className={style.formbox}>
          <span>User name</span>
          <input {...register("username")} placeholder="User name"></input>
          {errors?.username && <span className={style.errorMessage}>{errors?.username?.message}</span>}
          {username !== "" && <span className={style.errorMessage}>username существует</span>}
        </label>
        <label className={style.formbox}>
          <span>Email address</span>
          <input type="email" {...register("email")} placeholder="Email address"></input>
          {errors?.email && <span className={style.errorMessage}>{errors?.email?.message} </span>}
          {email !== "" && <span className={style.errorMessage}>email существует</span>}
        </label>
        <label className={style.formbox}>
          <span>Password</span>
          <input type="password" {...register("password")} placeholder="Password"></input>
          <div className={style.errorMessage}>{errors?.password && <span>{errors?.password?.message} </span>}</div>
        </label>
        <label className={style.formbox}>
          <span>Repeat password</span>
          <input type="password" {...register("repeatPassword")} placeholder="Repeat password"></input>
          <div className={style.errorMessage}>
            {errors?.repeatPassword && <span>{errors?.repeatPassword?.message} </span>}
          </div>
        </label>
        <label className={style.checkbox}>
          <input type="checkbox" {...register("checkbox")}></input>
          <span className={style.checkBoxLable}>I agree to the processing of my personal information</span>
        </label>
        {errors?.checkbox && <div className={style.errorMessage}>you have not read the information</div>}
        <input type="submit" className={style.submit} value={"Create"}></input>
        <span className={style.newAcc}>
          Already have an account?{" "}
          <Link className={style.link} to={routes.signIn}>
            Sign In.
          </Link>
        </span>
      </form>
    </div>
  );
};

export default SignUp;
