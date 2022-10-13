import { Outlet } from "react-router-dom";
import Layout from "~/containers/layout/Layout";
import ErrorTitle from "../ErrorTitle/ErrorTitle";
import Loader from "~/components/Loader/Loader";

const { useSelector } = require("react-redux");

const PrivateRoute = () => {
  const { user } = useSelector((state) => state.auth);

  if (user.id) {
    return <Outlet />;
  }

  return (
    <Layout>
      <ErrorTitle text="Please log in to access this page" />
    </Layout>
  );
};

export default PrivateRoute;
