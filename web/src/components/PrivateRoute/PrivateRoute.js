import { Navigate } from "react-router-dom";
import { errorRoutes } from "~/consts/routes";

const { useSelector } = require("react-redux");

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (isAuthenticated) {
    return children;
  }

  return <Navigate to={errorRoutes.noAuth} />;
};

export default PrivateRoute;
