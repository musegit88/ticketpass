import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { startTransition, useEffect, useState } from "react";
import { Input } from "./input";
import {
  createCategory,
  getAllCategories,
} from "@/app/actions/category.actions";
import { CategoryTypes } from "@/types/types";
import { PlusSquare } from "lucide-react";

interface ListboxProps {
  value?: string;
  onChangeHandler?: () => void;
}

const Listbox = ({ onChangeHandler, value }: ListboxProps) => {
  const [categories, setCategories] = useState<CategoryTypes[]>([]);
  const [newCategory, setNewCategory] = useState("");

  const addCategory = () => {
    createCategory({ categoryName: newCategory.trim() }).then((category) =>
      setCategories((prev) => [...prev, category])
    );
  };

  useEffect(() => {
    const getCategories = async () => {
      const categoryList = await getAllCategories();
      categoryList && setCategories(categoryList as CategoryTypes[]);
    };
    getCategories();
  }, []);

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger>
        <SelectValue placeholder="Category" />
      </SelectTrigger>

      <SelectContent>
        {categories.length > 0 &&
          categories.map((category) => (
            <SelectItem key={category.id} value={category.id}>
              {category.name}
            </SelectItem>
          ))}
        <AlertDialog>
          <AlertDialogTrigger className="flex w-full font-medium py-2 pl-8 rounded-sm hover:bg-accent">
            <PlusSquare /> Create category
          </AlertDialogTrigger>
          <AlertDialogContent className="rounded-md">
            <AlertDialogHeader>
              <AlertDialogTitle>New Category</AlertDialogTitle>
              <Input
                placeholder="conference"
                onChange={(e) => setNewCategory(e.target.value)}
              />
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => startTransition(addCategory)}>
                Create
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SelectContent>
    </Select>
  );
};

export default Listbox;
