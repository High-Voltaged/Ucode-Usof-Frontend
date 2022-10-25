import { Routes, Route } from "react-router-dom";
import AuthorCheckRoute from "~/components/ProtectedRoute/AuthorCheckRoute";
import ProtectedRoute from "~/components/ProtectedRoute/ProtectedRoute";
import { postRoutes } from "~/consts/routes";
import { NotFound, Post, Posts, CreatePost, EditPost } from "~/pages";
import { useGetPostQuery } from "~/redux/api/posts-api";

const PostRoutes = () => {
  return (
    <Routes>
      <Route index element={<Posts />} />
      <Route path={postRoutes.postWithId} element={<Post />} />
      <Route element={<ProtectedRoute />}>
        <Route path={postRoutes.create} element={<CreatePost />} />
      </Route>
      <Route element={<AuthorCheckRoute useQuery={useGetPostQuery} />}>
        <Route path={postRoutes.edit} element={<EditPost />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default PostRoutes;
