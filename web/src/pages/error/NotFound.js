import ErrorTitle from "~/components/ErrorTitle/ErrorTitle";
import Layout from "~/containers/layout/Layout";

const NotFound = () => {
  return (
    <Layout>
      <ErrorTitle text="404 Page Not Found" />
    </Layout>
  );
};

export default NotFound;
