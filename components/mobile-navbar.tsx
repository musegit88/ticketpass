"use client"


import Image from "next/image";
import Link from "next/link";

import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Separator } from "./ui/separator";
import NavbarItems from "./ui/navbar-items";

const MobileNavbar = () => {
  return (
    <nav className="md:hidden flex items-center ml-4">
      <Sheet>
        <SheetTrigger>
          <Menu />
        </SheetTrigger>
        <SheetContent className="md:hidden flex flex-col gap-4">
        <Link href={"/"}>
          <Image src={"/icons/ticketpass.svg"} alt="ticketpass" width={120} height={40}/>
        </Link>
          <Separator />
          <NavbarItems />
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNavbar;
