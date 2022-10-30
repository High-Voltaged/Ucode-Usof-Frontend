import { Card, Link, Text } from "@nextui-org/react";
import Heading from "~/components/Heading/Heading.js";
import LoginForm from "~/containers/forms/LoginForm";
import Layout from "~/containers/layout/Layout.js";
import { mainRoutes } from "~/consts/routes";
import { colors } from "~/theme/config.js";
import styles from "./Auth.styles.js";

const Login = () => {
  return (
    <Layout>
      <Card css={styles.card}>
        <Card.Header css={styles.cardBar}>
          <Heading text="Authorization" />
        </Card.Header>
        <Card.Body>
          <LoginForm />
        </Card.Body>
        <Card.Footer css={styles.cardFooter}>
          <Text>Don't have an account?</Text>
          <Link
            href={mainRoutes.register}
            color={colors.feature}
            css={styles.link}
          >
            Register
          </Link>
        </Card.Footer>
      </Card>
    </Layout>
  );
};

export default Login;
