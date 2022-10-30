import * as Yup from "yup";
import { CONTENT_LIMITS, TITLE_LIMITS } from "~/consts/validation";

const baseSchema = {
  title: Yup.string().min(TITLE_LIMITS[0]).max(TITLE_LIMITS[1]),
  content: Yup.string().min(CONTENT_LIMITS[0]).max(CONTENT_LIMITS[1]),
  categories: Yup.array()
    .of(
      Yup.object().shape({
        label: Yup.string(),
        value: Yup.string(),
      })
    )
    .min(1, "provide at least one category"),
};

const baseWithRequired = Object.fromEntries(
  Object.entries(baseSchema).map(([key, value]) => [key, value.required()])
);

export const createSchema = Yup.object().shape({
  ...baseWithRequired,
});

export const editSchema = Yup.object().shape({
  ...baseSchema,
});
