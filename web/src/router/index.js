import { Route, Routes } from "react-router-dom";
import { routes } from "~/consts/routes";
import MainRoutes from "~/router/routes/main";
import ProfileRoutes from "~/router/routes/profile";

const Router = () => {
  return (
    <Routes>
      <Route element={<MainRoutes />} path={routes.main} />
      <Route element={<ProfileRoutes />} path={routes.profile} />
    </Routes>
  );
};

export default Router;
