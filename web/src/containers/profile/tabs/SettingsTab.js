import { Grid } from "@nextui-org/react";
import UpdateProfileForm from "~/containers/forms/UpdateProfileForm";
import UploaderForm from "~/containers/forms/Uploader";

const styles = { d: "flex", jc: "center" };

const SettingsTab = () => (
  <Grid.Container alignContent="flex-start" justify="center" gap={2}>
    <Grid xs={12} css={styles}>
      <UploaderForm />
    </Grid>
    <Grid xs={12} css={styles}>
      <UpdateProfileForm />
    </Grid>
  </Grid.Container>
);

export default SettingsTab;
