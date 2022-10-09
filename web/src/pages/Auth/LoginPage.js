import { Card } from "@nextui-org/react";
import Heading from "~/components/Heading/Heading.js";
import LoginForm from "~/containers/forms/LoginForm/LoginForm.js";
import Layout from "~/containers/layout/Layout.js";
import styles from "./Auth.styles.js";

const LoginPage = () => {
  return (
    <Layout>
      <Card css={styles.card}>
        <Card.Header css={styles.cardBar}>
          <Heading text="Authorization" />
        </Card.Header>
        <Card.Body>
          <LoginForm />
        </Card.Body>
      </Card>
    </Layout>
  );
};

export default LoginPage;
