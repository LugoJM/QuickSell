"use client";

import { Sale } from "@/types";
import { currencyFormat } from "@/utils";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table";
import { Tooltip } from "@nextui-org/tooltip";
import { useCallback } from "react";
import { EyeIcon } from "@/components";
import Link from "next/link";

interface Props {
  sales : Sale[];
}

export const SalesTable = ( { sales } : Props) => {
  const renderCell = useCallback((product: Sale, columnKey: React.Key) => {
    const cellValue = product[columnKey as keyof Sale];
    switch (columnKey) {
      case "actions":
        return (
          <div className="relative flex justify-center items-center">
            <Link href={`/sales/${product.id}`}>
              <Tooltip content="Detalles">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EyeIcon />
                </span>
              </Tooltip>
            </Link>
          </div>
        );

      case "subTotal":
      case "tax":
      case "total":
        return (
          <div className="text-left">
            {currencyFormat(cellValue as number)}
          </div>
        )

      default:
        return (
          <div className="text-left">
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
      key: "subTotal",
      label: "Subtotal",
    },
    {
      key: "tax",
      label: "Impuesto",
    },
    {
      key: "total",
      label: "Total",
    },
    {
      key: "productsInSale",
      label: "Productos Vendidos",
    },
    {
      key: "actions",
      label: "Acciones",
    },
  ];

  return (
    <Table aria-label="Table to display sales.">
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
        emptyContent={"No hay ventas para mostrar."}
        items={sales}
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
