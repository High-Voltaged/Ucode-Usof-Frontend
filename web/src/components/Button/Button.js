const { Button, Text } = require("@nextui-org/react");

const BaseButton = ({ text, ...props }) => {
  return (
    <Button {...props} auto color="warning">
      <Text>{text}</Text>
    </Button>
  );
};

export default BaseButton;
