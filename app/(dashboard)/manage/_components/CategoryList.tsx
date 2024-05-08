"use client"

import { TransactionType } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';
import React from 'react'

export default function CategoryList({ type }: { type: TransactionType }) {
    const categoriesQuery = useQuery({
        queryKey: ["categories", type],
        queryFn: () =>
          fetch(`/api/categories?type=${type}`).then((res) => res.json()),
      });
    
  return (
    <div>CategoryList</div>
  )
}
