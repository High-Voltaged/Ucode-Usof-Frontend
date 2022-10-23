import * as Yup from "yup";
import { CONTENT_LIMITS } from "~/consts/validation";

export const createSchema = Yup.object().shape({
  content: Yup.string()
    .min(CONTENT_LIMITS[0])
    .max(CONTENT_LIMITS[1])
    .required(),
});
