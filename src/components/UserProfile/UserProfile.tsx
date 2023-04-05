import React from "react";
import { Link } from "react-router-dom";

import { routes } from "../../routes/routes";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { loginChange } from "../../store/UserSlice";

import style from "./UserProfile.module.scss";

const UserProfile = () => {
  const { username, image } = useAppSelector((state) => state.User.user);

  const dispatch = useAppDispatch();
  return (
    <div className={style.container}>
      <Link className={style.createArticle} to={routes.createArticle}>
        Create article
      </Link>
      <Link className={style.userBox} to={routes.editProfile}>
        <span>{username}</span>
        <div className={style.imgBox}>
          <img className={style.logo} src={image}></img>
        </div>
      </Link>
      <Link className={style.logOut} to={routes.home} onClick={() => dispatch(loginChange())}>
        Log Out
      </Link>
    </div>
  );
};

export default UserProfile;
