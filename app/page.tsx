import { title, subtitle } from "@/components/primitives";
import { button as buttonStyles } from "@nextui-org/theme";
import Link from "next/link";

export default function Home() {
	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			<div className="inline-block max-w-lg text-center justify-center">
				<h1 className={title()}>Bienvenido a&nbsp;</h1>
				<h1 className={title({ color: "violet" })}>QuickSell&nbsp;</h1>
				<br />
				<h1 className={title()}>
					una pagina web para realizar operaciones de inventario.
				</h1>
				<h2 className={subtitle({ class: "mt-4" })}>
					Comienza a realizar operaciones.
				</h2>
			</div>
			<div className="flex gap-3">
				<Link
				
					href="/inventory"
					className={`${buttonStyles({ color: "primary", radius: "full", variant: "shadow" })} text-xl`}
				>
					Inventario
				</Link>
				<Link
					className={`${buttonStyles({ color: "warning", radius: "full", variant: "shadow" })} text-xl`}
					href="/sales"
				>
					Ventas
				</Link>
			</div>
		</section>
	);
}
