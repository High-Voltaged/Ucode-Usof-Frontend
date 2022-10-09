import { axiosClient } from "~/utils/axios-client";

const PREFIX = "auth";

class AuthRequests {
  static login(data) {
    return axiosClient.post(`/${PREFIX}/login`, data);
  }

  static register(data) {
    return axiosClient.post(`/${PREFIX}/register`, data);
  }
}

export default AuthRequests;
