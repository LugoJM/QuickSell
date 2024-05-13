"use client";

import { useCallback, useMemo, useState } from "react";
import {
  AddSaleItemModal,
  DeleteIcon,
  PlusIcon,
  SearchIcon,
} from "@/components";
import { Button } from "@nextui-org/button";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import { Tooltip } from "@nextui-org/tooltip";
import { currencyFormat } from "@/utils";
import { SaleRequest } from "@/types";
import { createSale } from "@/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


export interface SaleItemInterface {
  productid: string;
  name: string;
  price: number;
  quantity: number;
}

export const NewSaleTable = () => {
  const router = useRouter();
  const [saleProducts, setSaleProducts] = useState<SaleItemInterface[]>([]);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-end gap-3 items-end">
          <AddSaleItemModal addProductToSale={setSaleProducts} />
        </div>
      </div>
    );
  }, []);

  const submitSale = useCallback(async () => {
    const saleItemsRequest = saleProducts.reduce<SaleRequest[]>((items, saleItem) => {
      return [...items, {quantity : saleItem.quantity, productid : saleItem.productid}]
    },[])

    const { ok, message } = await createSale(saleItemsRequest);
    ok ? toast.success(message) : toast.error(message);
    router.replace("/sales");
  }, [saleProducts, router]);

  const bottomContent = useMemo(() => {
    return (
      <div className="flex w-full">
        {saleProducts.length > 0 && (
          <Button
            className="w-full"
            variant="shadow"
            color="primary"
            onPress={submitSale}
          >
            Hacer compra
          </Button>
        )}
      </div>
    );
  },[saleProducts.length, submitSale]);

  const removeProductFromSale = useCallback(
    (productId: string) => {
      const filteredProducts = saleProducts.filter(
        (product) => product.productid !== productId
      );
      setSaleProducts(filteredProducts);
    },
    [saleProducts]
  );

  const renderCell = useCallback(
    (product: SaleItemInterface, columnKey: React.Key) => {
      const cellValue = product[columnKey as keyof SaleItemInterface];
      switch (columnKey) {
        case "actions":
          return (
            <div className="relative flex justify-center items-center">
              <Tooltip color="danger" content="Remover">
                <a
                  onClick={() => removeProductFromSale(product.productid)}
                  className="text-lg text-danger cursor-pointer active:opacity-50"
                >
                  <DeleteIcon />
                </a>
              </Tooltip>
            </div>
          );

        case "price":
          return (
            <div className="text-left">
              {currencyFormat(cellValue as number)}
            </div>
          );

        default:
          return <div className="text-left">{cellValue}</div>;
      }
    },
    [removeProductFromSale]
  );

  const columns = [
    {
      key: "productid",
      label: "ID Producto",
    },
    {
      key: "name",
      label: "Nombre",
    },
    {
      key: "price",
      label: "Precio",
    },
    {
      key: "quantity",
      label: "Cantidad",
    },
    {
      key: "actions",
      label: "Acciones",
    },
  ];

  return (
    <Table
      aria-label="Table to display items of a new sale."
      topContent={topContent}
      bottomContent={bottomContent}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.key}
            className={column.key === "actions" ? "text-center" : "text-left"}
          >
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        emptyContent={"No productos en esta venta."}
        items={saleProducts}
      >
        {(item) => (
          <TableRow key={item.productid}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
