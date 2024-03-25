"use client";

import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { addUrlQuery, removeKeysFromUrlQuery } from "@/lib/utils";

const Search = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      let newUrl = "";
      if (query) {
        newUrl = addUrlQuery({
          params: searchParams.toString(),
          key: "query",
          value: query,
        });
      } else {
        newUrl = removeKeysFromUrlQuery({
          params: searchParams.toString(),
          keysToRemove: ["query"],
        });
      }
      router.push(newUrl, { scroll: false });
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [query, searchParams, router]);
  return (
    <div className="w-full">
      <div className="flex items-center w-full overflow-hidden rounded-md bg-slate-400/20 px-2">
        <SearchIcon />
        <Input
          type="search"
          placeholder="search"
          onChange={(e) => setQuery(e.target.value)}
          className="bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>
    </div>
  );
};

export default Search;
