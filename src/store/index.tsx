import { configureStore } from "@reduxjs/toolkit";

import articlesSlice from "./ArticleSlice";
import userSlice from "./UserSlice";

const store = configureStore({
  reducer: {
    Articles: articlesSlice,
    User: userSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
