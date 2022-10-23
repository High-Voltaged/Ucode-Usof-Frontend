import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "~/components/ProtectedRoute/ProtectedRoute";
import { postRoutes } from "~/consts/routes";
import { NotFound, Post, Posts, CreatePost } from "~/pages";

const PostRoutes = () => {
  return (
    <Routes>
      <Route index element={<Posts />} />
      <Route path={postRoutes.postWithId} element={<Post />} />
      <Route element={<ProtectedRoute />}>
        <Route path={postRoutes.create} element={<CreatePost />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default PostRoutes;
