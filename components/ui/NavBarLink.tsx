"use client";

import { NavbarItem } from "@nextui-org/navbar";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  label: string;
  href: string;
}

export const NavBarLink = ({ label, href }: Props) => {
  const pathName = usePathname();
  const isActive = href === pathName;
  return (
    <NavbarItem key={href} isActive={isActive}>
      <NextLink color="foreground" href={href}>
        {label}
      </NextLink>
    </NavbarItem>
  );
};
