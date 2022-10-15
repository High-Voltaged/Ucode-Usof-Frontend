import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "~/components/ProtectedRoute/ProtectedRoute";
import { NotFound } from "~/pages";

const ProfileRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route index element={<div>This is my profile</div>}></Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default ProfileRoutes;
