import { axiosClient } from "~/utils/axios-client";

const PREFIX = "posts";

class PostsRequests {
  static getAll({ page, sort } = {}) {
    return axiosClient.get(`/${PREFIX}`, { params: { page, sort } });
  }
}

export default PostsRequests;
