"use client";


import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t">
      <div className="max-w-7xl lg:mx-auto p-5 md:px-10 xl:px-0 w-full flex flex-col items-center gap-4 md:flex-row md:items-center justify-between">
        <div className="flex flex-col items-center md:flex-row md:items-center gap-4">
        <Link href={"/"}>
          <Image src={"/icons/ticketpass.svg"} alt="ticketpass" width={120} height={40}/>
        </Link>
          <p className="text-xs text-gray-500">
            {year} Ticketpass. All Rights reserved.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span>About</span>
          <span>Privacy Policy</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
