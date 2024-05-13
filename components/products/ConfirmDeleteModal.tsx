"use client";

import { deleteProduct } from "@/actions";
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  children: React.ReactNode;
  productID: string;
}

export const ConfirmDeleteModal = ({ productID, children }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const onClick = async () => {
    setIsLoading(true);
    const { ok, message } = await deleteProduct(productID);
    ok ? toast.success(message) : toast.error(message);
    onClose();
    setIsLoading(false);
  };
  return (
    <>
      <a onClick={onOpen}>{children}</a>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Eliminar producto</ModalHeader>
              <ModalBody>
                <p>Estas seguro que deseas eliminar este producto?</p>
                <Chip color="danger">Esta accion no se puede revertir!</Chip>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancelar
                </Button>
                <Button color="primary" onPress={onClick} isLoading={isLoading}>
                  Eliminar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
