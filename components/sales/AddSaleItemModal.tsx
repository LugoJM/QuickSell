"use client";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { SubmitHandler, useForm } from "react-hook-form";
import { PlusIcon } from "../ui/Icons";
import { Select, SelectItem } from "@nextui-org/select";
import { getProducts } from "../../actions/product/get-products";
import { useEffect, useState } from "react";
import { Product } from "@/types";
import { Input, Textarea } from "@nextui-org/input";
import { currencyFormat } from "@/utils";
import { SaleItemInterface } from "./NewSaleTable";

interface Props {
  addProductToSale : React.Dispatch<React.SetStateAction<SaleItemInterface[]>>;
}

interface FormInputs {
  productid: string;
  quantity: number;
}

export const AddSaleItemModal = ( { addProductToSale } : Props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product>();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { handleSubmit, register, reset } = useForm<FormInputs>();

  const onFormSubmit : SubmitHandler<FormInputs> = async (data) => {
    const newProduct : SaleItemInterface = {
      productid : selectedProduct!.id,
      name : selectedProduct!.name,
      price : selectedProduct!.price,
      quantity : data.quantity
    }; 
    addProductToSale(items  => [...items, newProduct]);
    reset();
    onClose();
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const { ok, inventory } = await getProducts();
      setProducts(ok ? inventory : []);
    };
    fetchProducts();
  }, [setProducts]);

  const selectOnChangeEvent = (event : any) => {
    const selectedProductId = event.target.value;
    const selectedProduct = products.find((product) => product.id === selectedProductId);
    setSelectedProduct(selectedProduct);
  };
  return (
    <>
      <Button
        onPress={onOpen}
        className="bg-foreground text-background"
        endContent={<PlusIcon />}
        size="sm"
      >
        Agregar Producto
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Agregar Producto a Venta</ModalHeader>
              <ModalBody>
                <form
                  onSubmit={handleSubmit(onFormSubmit)}
                  className="flex flex-col space-y-8 py-2"
                >
                  <Select
                    labelPlacement="outside"
                    label="Producto"
                    placeholder="Selecciona un producto"
                    items={products}
                    {...register("productid", {onChange(event) {
                        selectOnChangeEvent(event);
                    },})}
                  >
                    {(product) => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.name}
                      </SelectItem>
                    )}
                  </Select>
                  <Textarea
                    maxRows={3}
                    isReadOnly
                    placeholder="Descripcion del producto..."
                    labelPlacement="outside"
                    label="Descripcion"
                    isDisabled
                    value={selectedProduct ? selectedProduct.description : ""}
                  />
                  <Input
                    type="text"
                    label="Precio"
                    labelPlacement="outside"
                    value={selectedProduct ? currencyFormat(selectedProduct!.price) : "0.00"}
                    isDisabled
                  />
                  <Input
                    type="number"
                    label="Stock"
                    placeholder="0"
                    labelPlacement="outside"
                    {...register("quantity", {required : true})}
                  />

                  <Button color="primary" type="submit">
                    Agregar
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
