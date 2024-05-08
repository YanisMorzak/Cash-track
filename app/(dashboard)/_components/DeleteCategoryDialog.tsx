"use client"

import { Category } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { ReactNode } from 'react'
import { DeleteCategory } from '../_actions/categories';
import { toast } from 'sonner';

interface Props {
    trigger: ReactNode;
    category: Category;
  }

export default function DeleteCategoryDialog({ category, trigger }: Props) {
    const categoryIdentifier = `${category.name}-${category.type}`;
    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: DeleteCategory,
        onSuccess: async () => {
          toast.success("Category deleted successfully", {
            id: categoryIdentifier,
          });
    
          await queryClient.invalidateQueries({
            queryKey: ["categories"],
          });
        },
        onError: () => {
          toast.error("Something went wrong", {
            id: categoryIdentifier,
          });
        },
      });
  return (
    <div>DeleteCategoryDialog</div>
  )
}
