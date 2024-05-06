"use client";

import { GetBalanceStatsResponseType } from "@/app/api/stats/balance/route";
import { DateToUTCDate, GetFormatterForCurrency } from "@/lib/helpers";
import { UserSettings } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

interface Props {
    from: Date;
    to: Date;
    userSettings: UserSettings;
  }

function StatsCards({ from, to, userSettings }: Props) {
    const statsQuery = useQuery<GetBalanceStatsResponseType>({
      queryKey: ["overview", "stats", from, to],
      queryFn: () =>
        fetch(
          `/api/stats/balance?from=${DateToUTCDate(from)}&to=${DateToUTCDate(to)}`
        ).then((res) => res.json()),
    });

    const formatter = useMemo(() => {
        return GetFormatterForCurrency(userSettings.currency);
      }, [userSettings.currency]);
    
      const income = statsQuery.data?.income || 0;
      const expense = statsQuery.data?.expense || 0;
    
      const balance = income - expense;
  
    return (
      <div className="relative flex w-full flex-wrap gap-2 md:flex-nowrap">
       stats
      </div>
    );
  }
  
  export default StatsCards;
  