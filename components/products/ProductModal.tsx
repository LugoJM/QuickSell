"use client";

import { createProduct, updateProduct } from "@/actions";
import { Product } from "@/types";
import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

interface Props {
  children?: React.ReactNode;
  product? : Product;
  action : "Agregar" | "Editar"; 
}

interface FormInputs {
  name: string;
  description: string;
  price: number;
  stock: number;
}

export const ProductModal = ({ children, product, action }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { handleSubmit, register, reset } = useForm<FormInputs>({
    defaultValues: {
      ...product,
    },
  });

  const onFormSubmit : SubmitHandler<FormInputs> = async (formValues) => {
    setIsLoading(true);

    if(action === "Agregar"){
      const { ok, message } = await createProduct(formValues);
      ok ? toast.success(message) : toast.error(message);
    }else {
      const updateRequestBody = {
        ...formValues,
        id : product!.id
      };
      const {ok, message} = await updateProduct(updateRequestBody);
      ok ? toast.success(message) : toast.error(message);
    }
    setIsLoading(false);
    reset();
    onClose();
  };
  return (
    <>
      {children ? (
        <a onClick={onOpen}>{children}</a>
      ) : (
        <Button variant="shadow" color="primary" onPress={onOpen}>
          {`${action} Producto`}
        </Button>
      )}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>{`${action} Producto`}</ModalHeader>
              <ModalBody>
                <form
                  onSubmit={handleSubmit(onFormSubmit)}
                  className="flex flex-col space-y-8 py-2"
                >
                  <Input
                    type="text"
                    label="Nombre"
                    placeholder="Nombre"
                    labelPlacement="outside"
                    {...register("name", { required: true })}
                  />
                  <Textarea
                    maxRows={3}
                    type="text"
                    label="Descripción"
                    placeholder="Descripción"
                    labelPlacement="outside"
                    {...register("description", { required: true })}
                  />
                  <Input
                    type="number"
                    label="Precio"
                    placeholder="0.00"
                    labelPlacement="outside"
                    startContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">$</span>
                      </div>
                    }
                    {...register("price", { required: true })}
                  />
                  <Input
                    type="number"
                    label="Stock"
                    placeholder="0"
                    labelPlacement="outside"
                    {...register("stock", { required: true })}
                  />

                  <Button color="primary" type="submit" isLoading={isLoading}>
                    {action}
                  </Button>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
