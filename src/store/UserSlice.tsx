import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { AnyAction } from "@reduxjs/toolkit";

import ServiceUSer from "../services/ServiceUser";
import { CreateUserType, LoginUserType, UserStateType } from "../Types";

const initialState: UserStateType = {
  isLogin: false,
  user: {
    token: "",
    username: "",
    email: "",
    image: "",
  },
  error: { username: "", email: "" },
  isLoad: false,
  reloadPage: false,
};

const userService = new ServiceUSer();

export const createUser = createAsyncThunk<any, CreateUserType>(
  "user/createUser",
  async function (data, { rejectWithValue }) {
    return userService.createUser(data, { rejectWithValue });
  }
);

export const loginUSer = createAsyncThunk<any, LoginUserType>(
  "user/loginUser",
  async function (data, { rejectWithValue }) {
    return userService.loginUser(data, { rejectWithValue });
  }
);

export const updateUser = createAsyncThunk<any, any>("user/updateUser", async function ({ data, token }) {
  return userService.updateUSer(data, token);
});

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginChange(state) {
      localStorage.removeItem("email");
      localStorage.removeItem("password");
      state.isLogin = false;
      state.reloadPage = !state.reloadPage;
      state.user = { token: "", username: "", email: "", image: "" };
    },
  },
  extraReducers: (duilder) => {
    duilder
      .addCase(loginUSer.pending, (state) => {
        state.isLoad = true;
      })
      .addCase(loginUSer.fulfilled, (state, actions) => {
        state.isLogin = !state.isLogin;
        state.user = actions.payload.user;
        state.isLoad = false;
        state.reloadPage = !state.reloadPage;
      })
      .addCase(createUser.pending, (state) => {
        state.isLoad = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        console.log(action.payload.user);
        state.user = action.payload.user;
        state.isLoad = false;
      })
      .addCase(createUser.rejected, (state, action: any) => {
        state.error = action.payload.errors;
        state.isLoad = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      });
  },
});

export const { loginChange } = UserSlice.actions;

export default UserSlice.reducer;
