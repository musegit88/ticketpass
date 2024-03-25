"use client";
import { getAllCategories } from "@/app/actions/category.actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addUrlQuery, removeKeysFromUrlQuery } from "@/lib/utils";
import { CategoryTypes } from "@/types/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const CategoryFilter = () => {
  const [categories, setCategories] = useState<CategoryTypes[]>([]);
  
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const getCategories = async () => {
      const categoryList = await getAllCategories();
      categoryList && setCategories(categoryList as CategoryTypes[]);
    };
    getCategories();
  }, []);

  const handleSelectedCategory = (category: string) => {

    let newUrl = "";
  
    if (category && category !== "ALL") {
      newUrl = addUrlQuery({
        params: searchParams.toString(),
        key: "category",
        value: category,
      });
    } else {
      newUrl = removeKeysFromUrlQuery({
        params: searchParams.toString(),
        keysToRemove: ["category"],
      });
    }
    router.push(newUrl, { scroll: false });
  };

  return (
    <Select onValueChange={(value: string) => handleSelectedCategory(value)}>
      <SelectTrigger className="">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="All">All</SelectItem>

        {categories.map((category) => (
          <SelectItem key={category.id} value={category.name}>
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CategoryFilter;
