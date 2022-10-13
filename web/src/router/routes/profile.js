import { Routes, Route } from "react-router-dom";
import PrivateRoute from "~/components/PrivateRoute/PrivateRoute";

const ProfileRoutes = () => {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route index element={<div>This is my profile</div>}></Route>
      </Route>
    </Routes>
  );
};

export default ProfileRoutes;
