import axios from "axios";

import { CreateArticleType, DeleteArticleType } from "../Types";

export default class ServicesArticle {
  BaseUrl = "https://blog.kata.academy/api/";

  async getArticles(page: number, token: string) {
    const set = page > 1 ? 5 * (page - 1) : 0;
    return axios({
      url: `${this.BaseUrl}articles?offset=${set}&limit=5`,
      headers: {
        Authorization: `Token ${token}`,
      },
    }).then((response) => response.data);
  }

  async getArticle({ slug, token }: any) {
    return axios({
      url: `${this.BaseUrl}articles/${slug}`,
      headers: {
        Authorization: `Token ${token}`,
      },
    }).then((response) => response.data);
  }

  async createArticle(data: CreateArticleType, token: string) {
    return axios({
      method: "POST",
      url: `${this.BaseUrl}articles`,
      headers: {
        Authorization: `Token ${token}`,
      },
      data: {
        article: {
          title: data.title,
          description: data.description,
          body: data.body,
          tagList: data.tagLists,
        },
      },
    }).then((response) => response.data);
  }

  async deleteArticle(slug: string, token: string) {
    return axios({
      method: "DELETE",
      url: `${this.BaseUrl}articles/${slug}`,
      headers: {
        Authorization: `Token ${token}`,
      },
    }).then((response) => response.data);
  }

  async articleUpdate({ data, token, slug }: any) {
    return axios({
      method: "PUT",
      url: `${this.BaseUrl}articles/${slug}`,
      headers: {
        Authorization: `Token ${token}`,
      },
      data: {
        article: {
          title: data.title,
          description: data.description,
          body: data.body,
          tagList: data.tagLists,
        },
      },
    }).then((response) => response.data);
  }

  async articleLike(value: DeleteArticleType) {
    return axios({
      method: "POST",
      url: `${this.BaseUrl}articles/${value.slug}/favorite`,
      headers: {
        Authorization: `Token ${value.token}`,
      },
    }).then((response) => response.data);
  }

  async deleteLike(value: DeleteArticleType) {
    return axios({
      method: "DELETE",
      url: `${this.BaseUrl}articles/${value.slug}/favorite`,
      headers: {
        Authorization: `Token ${value.token}`,
      },
    }).then((response) => response.data);
  }
}
