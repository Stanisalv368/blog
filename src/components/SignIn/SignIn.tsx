import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

import { path } from "../../path/path";
import { signInSchema } from "../../yup/yup";
import { LoginUserType } from "../../Types";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { loginUSer } from "../../store/UserSlice";

import style from "./SignIn.module.scss";

const SignIn = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isLoad = useAppSelector((state) => state.User.isLoad);

  const [invalidData, setInvalidData] = useState<boolean>(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginUserType>({ mode: "onBlur", resolver: yupResolver(signInSchema) });

  const unSubmit = (data: any) => {
    dispatch(loginUSer(data)).then((res) => {
      if (res.type === "user/loginUser/rejected") {
        setInvalidData(true);
      } else {
        setInvalidData(false);
        navigate(path.home);
      }
    });
  };

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return (
    <div className={style.container}>
      <div className={style.load}>
        <Spin indicator={antIcon} spinning={isLoad} />
      </div>
      <span className={style.title}>Sign In</span>
      <form className={style.form} onSubmit={handleSubmit(unSubmit)}>
        <label className={style.formbox}>
          <span>Email address</span>
          <input type="email" placeholder="Email address" {...register("email")}></input>
          {errors?.email && <span className={style.errorMessage}>{errors?.email?.message}</span>}
        </label>
        <label className={style.formbox}>
          <span>Password</span>
          <input type="password" placeholder="Password" {...register("password")}></input>
          {errors?.password && <span className={style.errorMessage}>{errors?.password?.message}</span>}
        </label>
        {invalidData && <span className={style.errorMessage}>неверный логин или пароль</span>}
        <input type="submit" className={style.submit} value={"Login"}></input>
        <span className={style.newAcc}>
          Don’t have an account?{" "}
          <Link className={style.link} to={path.signUp}>
            Sign Up.
          </Link>
        </span>
      </form>
    </div>
  );
};

export default SignIn;
