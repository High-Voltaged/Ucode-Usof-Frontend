import { Container } from "@nextui-org/react";
import styles from "./Layout.styles.js";

const Layout = ({ children }) => {
  return <Container css={styles.container}>{children}</Container>;
};

export default Layout;
