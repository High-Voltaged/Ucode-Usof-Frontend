import { Route, Routes } from "react-router-dom";
import { errorRoutes, routes } from "~/consts/routes";
import { NotAuthenticated } from "~/pages";
import MainRoutes from "~/router/routes/main";
import ProfileRoutes from "~/router/routes/profile";

const Router = () => {
  return (
    <Routes>
      <Route path={routes.main} element={<MainRoutes />} />
      <Route path={routes.profile} element={<ProfileRoutes />} />
      <Route path={errorRoutes.noAuth} element={<NotAuthenticated />} />
    </Routes>
  );
};

export default Router;
