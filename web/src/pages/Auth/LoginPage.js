import { Button, Card, Text } from "@nextui-org/react";
import { FaAt, FaLock, FaUser } from "react-icons/fa";
import InputField from "~/components/Form/InputField";
import Layout from "~/containers/layout/Layout.js";
import styles from "./Auth.styles.js";

const LoginPage = () => {
  return (
    <Layout>
      <Card css={styles.card}>
        <Card.Header css={styles.cardBar}>
          <Text color="warning" h2 weight="semibold">
            Authorization
          </Text>
        </Card.Header>
        <Card.Body>
          <form>
            <InputField
              label="Your login"
              placeholder="test_login"
              contentLeft={<FaUser />}
            ></InputField>
            <InputField
              label="Your email"
              placeholder="test@gmail.com"
              contentLeft={<FaAt />}
            ></InputField>
            <InputField
              label="Your password"
              placeholder="your_password"
              contentLeft={<FaLock />}
              isLast={true}
            ></InputField>
          </form>
        </Card.Body>
        <Card.Footer css={styles.cardBar}>
          <Button size="lg" color="warning">
            Login
          </Button>
        </Card.Footer>
      </Card>
    </Layout>
  );
};

export default LoginPage;
