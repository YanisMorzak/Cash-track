"use client"

import { GetTransactionHistoryResponseType } from '@/app/api/transactions-history/route';
import { DateToUTCDate } from '@/lib/helpers';
import { useQuery } from '@tanstack/react-query';
import React from 'react'

interface Props {
    from: Date;
    to: Date;
  }

export default function TransactionTable({ from, to }: Props) {
    const history = useQuery<GetTransactionHistoryResponseType>({
        queryKey: ["transactions", "history", from, to],
        queryFn: () =>
          fetch(
            `/api/transactions-history?from=${DateToUTCDate(
              from
            )}&to=${DateToUTCDate(to)}`
          ).then((res) => res.json()),
      });
  return (
    <div>TransactionTable</div>
  )
}
