const { Avatar } = require("@nextui-org/react");

const BaseAvatar = ({ ...props }) => {
  return <Avatar bordered color="warning" size="md" {...props} />;
};

export default BaseAvatar;
