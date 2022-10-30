import { Button, Grid, Row, Text } from "@nextui-org/react";

const BasePopover = ({ message, onCancel, onConfirm }) => {
  return (
    <Grid.Container
      css={{ borderRadius: "14px", padding: "0.75rem", maxWidth: "330px" }}
    >
      <Row justify="center" align="center">
        <Text b>Confirm</Text>
      </Row>
      <Row>
        <Text>{message}</Text>
      </Row>
      <Grid.Container justify="space-between" alignContent="center">
        <Grid>
          <Button size="sm" light onPress={onCancel}>
            Cancel
          </Button>
        </Grid>
        <Grid>
          <Button size="sm" shadow color="error" onPress={onConfirm}>
            Delete
          </Button>
        </Grid>
      </Grid.Container>
    </Grid.Container>
  );
};

export default BasePopover;
