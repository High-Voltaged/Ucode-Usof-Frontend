import { Card, Link } from "@nextui-org/react";
import { useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Heading from "~/components/Heading/Heading.js";
import Loader from "~/components/Loader/Loader.js";
import { mainRoutes } from "~/consts/routes.js";
import Layout from "~/containers/layout/Layout.js";
import useRequest from "~/hooks/use-request.js";
import AuthRequests from "~/requests/auth.js";
import { colors } from "~/theme/config.js";
import styles from "./Auth.styles.js";

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

  return (
    <Layout>
      <Card css={styles.card}>
        <Card.Header css={styles.cardBar}>
          {!error ? (
            <Heading text="Your email is confirmed!" />
          ) : (
            <Heading text="An error occured when handling the request." />
          )}
        </Card.Header>
        {!error && (
          <Card.Body>
            <Link
              href={mainRoutes.login}
              color={colors.feature}
              css={styles.link}
            >
              You can now login
            </Link>
          </Card.Body>
        )}
      </Card>
    </Layout>
  );
};

export default ConfirmEmail;
