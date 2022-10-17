import { axiosClient } from "~/utils/axios-client";

const PREFIX = "posts";

class PostsRequests {
  static async getAll({ page, sort } = {}) {
    const response = await axiosClient.get(`/${PREFIX}`, {
      params: { page, sort },
    });
    if (response.data.posts) {
      const posts = response.data.posts;

      await Promise.all(
        posts.map(async (post) => {
          const { data: categories } = await PostsRequests.getPostCategories(
            post.id
          );
          post.categories = categories;
        })
      );
    }
    return response;
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
