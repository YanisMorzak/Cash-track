"use client"

import { GetCategoriesStatsResponseType } from '@/app/api/stats/categories/route';
import { DateToUTCDate } from '@/lib/helpers';
import { UserSettings } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import React from 'react'

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
    
  return (
    <div>CategoriesStats</div>
  )
}
