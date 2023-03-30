import React, { useEffect, useState } from "react";
import { v4 } from "uuid";

import style from "./TagList.module.scss";

const TagList = ({ getTagList, tagList }: any) => {
  const [taglist, setTaglist] = useState([{ value: "", id: v4() }]);

  useEffect(() => {
    if (tagList.length > 0) {
      setTaglist(
        tagList.map((el: string) => {
          return { value: el, id: v4() };
        })
      );
    }
  }, [tagList]);

  const deleteTag = (id: string) => {
    const newTahList = taglist.filter((el) => el.id !== id);
    setTaglist(newTahList);
  };

  const updateTag = (value: string, id: string) => {
    const idx = taglist.findIndex((el) => el.id === id);
    const oldItem = taglist[idx];
    const newItem = { ...oldItem, value: value };
    const newTagList = [...taglist.slice(0, idx), newItem, ...taglist.slice(idx + 1)];
    setTaglist(newTagList);
    getTagList(newTagList);
  };

  const tags = taglist.map((el) => {
    return (
      <div className={style.tagBox} key={el.id}>
        <input value={el.value} placeholder="tag" onChange={(e) => updateTag(e.target.value, el.id)}></input>
        <button type="button" className={style.buttonDelete} onClick={() => deleteTag(el.id)}>
          Delete
        </button>
      </div>
    );
  });

  return (
    <React.Fragment>
      {tags}
      <button type="button" className={style.addTag} onClick={() => setTaglist([...taglist, { value: "", id: v4() }])}>
        Add Tag
      </button>
    </React.Fragment>
  );
};

export default TagList;
