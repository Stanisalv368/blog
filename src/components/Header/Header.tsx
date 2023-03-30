import React from "react";
import { Link } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

import { path } from "../../path/path";
import { useAppSelector } from "../../hooks";
import UserProfile from "../UserProfile/UserProfile";

import style from "./Header.module.scss";

const Header = () => {
  const { isLogin } = useAppSelector((state) => state.User);
  const isLoad = useAppSelector((state) => state.Articles.isLoad);

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return (
    <div className={style.header}>
      <Link to={path.home}>Realworld Blog</Link>
      <div className={style.load}>
        <Spin indicator={antIcon} spinning={isLoad} />
      </div>
      {!isLogin ? (
        <React.Fragment>
          <Link to={path.signIn}>Sign In</Link>
          <Link to={path.signUp}>Sign Up</Link>
        </React.Fragment>
      ) : (
        <UserProfile />
      )}
    </div>
  );
};

export default Header;
