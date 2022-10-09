import { Card } from "@nextui-org/react";
import Heading from "~/components/Heading/Heading.js";
import ResetPasswordForm from "~/containers/forms/ResetPasswordForm";
import Layout from "~/containers/layout/Layout.js";
import styles from "./Auth.styles.js";

const ResetPassword = () => {
  return (
    <Layout>
      <Card css={styles.card}>
        <Card.Header css={styles.cardBar}>
          <Heading text="Reset Password" />
        </Card.Header>
        <Card.Body>
          <ResetPasswordForm />
        </Card.Body>
      </Card>
    </Layout>
  );
};

export default ResetPassword;
