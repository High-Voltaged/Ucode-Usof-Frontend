import { Routes, Route } from "react-router-dom";
import { postRoutes } from "~/consts/routes";
import { NotFound, Post, Posts } from "~/pages";

const PostRoutes = () => {
  return (
    <Routes>
      <Route index element={<Posts />} />
      <Route path={postRoutes.postWithId} element={<Post />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default PostRoutes;
