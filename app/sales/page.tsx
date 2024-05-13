import { title } from "@/components/primitives";
import { getSales } from "../../actions/sale/get-sales";
import { Button } from "@nextui-org/button";
import { SalesTable } from "@/components";
import NextLink from 'next/link';

export const metadata = {
  title: "Sales",
  description: "Sales Page",
};

export default async function SalesLayout() {
  const { ok, sales } = await getSales();
  if (!ok) {
    throw new Error();
  }
  return (
    <>
      <div className="flex flex-col space-y-4">
        <div className="flex w-full justify-between items-center">
          <h1 className={title()}>Ventas</h1>
          <Button as={NextLink} href="/sales/new-sale" variant="shadow" color="primary">
            Nueva Venta
        </Button>
        </div>
        <SalesTable sales={sales} />
      </div>
    </>
  );
}
