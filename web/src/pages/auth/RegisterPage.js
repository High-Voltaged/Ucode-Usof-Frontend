import { Card, Link, Text } from "@nextui-org/react";
import Heading from "~/components/Heading/Heading.js";
import { mainRoutes } from "~/consts/routes.js";
import RegisterForm from "~/containers/forms/RegisterForm";
import Layout from "~/containers/layout/Layout.js";
import { colors } from "~/theme/config.js";
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
        <Card.Footer css={styles.cardFooter}>
          <Text>Already have an account?</Text>
          <Link
            href={mainRoutes.login}
            color={colors.feature}
            css={styles.link}
          >
            Login
          </Link>
        </Card.Footer>
      </Card>
    </Layout>
  );
};

export default RegisterPage;
