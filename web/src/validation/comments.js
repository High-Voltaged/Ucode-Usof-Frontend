import * as Yup from "yup";
import { CONTENT_LIMITS } from "~/consts/validation";

const content = Yup.string().min(CONTENT_LIMITS[0]).max(CONTENT_LIMITS[1]);

export const createSchema = Yup.object().shape({
  content: content.required(),
});

export const updateSchema = Yup.object().shape({
  content,
});
