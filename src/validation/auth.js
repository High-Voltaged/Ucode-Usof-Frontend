import * as Yup from "yup";
import { NAME_LIMITS, PASSWORD_LIMITS } from "~/consts/validation";

export const loginSchema = Yup.object().shape({
  login: Yup.string().required(),
  password: Yup.string().required(),
});

export const registerSchema = Yup.object().shape({
  login: Yup.string().required().min(NAME_LIMITS[0]).max(NAME_LIMITS[1]),
  email: Yup.string().email().required(),
  password: Yup.string()
    .required()
    .min(PASSWORD_LIMITS[0])
    .max(PASSWORD_LIMITS[1]),
  passwordConfirm: Yup.string()
    .required()
    .min(PASSWORD_LIMITS[0])
    .max(PASSWORD_LIMITS[1])
    .oneOf([Yup.ref("password")], "Passwords must match"),
  fullName: Yup.string().min(NAME_LIMITS[0]).max(NAME_LIMITS[1]),
});

export const forgotPassSchema = Yup.object().shape({
  email: Yup.string().email().required(),
});

export const resetPassSchema = Yup.object().shape({
  password: Yup.string()
    .required()
    .min(PASSWORD_LIMITS[0])
    .max(PASSWORD_LIMITS[1]),
});

export const updateProfileSchema = Yup.object().shape({
  login: Yup.string().min(NAME_LIMITS[0]).max(NAME_LIMITS[1]),
  email: Yup.string().email(),
  fullName: Yup.string().min(NAME_LIMITS[0]).max(NAME_LIMITS[1]),
});
