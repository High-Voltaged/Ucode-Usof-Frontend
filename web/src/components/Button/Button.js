import { colors } from "~/theme/config";

const { Button, Loading } = require("@nextui-org/react");

const BaseButton = ({ text, loading, ...props }) => {
  return (
    <Button
      {...props}
      type="submit"
      size="lg"
      css={{ w: "100%" }}
      color={colors.feature}
    >
      {loading ? <Loading color="currentColor" size="md" /> : text}
    </Button>
  );
};

export default BaseButton;
