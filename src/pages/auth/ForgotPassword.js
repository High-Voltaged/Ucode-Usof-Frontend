import { Card } from "@nextui-org/react";
import Heading from "~/components/Heading/Heading.js";
import ForgotPasswordForm from "~/containers/forms/ForgotPasswordForm";
import Layout from "~/containers/layout/Layout.js";
import styles from "./Auth.styles.js";

const ForgotPassword = () => {
  return (
    <Layout>
      <Card css={styles.card}>
        <Card.Header css={styles.cardBar}>
          <Heading text="Forgot Password" />
        </Card.Header>
        <Card.Body>
          <ForgotPasswordForm />
        </Card.Body>
      </Card>
    </Layout>
  );
};

export default ForgotPassword;
