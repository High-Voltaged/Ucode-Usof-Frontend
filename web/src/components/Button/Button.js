import { colors } from "~/theme/config";

const { Button, Loading } = require("@nextui-org/react");

const BaseButton = ({ text, loading, block = false, ...props }) => {
  return (
    <Button
      type="submit"
      size="lg"
      css={block ? { w: "100%" } : ""}
      color={colors.feature}
      {...props}
    >
      {loading ? <Loading color="currentColor" size="md" /> : text}
    </Button>
  );
};

export default BaseButton;
