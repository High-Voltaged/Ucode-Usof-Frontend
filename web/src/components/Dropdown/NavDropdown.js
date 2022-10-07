import { Dropdown, Text } from "@nextui-org/react";
import { dropdownLabels } from "~/consts/labels";
import BaseButton from "~/components/Button/Button";
import styles from "./NavDropdown.styles";

const NavDropdown = ({ user, children }) => {
  const dropdownItems = dropdownLabels.map((item) => (
    <Dropdown.Item
      key={item.id}
      css={styles.navItem}
      color={item.color || ""}
      withDivider
    >
      {item.label}
    </Dropdown.Item>
  ));

  if (!user.id) {
    return (
      <div style={styles.flexContainer}>
        {children}
        <BaseButton css={styles.button} text="Login"></BaseButton>
      </div>
    );
  }

  return (
    <Dropdown placement="bottom-right">
      {children}
      <Dropdown.Menu
        aria-label="User menu actions"
        color="warning"
        onAction={(actionKey) => console.log({ actionKey })}
      >
        <Dropdown.Item key="logged_in" css={styles.navItem}>
          <Text b css={styles.text}>
            Signed in as
          </Text>
          <Text b css={styles.text}>
            {user.login}
          </Text>
        </Dropdown.Item>

        {dropdownItems}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default NavDropdown;
