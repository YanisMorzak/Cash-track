"use client"

import { GetFormatterForCurrency } from '@/lib/helpers';
import { Period, Timeframe } from '@/lib/types';
import { UserSettings } from '@prisma/client'
import React, { useMemo, useState } from 'react'

export default function History({ userSettings }: { userSettings: UserSettings }) {
    const [timeframe, setTimeframe] = useState<Timeframe>("month");
    const [period, setPeriod] = useState<Period>({
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
    });

    const formatter = useMemo(() => {
        return GetFormatterForCurrency(userSettings.currency);
      }, [userSettings.currency]);
  
  return (
    <div>History</div>
  )
}
