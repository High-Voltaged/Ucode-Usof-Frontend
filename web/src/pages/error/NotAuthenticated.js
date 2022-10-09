import { Container } from "@nextui-org/react";
import ErrorTitle from "~/components/ErrorTitle/ErrorTitle";
import Layout from "~/containers/layout/Layout";

const NotAuthenticated = () => {
  return (
    <Layout>
      <ErrorTitle text="Please log in to access this page" />
    </Layout>
  );
};

export default NotAuthenticated;
