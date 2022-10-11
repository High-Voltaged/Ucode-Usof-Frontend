import axios from "axios";
import { SERVER_URL } from "~/consts/utils";
import { getLocalStorageItem } from "~/utils/local-storage";

export const axiosClient = axios.create({
  baseURL: `${SERVER_URL}/api`,
  withCredentials: true,
});

axiosClient.interceptors.request.use((req) => {
  const token = getLocalStorageItem("accessToken");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});
