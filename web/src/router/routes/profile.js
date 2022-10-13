import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "~/components/ProtectedRoute/ProtectedRoute";

const ProfileRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route index element={<div>This is my profile</div>}></Route>
      </Route>
    </Routes>
  );
};

export default ProfileRoutes;
