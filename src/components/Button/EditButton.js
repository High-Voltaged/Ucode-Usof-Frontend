import { Grid, Button } from "@nextui-org/react";
import { FaEdit } from "react-icons/fa";
import { colors } from "~/theme/config";

const EditButton = ({ ...props }) => (
  <Grid.Container>
    <Grid>
      <Button
        auto
        flat
        color={colors.success}
        icon={<FaEdit size={12} />}
        css={{ minWidth: "auto" }}
        {...props}
      />
    </Grid>
  </Grid.Container>
);

export default EditButton;
