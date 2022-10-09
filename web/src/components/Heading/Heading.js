import { colors } from "~/theme/config";

const { Text } = require("@nextui-org/react");

const Heading = ({ text }) => {
  return (
    <Text color={colors.feature} h2 weight="semibold">
      {text}
    </Text>
  );
};

export default Heading;
