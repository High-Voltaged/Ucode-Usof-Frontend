import * as Yup from "yup";
import { CONTENT_LIMITS, TITLE_LIMITS } from "~/consts/validation";

export const createSchema = Yup.object().shape({
  title: Yup.string().min(TITLE_LIMITS[0]).max(TITLE_LIMITS[1]).required(),
  content: Yup.string()
    .min(CONTENT_LIMITS[0])
    .max(CONTENT_LIMITS[1])
    .required(),
  categories: Yup.array()
    .of(
      Yup.object().shape({
        label: Yup.string().required(),
        value: Yup.string().required(),
      })
    )
    .min(1, "provide at least one category"),
});
