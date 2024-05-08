"use client"

import { Period, Timeframe } from '@/lib/types';
import { UserSettings } from '@prisma/client'
import React, { useState } from 'react'

export default function History({ userSettings }: { userSettings: UserSettings }) {
    const [timeframe, setTimeframe] = useState<Timeframe>("month");
    const [period, setPeriod] = useState<Period>({
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
    });
  
  return (
    <div>History</div>
  )
}
