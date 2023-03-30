import axios from "axios";

import { CreateUserType, LoginUserType, UserUpdateType } from "../Types";

type RejectedType = { rejectWithValue: (value: unknown) => void };

export default class ServiceUser {
  BaseUrl = "https://blog.kata.academy/api/";

  async createUser(data: CreateUserType, { rejectWithValue }: RejectedType) {
    const user = {
      user: {
        username: data.username,
        email: data.email,
        password: data.password,
      },
    };
    return axios
      .post(`${this.BaseUrl}users`, user)
      .then((res) => res.data)
      .catch((error) => rejectWithValue(error.response.data));
  }

  async loginUser(data: LoginUserType, { rejectWithValue }: any) {
    const dataa = {
      user: {
        email: data.email,
        password: data.password,
      },
    };
    return axios
      .post(`${this.BaseUrl}users/login`, dataa)
      .then((res) => {
        localStorage.setItem("email", data.email);
        localStorage.setItem("password", data.password);
        return res.data;
      })
      .catch((er) => rejectWithValue(er));
  }

  async updateUSer(data: UserUpdateType, token: string) {
    return axios({
      method: "PUT",
      url: `${this.BaseUrl}user`,
      headers: {
        Authorization: `Token ${token}`,
      },
      data: {
        user: {
          email: data.email,
          password: data.newPassword,
          username: data.username,
          image: data.avatarUrl,
        },
      },
    }).then((res) => res.data);
  }
}
