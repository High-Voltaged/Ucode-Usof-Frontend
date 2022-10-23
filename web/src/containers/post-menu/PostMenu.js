import { Grid, Row } from "@nextui-org/react";
import { useState } from "react";
import BaseButton from "~/components/Button/Button";
import FilterMenu from "~/components/Dropdown/FilterMenu";
import SortDropdown from "~/components/Dropdown/SortDropdown";
import styles from "./PostMenu.styles";

const PostMenu = ({ setSort, setFilter }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Grid.Container gap={1} alignContent="center" justify="flex-end">
      <Row gap={1} align="center" justify="flex-end" css={styles.row}>
        <SortDropdown setSort={setSort} />
        <BaseButton
          size="md"
          text="Filter"
          onPress={() => setIsExpanded((prev) => !prev)}
          css={styles.btn}
        />
      </Row>
      {isExpanded && (
        <Row>
          <FilterMenu setFilter={setFilter} />
        </Row>
      )}
    </Grid.Container>
  );
};

export default PostMenu;
