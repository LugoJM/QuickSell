import {
	Navbar as NextUINavbar,
	NavbarContent,
	NavbarBrand,
} from "@nextui-org/navbar";

import { siteConfig } from "@/config/site";
import NextLink from "next/link";

import { Logo } from "@/components";
import { ThemeSwitch } from "@/components"
import { NavBarLink } from "./NavBarLink";

export const Navbar = () => {

	return (
		<NextUINavbar maxWidth="xl" position="sticky">
			<NavbarContent className="basis-1/5 sm:basis-full" justify="start">
				<NavbarBrand as="li" className="gap-3 max-w-fit">
					<NextLink className="flex justify-start items-center gap-1" href="/">
						<Logo />
						<p className="font-bold text-inherit">QuickSell</p>
					</NextLink>
				</NavbarBrand>
			</NavbarContent>

			<NavbarContent>
				<ul className="hidden lg:flex gap-4 w-full justify-center">
					{siteConfig.navItems.map((item) => (
						<NavBarLink key={item.label} {...item} />
					))}
				</ul>
			</NavbarContent>

			<NavbarContent
				className="hidden sm:flex basis-1/5 sm:basis-full"
				justify="end"
			>
				<ThemeSwitch/>
				<span className="font-bold">Universidad Estatal De Sonora</span>
			</NavbarContent>
		</NextUINavbar>
	);
};
