import { colors } from "~/theme/config";

const { Button, Loading } = require("@nextui-org/react");

const BaseButton = ({ text, loading, ...props }) => {
  return (
    <Button type="submit" size="lg" color={colors.feature}>
      {loading ? <Loading color="currentColor" size="md" /> : text}
    </Button>
  );
};

export default BaseButton;
