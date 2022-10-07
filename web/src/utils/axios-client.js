import axios from "axios";
import { SERVER_URL } from "~/consts/utils";

export const axiosClient = axios.create({
  baseURL: `${SERVER_URL}/api`,
  withCredentials: true,
});
