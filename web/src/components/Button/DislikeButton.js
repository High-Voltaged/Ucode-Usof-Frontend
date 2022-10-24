const { Button } = require("@nextui-org/react");
const { FaChevronDown } = require("react-icons/fa");

const { LIKES_ENUM } = require("~/consts/validation");

const DislikeButton = ({ like, handler, ...props }) => {
  return (
    <Button
      light={like !== LIKES_ENUM[1]}
      flat={like === LIKES_ENUM[1]}
      auto
      color={like === LIKES_ENUM[1] ? "error" : "default"}
      css={{ minWidth: "auto" }}
      icon={<FaChevronDown size={20} />}
      onPress={handler}
      {...props}
    />
  );
};

export default DislikeButton;
