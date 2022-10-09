import { Card } from "@nextui-org/react";
import Heading from "~/components/Heading/Heading.js";
import RegisterForm from "~/containers/forms/RegisterForm";
import Layout from "~/containers/layout/Layout.js";
import styles from "./Auth.styles.js";

const RegisterPage = () => {
  return (
    <Layout>
      <Card css={styles.card}>
        <Card.Header css={styles.cardBar}>
          <Heading text="Registration" />
        </Card.Header>
        <Card.Body>
          <RegisterForm />
        </Card.Body>
      </Card>
    </Layout>
  );
};

export default RegisterPage;
