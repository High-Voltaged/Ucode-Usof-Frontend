import { Routes, Route } from "react-router-dom";
import PrivateRoute from "~/components/PrivateRoute/PrivateRoute";

const ProfileRoutes = () => {
  return (
    <Routes>
      <Route
        element={
          <PrivateRoute>
            <div>This is my profile</div>
          </PrivateRoute>
        }
        index
      ></Route>
    </Routes>
  );
};

export default ProfileRoutes;
