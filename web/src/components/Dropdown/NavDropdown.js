import { Dropdown } from "@nextui-org/react";
import { dropdownLabels } from "~/consts/labels";
import styles from "./NavDropdown.styles";
import { colors } from "~/theme/config";

const NavDropdown = ({ user, children }) => {
  const dropdownItems = dropdownLabels.map((item, idx) => (
    <Dropdown.Item
      key={item.id}
      css={styles.navItem}
      color={item.color || ""}
      withDivider={idx !== 0}
    >
      {item.label}
    </Dropdown.Item>
  ));

  return (
    <Dropdown placement="bottom-right">
      {children}
      <Dropdown.Menu
        aria-label="User menu actions"
        color={colors.feature}
        onAction={(actionKey) => console.log({ actionKey })}
      >
        {dropdownItems}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default NavDropdown;
