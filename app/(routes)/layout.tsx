import Footer from "@/components/footer";
import Header from "@/components/header";
import React from "react";

const RoutesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-1  max-w-7xl lg:mx-auto p-5 md:px-10 xl:px-0 w-full">{children}</main>
      <Footer />
    </div>
  );
};
export default RoutesLayout;
