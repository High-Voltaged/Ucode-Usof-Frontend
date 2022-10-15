import { axiosClient } from "~/utils/axios-client";

const PREFIX = "posts";

class PostsRequests {
  static getAll({ page, sort } = {}) {
    return axiosClient.get(`/${PREFIX}`, { params: { page, sort } });
  }

  static async getPost(id) {
    let response = await axiosClient.get(`/${PREFIX}/${id}`);
    if (response.data.id) {
      const { data: categories } = await PostsRequests.getPostCategories(id);
      response.data.categories = categories;

      const { data: likes } = await PostsRequests.getPostLikes(id);
      response.data.likesCount = likes.length;
      response.data.likes = likes;
    }
    return response;
  }

  static getPostLikes(id) {
    return axiosClient.get(`/${PREFIX}/${id}/like`);
  }

  static getPostCategories(id) {
    return axiosClient.get(`/${PREFIX}/${id}/categories`);
  }
}

export default PostsRequests;
