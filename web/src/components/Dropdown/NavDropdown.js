import { Dropdown } from "@nextui-org/react";
import { dropdownLabels } from "~/consts/labels";
import styles from "./NavDropdown.styles";
import { colors } from "~/theme/config";
import { useNavigate } from "react-router-dom";
import { mainRoutes, profileRoutes } from "~/consts/routes";
import { logout } from "~/redux/auth-slice";
import { useDispatch } from "react-redux";

const NavDropdown = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const actionHandler = (key) => {
    switch (key) {
      case dropdownLabels[0].id:
        navigate(profileRoutes.profile);
        break;
      case dropdownLabels[1].id:
        dispatch(logout());
        navigate(mainRoutes.landing);
        break;
      default:
        console.log(`No action for ${key}.`);
    }
  };

  return (
    <Dropdown placement="bottom-right">
      {children}
      <Dropdown.Menu
        aria-label="User menu actions"
        color={colors.feature}
        onAction={actionHandler}
      >
        {dropdownItems}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default NavDropdown;
