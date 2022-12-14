import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Avatar, Dropdown, Link, Navbar, Text } from "@nextui-org/react";

import NavDropdown from "~/components/Dropdown/NavDropdown";
import SearchInput from "~/components/SearchInput/SearchInput";
import BaseButton from "~/components/Button/Button";
import styles from "./Navbar.styles";
import { links } from "~/consts/labels";
import { AVATAR_PATH } from "~/consts/utils";
import { colors } from "~/theme/config";
import { mainRoutes } from "~/consts/routes";

const AppNavbar = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [activeLink, setActiveLink] = useState(-1);

  const userAvatar = (
    <Avatar
      as="button"
      bordered
      squared
      color={colors.feature}
      size="md"
      src={AVATAR_PATH(user.avatar)}
    />
  );

  const navLinks = links.map((link) => (
    <Navbar.Link
      key={link.label}
      color="inherit"
      onPress={() => setActiveLink(link.label)}
      isActive={activeLink === link.label}
      href={link.href}
    >
      {link.label}
    </Navbar.Link>
  ));

  const loginClickHandler = (_e) => navigate(mainRoutes.login);

  return (
    <Navbar>
      <Navbar.Content gap={6}>
        <Navbar.Toggle showIn="sm" />
        <Navbar.Brand hideIn="xs">
          <Text
            css={{
              ml: 5,
              us: "none",
              textGradient: "45deg, $yellow600 15%, $purple600",
            }}
            color="inherit"
            size={30}
            weight="bold"
          >
            TechHub
          </Text>
        </Navbar.Brand>
      </Navbar.Content>
      <Navbar.Content
        gap={6}
        activeColor={colors.feature}
        enableCursorHighlight
        hideIn="sm"
        variant="highlight"
      >
        {navLinks}
      </Navbar.Content>
      <Navbar.Content gap={8} css={styles.navbarContent}>
        <Navbar.Item>
          <SearchInput />
        </Navbar.Item>

        {user.id ? (
          <>
            <Text b color={colors.feature}>
              {user.login}
            </Text>
            <NavDropdown>
              <Dropdown.Trigger>{userAvatar}</Dropdown.Trigger>
            </NavDropdown>
            <Text
              size={14}
              css={{ d: "none", "@xs": { d: "block" } }}
              color={colors.secondary}
            >
              {user.role}
            </Text>
          </>
        ) : (
          <>
            <Navbar.Item>{userAvatar}</Navbar.Item>
            <Navbar.Item>
              <BaseButton onPress={loginClickHandler} text="Login" auto />
            </Navbar.Item>
          </>
        )}
      </Navbar.Content>

      <Navbar.Collapse>
        {links.map((link) => (
          <Navbar.CollapseItem
            key={link.label}
            color="inherit"
            onPress={() => setActiveLink(link.label)}
            isActive={activeLink === link.label}
          >
            <Link color={colors.feature} href={link.href}>
              {link.label}
            </Link>
          </Navbar.CollapseItem>
        ))}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AppNavbar;
