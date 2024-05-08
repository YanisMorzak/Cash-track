"use client"

import SkeletonWrapper from '@/components/SkeletonWrapper';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { TransactionType } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';
import { PlusSquare, TrendingDown, TrendingUp } from 'lucide-react';
import React from 'react'
import CreateCategoryDialog from '../../_components/CreateCategoryDialog';
import { Button } from '@/components/ui/button';

export default function CategoryList({ type }: { type: TransactionType }) {
    const categoriesQuery = useQuery({
        queryKey: ["categories", type],
        queryFn: () =>
          fetch(`/api/categories?type=${type}`).then((res) => res.json()),
      });
    
  return (
    <SkeletonWrapper isLoading={categoriesQuery.isLoading}>
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {type === "expense" ? (
              <TrendingDown className="h-12 w-12 items-center rounded-lg bg-red-400/10 p-2 text-red-500" />
            ) : (
              <TrendingUp className="h-12 w-12 items-center rounded-lg bg-emerald-400/10 p-2 text-emerald-500" />
            )}
            <div>
              {type === "income" ? "Incomes" : "Expenses"} categories
              <div className="text-sm text-muted-foreground">
                Sorted by name
              </div>
            </div>
          </div>

          <CreateCategoryDialog
            type={type}
            successCallback={() => categoriesQuery.refetch()}
            trigger={
              <Button className="gap-2 text-sm">
                <PlusSquare className="h-4 w-4" />
                Create category
              </Button>
            }
          />
        </CardTitle>
      </CardHeader>
      </Card>
      </SkeletonWrapper>
  )
}
