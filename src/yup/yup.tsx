import * as yup from "yup";

export const signUpSchema = yup.object().shape({
  username: yup.string().min(3).max(20).required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).max(40).required(),
  repeatPassword: yup.string().required(),
  checkbox: yup.boolean().oneOf([true]).required(),
});

export const signInSchema = yup.object().shape({
  email: yup.string().min(3).max(20).required(),
  password: yup.string().min(6).max(40).required(),
});

export const editProfileSchema = yup.object().shape({
  username: yup.string().required(),
  email: yup.string().email().required(),
  newPassword: yup.string().min(6).max(40),
  avatarUrl: yup.string().required(),
});

export const createArticleSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  body: yup.string().required(),
});
