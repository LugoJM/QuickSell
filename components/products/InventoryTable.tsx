"use client";

import { Product } from "@/types"
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/table";
import { Tooltip } from "@nextui-org/tooltip";
import { useCallback } from "react";
import { DeleteIcon } from "@/components";
import { EditIcon } from "@/components/ui/EditIcon"
import { ProductModal } from "@/components";
import { ConfirmDeleteModal } from "@/components";


interface Props {
  inventory : Product[];
}


export const InventoryTable = ( { inventory } : Props ) => {

  const renderCell = useCallback((product: Product, columnKey: React.Key) => {
    const cellValue = product[columnKey as keyof Product];

    switch (columnKey) {
      case "actions":
        return (
          <div className="relative flex justify-center items-center gap-2">
            <ProductModal product={product} action="Editar">
              <Tooltip content="Editar producto">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EditIcon />
                </span>
              </Tooltip>
            </ProductModal>
            <ConfirmDeleteModal productID={product.id}>
              <Tooltip color="danger" content="Eliminar producto">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <DeleteIcon />
                </span>
              </Tooltip>
            </ConfirmDeleteModal>
          </div>
        );
      default:
        return (
          <div className="text-left max-w-64 truncate">
            {cellValue}
          </div>
        )
    }
  }, []);


  const columns = [
    {
      key: "id",
      label: "ID",
    },
    {
      key: "name",
      label: "Nombre",
    },
    {
      key: "description",
      label: "Descripcion",
    },
    {
      key: "price",
      label: "Precio",
    },
    {
      key: "stock",
      label: "Stock",
    },
    {
      key: "actions",
      label: "Acciones",
    },
  ];

  return (
    <Table aria-label="Table to display inventory.">
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
        emptyContent={"No hay inventario para mostrar."}
        items={inventory}
      >
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
