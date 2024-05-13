import { getSaleById } from "@/actions";
import { SaleInformations } from "@/components";
import { subtitle, title } from "@/components/primitives";
import { currencyFormat } from "@/utils";
import { Input } from "@nextui-org/input";

export const metadata = {
  title: "Sale",
  description: "Sale page.",
};

interface Props {
  params: {
    slug: string;
  };
}

export default async function SaleDetailsPage({ params }: Props) {
  const { slug } = params;
  const { ok, sale } = await getSaleById(slug);
  if (!ok) throw new Error();


  return (
    <div className="flex flex-col text-center">
      <h1 className={`${title()}`}>{`Venta: ${sale.id.split("-").at(-1)}`}</h1>
      <div className="flex gap-4 py-2">
        <Input
          type="text"
          label="Subtotal"
          labelPlacement="outside"
          value={currencyFormat(sale.subTotal)}
          isDisabled
        />
        <Input
          type="text"
          label="Impuestos"
          labelPlacement="outside"
          value={currencyFormat(sale.tax)}
          isDisabled
        />
        <Input
          type="text"
          label="Total"
          labelPlacement="outside"
          value={currencyFormat(sale.total)}
          isDisabled
        />
        <Input
          type="number"
          label="Total de Articulos"
          labelPlacement="outside"
          value={sale.productsInSale.toString()}
          isDisabled
        />
      </div>
      <h2 className={`${subtitle()}`}>Productos Vendidos</h2>
      <SaleInformations sale={sale}/>
    </div>
  );
}
