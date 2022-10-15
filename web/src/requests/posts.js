import { axiosClient } from "~/utils/axios-client";

const PREFIX = "posts";

class PostsRequests {
  static getAll({ page, sort } = {}) {
    return axiosClient.get(`/${PREFIX}`, { params: { page, sort } });
  }

  static getPost(id) {
    return axiosClient.get(`/${PREFIX}/${id}`);
  }

  static getPostCategories(id) {
    return axiosClient.get(`/${PREFIX}/${id}/categories`);
  }
}

export default PostsRequests;
