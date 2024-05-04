"use client";

import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { TransactionType } from '@/lib/types';
import { CreateCategorySchema, CreateCategorySchemaType } from '@/schema/categories';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusSquare } from 'lucide-react';
import React, { ReactNode, useState } from 'react'
import { useForm } from 'react-hook-form';

interface Props {
    type: TransactionType;
    trigger?: ReactNode;
  }

export default function CreateCategoryDialog({ type, trigger }: Props) {
    const [open, setOpen] = useState(false);
    const form = useForm<CreateCategorySchemaType>({
        resolver: zodResolver(CreateCategorySchema),
        defaultValues: {
          type,
        },
      });
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
    </Dialog>
  )
}
