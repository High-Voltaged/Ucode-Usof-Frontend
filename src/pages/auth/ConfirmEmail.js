import { Card, Link } from "@nextui-org/react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ErrorTitle from "~/components/ErrorTitle/ErrorTitle";
import Heading from "~/components/Heading/Heading";
import Loader from "~/components/Loader/Loader";
import { mainRoutes } from "~/consts/routes";
import Layout from "~/containers/layout/Layout";
import { useConfirmEmailMutation } from "~/redux/api/auth-api";
import { colors } from "~/theme/config";
import styles from "./Auth.styles";

const ConfirmEmail = () => {
  const [searchParams] = useSearchParams();
  const confirmToken = searchParams.get("confirmToken");

  const [confirmEmail, { isLoading, isSuccess, error }] =
    useConfirmEmailMutation();

  useEffect(() => {
    confirmEmail(confirmToken);
  }, [confirmEmail, confirmToken]);

  if (isLoading || (!isSuccess && !error)) {
    return <Loader isFullScreen />;
  }

  if (error) {
    return (
      <Layout>
        <ErrorTitle text={error.data.message} />
      </Layout>
    );
  }

  return (
    <Layout>
      <Card css={styles.card}>
        <Card.Header css={styles.cardBar}>
          <Heading text="Your email is confirmed!" />
        </Card.Header>
        <Card.Body>
          <Link
            href={mainRoutes.login}
            color={colors.feature}
            css={styles.link}
          >
            You can now login
          </Link>
        </Card.Body>
      </Card>
    </Layout>
  );
};

export default ConfirmEmail;
