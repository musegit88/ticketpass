"use client";


import Link from "next/link";
import Image from "next/image";

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import DesktopNavbar from "./desktop-navbar";
import MobileNavbar from "./mobile-navbar";

const Header = () => {
  return (
    <header className="border-b w-full">
      <nav className="flex items-center justify-between max-w-7xl lg:mx-auto p-5 md:px-10 xl:px-0 w-full">
        <Link href={"/"}>
          <Image src={"/icons/ticketpass.svg"} alt="ticketpass" width={120} height={40}/>
        </Link>
        <nav className="md:flex justify-between hidden w-full max-w-xs ">
          <DesktopNavbar />
        </nav>
        <div className="flex justify-end w-32">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <Button asChild className="rounded-lg" size="lg">
              <Link href="/sign-in">Login</Link>
            </Button>
          </SignedOut>
          <MobileNavbar />
        </div>
      </nav>
    </header>
  );
};

export default Header;
