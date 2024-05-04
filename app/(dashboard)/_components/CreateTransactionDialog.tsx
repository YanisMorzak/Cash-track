"use client";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TransactionType } from "@/lib/types";
import { ReactNode } from "react";

interface Props {
    trigger: ReactNode;
    type: TransactionType;
  }

  function CreateTransactionDialog({ trigger, type }: Props) {
  
    return (
      <Dialog>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
      </Dialog>
    );
  }
  
  export default CreateTransactionDialog;