import { Avatar, Dropdown, Link, Navbar, Text } from "@nextui-org/react";
import { useState } from "react";
import NavDropdown from "~/components/Dropdown/NavDropdown";
import SearchInput from "~/components/SearchInput/SearchInput";
import styles from "./Navbar.styles";
import { links } from "~/consts/labels";

const AppNavbar = () => {
  const [activeLink, setActiveLink] = useState(-1);

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
        {links.map((link) => (
          <Navbar.Link
            key={link.id}
            color="inherit"
            onPress={() => setActiveLink(link.id)}
            isActive={activeLink === link.id}
            href={link.href}
          >
            {link.label}
          </Navbar.Link>
        ))}
      </Navbar.Content>
      <Navbar.Content css={styles.navbarContent}>
        <Navbar.Item css={styles.navbarItem}>
          <SearchInput />
        </Navbar.Item>

        <NavDropdown>
          <Navbar.Item>
            <Dropdown.Trigger>
              <Avatar
                bordered
                as="button"
                color="warning"
                size="md"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </Dropdown.Trigger>
          </Navbar.Item>
        </NavDropdown>
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
