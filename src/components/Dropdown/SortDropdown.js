import { Dropdown } from "@nextui-org/react";
import { sortLabels } from "~/consts/labels";
import styles from "./NavDropdown.styles";
import { colors } from "~/theme/config";
import { useMemo, useState } from "react";
import { FaSort } from "react-icons/fa";

const SortDropdown = ({ setSort }) => {
  const [selected, setSelected] = useState(new Set([sortLabels[0].label]));

  const selectedValue = useMemo(
    () => Array.from(selected).join(", "),
    [selected]
  );

  const dropdownItems = sortLabels.map((item) => (
    <Dropdown.Item
      key={item.label}
      css={styles.navItem}
      color={item.color || ""}
    >
      {item.label}
    </Dropdown.Item>
  ));

  const actionHandler = (keys) => {
    const key = keys.values().next().value;
    switch (key) {
      case sortLabels[0].label:
        setSort(sortLabels[0].sortBy);
        break;
      case sortLabels[1].label:
        setSort(sortLabels[1].sortBy);
        break;
      default:
        console.log(`No action for ${key}.`);
    }
  };

  return (
    <Dropdown placement="bottom-left">
      <Dropdown.Button
        flat
        color={colors.feature}
        css={{ tt: "capitalize", zIndex: 100 }}
        icon={<FaSort />}
      >
        {selectedValue}
      </Dropdown.Button>
      <Dropdown.Menu
        aria-label="Filter menu actions"
        color={colors.feature}
        selectionMode="single"
        disallowEmptySelection
        selectedKeys={selected}
        onSelectionChange={(key) => {
          setSelected(key);
          actionHandler(key);
        }}
      >
        {dropdownItems}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default SortDropdown;
