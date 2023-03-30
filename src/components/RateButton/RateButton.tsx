import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { Button } from "antd";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { likeArticle, likeDelete } from "../../store/ArticleSlice";

import style from "./RateButton.module.scss";

type RateType = {
  slug: any;
  favorited: boolean;
  favoritesCount: number;
};

const RateButton = ({ favoritesCount, favorited, slug }: RateType) => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.User.user);

  const onLike = () => {
    if (favorited) dispatch(likeDelete({ token, slug }));
    else dispatch(likeArticle({ token, slug }));
  };

  const iconLike = favorited ? <HeartFilled style={{ color: "red" }} /> : <HeartOutlined style={{ color: "gray" }} />;

  return (
    <div className={style.container}>
      <Button type="text" shape="circle" onClick={onLike} disabled={!token && true} icon={iconLike} />
      <div>{favoritesCount}</div>
    </div>
  );
};

export default RateButton;
