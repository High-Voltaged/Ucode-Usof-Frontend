import { Dropdown, Text } from "@nextui-org/react";
import { dropdownLabels } from "~/consts/labels";
import styles from "./NavDropdown.styles";

const NavDropdown = ({ children }) => {
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
            zoey@example.com
          </Text>
        </Dropdown.Item>

        {dropdownItems}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default NavDropdown;
