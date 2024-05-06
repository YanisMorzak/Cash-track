"use client";

import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { TransactionType } from '@/lib/types';
import { cn } from '@/lib/utils';
import { CreateCategorySchema, CreateCategorySchemaType } from '@/schema/categories';
import { zodResolver } from '@hookform/resolvers/zod';
import { CircleOff, Loader2, PlusSquare } from 'lucide-react';
import React, { ReactNode, useCallback, useState } from 'react'
import { useForm } from 'react-hook-form';
import data from "@emoji-mart/data";
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import { Category } from '@prisma/client';
import { CreateCategory } from '../_actions/categories';
import { toast } from 'sonner';
import CategoryForm from './CategoryForm';

interface Props {
    type: TransactionType;
    trigger?: ReactNode;
    successCallback: (category: Category) => void;
  }

export default function CreateCategoryDialog({ type, trigger, successCallback }: Props) {
    const [open, setOpen] = useState(false);
    const form = useForm<CreateCategorySchemaType>({
        resolver: zodResolver(CreateCategorySchema),
        defaultValues: {
          type,
        },
      });

      const queryClient = useQueryClient();

      const { mutate, isPending } = useMutation({
        mutationFn: CreateCategory,
        onSuccess: async (data: Category) => {
          form.reset({
            name: "",
            icon: "",
            type,
          });
    
          toast.success(`Category ${data.name} created successfully 🎉`, {
            id: "create-category",
          });

          successCallback(data);
     
          await queryClient.invalidateQueries({
            queryKey: ["categories"],
          });
    
          setOpen((prev) => !prev);
        },
        onError: () => {
          toast.error("Something went wrong", {
            id: "create-category",
          });
        },
      });

      const onSubmit = useCallback(
        (values: CreateCategorySchemaType) => {
          toast.loading("Creating category...", {
            id: "create-category",
          });
          mutate(values);
        },
        [mutate]
      );
  return (
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild>
      {trigger ? (
        trigger
      ) : (
        <Button
          variant={"ghost"}
          className="flex border-separate items-center justify-start roudned-none border-b px-3 py-3 text-muted-foreground"
        >
          <PlusSquare className="mr-2 h-4 w-4" />
          Create new
        </Button>
      )}
    </DialogTrigger>
    <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Create
            <span
              className={cn(
                "m-1",
                type === "income" ? "text-emerald-500" : "text-red-500"
              )}
            >
              {type}
            </span>
            category
          </DialogTitle>
          <DialogDescription>
            Categories are used to group your transactions
          </DialogDescription>
        </DialogHeader>
        <CategoryForm form={form} onSubmit={onSubmit}/>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              variant={"secondary"}
              onClick={() => {
                form.reset();
              }}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={form.handleSubmit(onSubmit)} disabled={isPending}>
            {!isPending && "Create"}
            {isPending && <Loader2 className="animate-spin" />}'
          </Button>
        </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}
