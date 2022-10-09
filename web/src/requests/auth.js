import { axiosClient } from "~/utils/axios-client";

const PREFIX = "auth";

class AuthRequests {
  static login(data) {
    return axiosClient.post(`/${PREFIX}/login`, data);
  }

  static register(data) {
    return axiosClient.post(`/${PREFIX}/register`, data);
  }

  static forgotPassword(data) {
    return axiosClient.post(`/${PREFIX}/password-reset`, data);
  }

  static resetPassword({ resetToken, ...data }) {
    return axiosClient.post(`/${PREFIX}/password-reset/${resetToken}`, data);
  }
}

export default AuthRequests;
