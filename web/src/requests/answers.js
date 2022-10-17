import { axiosClient } from "~/utils/axios-client";

const PREFIX = (postId) => `posts/${postId}/answers`;
const ANSWER_PREFIX = (answerId) => `answers/${answerId}`;

class AnswersRequests {
  static async getAll(postId) {
    const response = await axiosClient.get(`/${PREFIX(postId)}`);

    if (response.data) {
      const answers = response.data;

      await Promise.all(
        answers.map(async (answer) => {
          const { data: likes } = await AnswersRequests.getAnswerLikes(
            answer.id
          );
          answer.likesCount = likes.length;
        })
      );
    }
    return response;
  }

  static getAnswerLikes(id) {
    return axiosClient.get(`/${ANSWER_PREFIX(id)}/like`);
  }
}

export default AnswersRequests;
