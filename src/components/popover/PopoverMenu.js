import { Button, Popover } from "@nextui-org/react";
import Loader from "../Loader/Loader";
import BasePopover from "./Popover";

import { useState } from "react";
import { colors } from "~/theme/config";

const PopoverMenu = ({ message, onConfirm, btnLoading, btnSize }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover isOpen={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger>
        <Button color={colors.error} size={btnSize || "md"} flat>
          {btnLoading ? <Loader /> : "Delete"}
        </Button>
      </Popover.Trigger>
      <Popover.Content>
        <BasePopover
          onCancel={() => setIsOpen(false)}
          onConfirm={onConfirm}
          message={message}
        />
      </Popover.Content>
    </Popover>
  );
};

export default PopoverMenu;
