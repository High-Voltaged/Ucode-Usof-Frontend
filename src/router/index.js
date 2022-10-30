import { Route, Routes } from "react-router-dom";
import { routes } from "~/consts/routes";
import MainRoutes from "~/router/routes/main";
import ProfileRoutes from "~/router/routes/profile";
import PostRoutes from "~/router/routes/posts";

const Router = () => {
  return (
    <Routes>
      <Route path={routes.main} element={<MainRoutes />} />
      <Route path={routes.profile} element={<ProfileRoutes />} />
      <Route path={routes.posts} element={<PostRoutes />} />
    </Routes>
  );
};

export default Router;
