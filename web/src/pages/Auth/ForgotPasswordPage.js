import { Button, Card, Text } from "@nextui-org/react";
import { FaLock } from "react-icons/fa";
import InputField from "~/components/Form/InputField";
import Layout from "~/containers/layout/Layout.js";
import styles from "./Auth.styles.js";

const ForgotPasswordPage = () => {
  return (
    <Layout>
      <Card css={styles.card}>
        <Card.Header css={styles.cardBar}>
          <Text color="warning" h2 weight="semibold">
            Reset Password
          </Text>
        </Card.Header>
        <Card.Body>
          <form>
            <InputField
              label="Your new password"
              placeholder="your_password"
              icon={<FaLock />}
              isPassword
            ></InputField>
            <InputField
              label="Confirm the password"
              placeholder="your_password"
              icon={<FaLock />}
              isLast
              isPassword
            ></InputField>
          </form>
        </Card.Body>
        <Card.Footer css={styles.cardBar}>
          <Button size="lg" color="warning">
            Submit
          </Button>
        </Card.Footer>
      </Card>
    </Layout>
  );
};

export default ForgotPasswordPage;
