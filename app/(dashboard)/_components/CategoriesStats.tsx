"use client"

import { GetCategoriesStatsResponseType } from '@/app/api/stats/categories/route';
import SkeletonWrapper from '@/components/SkeletonWrapper';
import { DateToUTCDate, GetFormatterForCurrency } from '@/lib/helpers';
import { UserSettings } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import React, { useMemo } from 'react'
import CategoriesCard from './CategoriesCard';

interface Props {
    userSettings: UserSettings;
    from: Date;
    to: Date;
  }

export default function CategoriesStats({ userSettings, from, to }: Props) {

    // call the API (stats -> categories) with react query
    const statsQuery = useQuery<GetCategoriesStatsResponseType>({
        queryKey: ["overview", "stats", "categories", from, to],
        queryFn: () =>
          fetch(
            `/api/stats/categories?from=${DateToUTCDate(from)}&to=${DateToUTCDate(
              to
            )}`
          ).then((res) => res.json()),
      });

      const formatter = useMemo(() => {
        return GetFormatterForCurrency(userSettings.currency);
      }, [userSettings.currency]);
    
  return (
    <div className="flex w-full flex-wrap gap-2 md:flex-nowrap">
    <SkeletonWrapper isLoading={statsQuery.isFetching}>
      <CategoriesCard
        formatter={formatter}
        type="income"
        data={statsQuery.data || []}
      />
    </SkeletonWrapper>
    <SkeletonWrapper isLoading={statsQuery.isFetching}>
      <CategoriesCard
        formatter={formatter}
        type="expense"
        data={statsQuery.data || []}
      />
    </SkeletonWrapper>
  </div>
  )
}
