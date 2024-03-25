"use client";
import { navLinks } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavbarItems = () => {
  const pathname = usePathname();
  return (
    <ul className="md:flex-row md:justify-between md:items-center flex flex-col items-start w-full gap-5">
      {navLinks.map((link) => (
        <li
          key={link.title}
          className={cn(pathname === link.href ? "text-gray-500" : "")}
        >
          <Link href={link.href}>{link.title}</Link>
        </li>
      ))}
    </ul>
  );
};

export default NavbarItems;
