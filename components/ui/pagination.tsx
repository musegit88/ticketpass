"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "./button";
import { addUrlQuery } from "@/lib/utils";
import { Value } from "@radix-ui/react-select";

type PaginationProps = {
  page: number | string;
  totalPages: number;
  urlParamName?: string;
};

const Pagination = ({ page, totalPages, urlParamName }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = (btnType: string) => {
    const pageValue = btnType === "next" ? Number(page) + 1 : Number(page) - 1;

    const newUrl = addUrlQuery({
      params: searchParams.toString(),
      key: "page"  || urlParamName,
      value: pageValue.toString(),
    });
    router.push(newUrl, { scroll: false });
  };

  return (
    <div className="flex gap-2">
      <Button
        disabled={Number(page) <= 1}
        size="lg"
        variant="outline"
        onClick={() => handleClick("prev")}
      >
        Previous
      </Button>
      <Button
        disabled={Number(page) >= totalPages}
        size="lg"
        variant="default"
        onClick={() => handleClick("next")}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
