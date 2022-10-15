import { Card, Link } from "@nextui-org/react";
import { useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ErrorTitle from "~/components/ErrorTitle/ErrorTitle";
import Heading from "~/components/Heading/Heading";
import Loader from "~/components/Loader/Loader";
import { mainRoutes } from "~/consts/routes";
import Layout from "~/containers/layout/Layout";
import useRequest from "~/hooks/use-request";
import AuthRequests from "~/requests/auth";
import { colors } from "~/theme/config";
import styles from "./Auth.styles";

const ConfirmEmail = () => {
  const [searchParams] = useSearchParams();
  const confirmToken = searchParams.get("confirmToken");

  const request = useCallback(
    () => AuthRequests.confirmEmail({ confirmToken }),
    [confirmToken]
  );
  const { sendRequest, loading, error } = useRequest(request);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (loading) {
    return <Loader isFullScreen />;
  }

  if (error) {
    return (
      <Layout>
        <ErrorTitle text={error} />;
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
