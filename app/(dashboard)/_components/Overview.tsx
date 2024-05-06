"use client";

import { DateRangePicker } from '@/components/ui/date-range-picker';
import { UserSettings } from '@prisma/client';
import { startOfMonth } from 'date-fns';
import React, { useState } from 'react'

export default function Overview({ userSettings }: { userSettings: UserSettings }) {
    const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
        from: startOfMonth(new Date()),
        to: new Date(),
      });
  return (
    <>
      <div className="container flex flex-wrap items-end justify-between gap-2 py-6">
        <h2 className="text-3xl font-bold">Overview</h2>
        <div className="flex items-center gap-3">
          <DateRangePicker/>
        </div>
      </div>
      </>
  )
}
