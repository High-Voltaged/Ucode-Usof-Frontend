import { useState } from "react";
import { useSelector } from "react-redux";
import { Avatar, Dropdown, Link, Navbar, Text } from "@nextui-org/react";

import NavDropdown from "~/components/Dropdown/NavDropdown";
import SearchInput from "~/components/SearchInput/SearchInput";
import styles from "./Navbar.styles";
import { links } from "~/consts/labels";
import { AVATAR_PATH } from "~/consts/utils";

const AppNavbar = () => {
  const { user } = useSelector((state) => state.auth);
  const [activeLink, setActiveLink] = useState(-1);

  const userAvatar = (
    <Avatar
      as="button"
      bordered
      color="warning"
      size="md"
      src={AVATAR_PATH(user.avatar)}
    />
  );

  const navLinks = links.map((link) => (
    <Navbar.Link
      key={link.id}
      color="inherit"
      onPress={() => setActiveLink(link.id)}
      isActive={activeLink === link.id}
      href={link.href}
    >
      {link.label}
    </Navbar.Link>
  ));

  return (
    <Navbar>
      <Navbar.Brand>
        <Navbar.Toggle showIn="xs" />

        <Text b color="inherit">
          Brand
        </Text>
      </Navbar.Brand>
      <Navbar.Content
        activeColor="warning"
        enableCursorHighlight
        hideIn="xs"
        variant="highlight"
      >
        {navLinks}
      </Navbar.Content>
      <Navbar.Content css={styles.navbarContent}>
        <Navbar.Item css={styles.navbarItem}>
          <SearchInput />
        </Navbar.Item>

        {user.id ? (
          <>
            <Text b color="warning">
              {user.login}
            </Text>
            <NavDropdown user={user}>
              <Dropdown.Trigger>{userAvatar}</Dropdown.Trigger>
            </NavDropdown>
          </>
        ) : (
          <Navbar.Item>{userAvatar}</Navbar.Item>
        )}
      </Navbar.Content>

      <Navbar.Collapse>
        {links.map((link) => (
          <Navbar.CollapseItem
            key={link.id}
            color="inherit"
            onPress={() => setActiveLink(link.id)}
            isActive={activeLink === link.id}
          >
            <Link href={link.href}></Link>
            {link.label}
          </Navbar.CollapseItem>
        ))}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AppNavbar;
