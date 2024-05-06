"use client";

import { GetBalanceStatsResponseType } from "@/app/api/stats/balance/route";
import { DateToUTCDate } from "@/lib/helpers";
import { UserSettings } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

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
  
    return (
      <div className="relative flex w-full flex-wrap gap-2 md:flex-nowrap">
       stats
      </div>
    );
  }
  
  export default StatsCards;
  