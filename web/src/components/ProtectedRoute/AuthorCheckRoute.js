import { useParams, Outlet } from "react-router-dom";
import useAuthorCheck from "~/hooks/use-author-check";
import ErrorTitle from "~/components/ErrorTitle/ErrorTitle";
import Loader from "~/components/Loader/Loader";
import Layout from "~/containers/layout/Layout";

const AuthorCheckRoute = ({ useQuery }) => {
  const { id } = useParams();

  const { isLoading, error, isAuthor } = useAuthorCheck(useQuery, Number(id));

  if (error) {
    return (
      <Layout>
        <ErrorTitle text={error.data.message} />;
      </Layout>
    );
  }

  if (isLoading || isAuthor === null) {
    return <Loader />;
  }

  if (!isAuthor) {
    return (
      <Layout>
        <ErrorTitle text="You can't edit nor remove this entity." />;
      </Layout>
    );
  }

  return <Outlet />;
};

export default AuthorCheckRoute;
