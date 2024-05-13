"use client";

import { Sale, SaleItem } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import { useCallback } from "react";

interface Props {
  sale: Sale & {
    saleItems: SaleItem[];
  };
}

export const SaleInformations = ({ sale }: Props) => {
  const renderCell = useCallback((sale: SaleItem, columnKey: React.Key) => {
    const cellValue = sale[columnKey as keyof SaleItem];

    switch (columnKey) {
      case "product":
        return <div className="text-left">{sale.product.name}</div>;
      case "description":
        return <div className="text-left truncate max-w-64">{sale.product.description}</div>;
      case "price":
        return <div className="text-left">{sale.product.price}</div>;
      default:
        return <div className="text-left">{cellValue!.toString()}</div>;
    }
  }, []);

  const columns = [
    {
      key: "id",
      label: "ID",
    },
    {
      key: "product",
      label: "Producto",
    },
    {
      key: "description",
      label: "Descripcion",
    },
    {
      key: "quantity",
      label: "Cantidad",
    },
    {
      key: "price",
      label: "Precio",
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
        items={sale.saleItems ?? []}
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
};
