const { Text } = require("@nextui-org/react");

const Heading = ({ text }) => {
  return (
    <Text color="warning" h2 weight="semibold">
      {text}
    </Text>
  );
};

export default Heading;
