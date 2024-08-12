import { Modal } from "../CustomModal";
import React from "react";

interface DropdownProp {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  component: React.ReactNode;
  triggerComponent: React.ReactNode;
}

export const ModalComp: React.FC<DropdownProp> = (prop) => {
  return (
    <Modal.Root
      isOpen={prop.open}
      setIsOpen={prop.setOpen}
      className="flex flex-col justify-center cursor-pointer h-[55px] "
    >
      <Modal.Trigger asChild={true}>{prop.triggerComponent}</Modal.Trigger>

      <Modal.Content>{prop.component}</Modal.Content>
    </Modal.Root>
  );
};
