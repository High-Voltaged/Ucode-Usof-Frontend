import { colors } from "~/theme/config";

import { Text } from "@nextui-org/react";

const Heading = ({ text }) => {
  return (
    <Text color={colors.feature} h2 weight="semibold">
      {text}
    </Text>
  );
};

export default Heading;
