import { title } from "@/components/primitives";
import { getProducts } from "@/actions";
import { InventoryTable } from "@/components";
import { ProductModal } from "@/components/products/ProductModal";


export const metadata = {
  title: "Inventory",
  description: "Inventory Page",
};

export default async function InventoryPage() {
  const { inventory } = await getProducts();
  return (
    <>
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <h1 className={title()}>Inventario</h1>
		      <ProductModal action="Agregar" />
        </div>
        <InventoryTable inventory={inventory} />
      </div>
    </>
  );
}
