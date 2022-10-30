import { colors } from "~/theme/config";

import { Button, Loading } from "@nextui-org/react";

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
