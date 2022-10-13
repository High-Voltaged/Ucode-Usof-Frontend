import { Route, Routes } from "react-router-dom";
import { routes } from "~/consts/routes";
import MainRoutes from "~/router/routes/main";
import ProfileRoutes from "~/router/routes/profile";

const Router = () => {
  return (
    <Routes>
      <Route path={routes.main} element={<MainRoutes />} />
      <Route path={routes.profile} element={<ProfileRoutes />} />
    </Routes>
  );
};

export default Router;
