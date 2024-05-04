"use client"

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { TransactionType } from "@/lib/types";
import { Category } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { ChevronsUpDown } from "lucide-react";
import React from "react";
import { CategoryRow } from "./CategoryRow";
import { Command, CommandInput } from "@/components/ui/command";
import CreateCategoryDialog from "./CreateCategoryDialog";

interface Props {
    type: TransactionType;
  }
  
  function CategoryPicker({ type}: Props) {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState("");
  
    const categoriesQuery = useQuery({
      queryKey: ["categories", type],
      queryFn: () =>
        fetch(`/api/categories?type=${type}`).then((res) => res.json()),
    });

    const selectedCategory = categoriesQuery.data?.find(
        (category: Category) => category.name === value
      );
  
    return (
        <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedCategory ? (
            <CategoryRow category={selectedCategory} />
          ) : (
            "Select category"
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <CommandInput placeholder="Search category..." />
          <CreateCategoryDialog type={type} />
         
        </Command>
      </PopoverContent>
      </Popover>
    )
  }  

  export default CategoryPicker;