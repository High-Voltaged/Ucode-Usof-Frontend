import { Button } from "@nextui-org/react";
import { FaChevronUp } from "react-icons/fa";

import { LIKES_ENUM } from "~/consts/validation";

const LikeButton = ({ like, handler, ...props }) => {
  return (
    <Button
      light={like !== LIKES_ENUM[0]}
      flat={like === LIKES_ENUM[0]}
      color={like === LIKES_ENUM[0] ? "success" : "default"}
      auto
      css={{ minWidth: "auto", px: 8 }}
      icon={<FaChevronUp size={20} />}
      onPress={handler}
      {...props}
    />
  );
};

export default LikeButton;
