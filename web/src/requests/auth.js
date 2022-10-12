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

  static confirmEmail({ confirmToken }) {
    return axiosClient.post(`/${PREFIX}/confirm-email/${confirmToken}`);
  }

  static logout() {
    return axiosClient.post(`/${PREFIX}/logout/`);
  }
}

export default AuthRequests;
