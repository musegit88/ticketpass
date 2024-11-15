"use client";

import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="absolute inset-0 ">
      <div className="flex justify-center items-center h-full">
        <Loader2 className="animate-spin" />
      </div>
    </div>
  );
};

export default Loading;
