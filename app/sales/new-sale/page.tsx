import { NewSaleTable } from "@/components";
import { title } from "@/components/primitives"


export default function NewSalePage() {
  return (
    <div className="flex flex-col flex-grow text-center">
      <h1 className={`${title()} mb-4`}>Nueva Venta</h1>
      <NewSaleTable />
    </div>
  );
}