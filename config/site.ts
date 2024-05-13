export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "QuickSell",
	description: "Simple college project.",
	navItems: [
    {
      label: "Inventario",
      href: "/inventory",
    },
    {
      label: "Ventas",
      href: "/sales",
    },
	],
};
