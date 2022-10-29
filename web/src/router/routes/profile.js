import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "~/components/ProtectedRoute/ProtectedRoute";
import { NotFound, Profile } from "~/pages";

const ProfileRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route index element={<Profile />}></Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default ProfileRoutes;
