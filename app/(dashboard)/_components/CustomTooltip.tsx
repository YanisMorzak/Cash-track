import { cn } from '@/lib/utils';
import React, { useCallback } from 'react'
import CountUp from "react-countup";

export default function CustomTooltip({ active, payload, formatter }: any) {
    if (!active || !payload || payload.length === 0) return null;

    const data = payload[0].payload;
    const { expense, income } = data;
  
  return (
    <div className="min-w-[300px] rounded border bg-background p-4">
    <TooltipRow
      formatter={formatter}
      label="Expense"
      value={expense}
      bgColor="bg-red-500"
      textColor="text-red-500"
    />
    <TooltipRow
      formatter={formatter}
      label="Income"
      value={income}
      bgColor="bg-emerald-500"
      textColor="text-emerald-500"
    />
    <TooltipRow
      formatter={formatter}
      label="Balance"
      value={income - expense}
      bgColor="bg-gray-100"
      textColor="text-foreground"
    />
  </div>
  )
}

function TooltipRow({
    label,
    value,
    bgColor,
    textColor,
    formatter,
  }: {
    label: string;
    textColor: string;
    bgColor: string;
    value: number;
    formatter: Intl.NumberFormat;
  }) {
    const formattingFn = useCallback(
      (value: number) => {
        return formatter.format(value);
      },
      [formatter]
    );
  
    return (
      <div className="flex items-center gap-2">
        <div className={cn("h-4 w-4 rounded-full", bgColor)} />
        <div className="flex w-full justify-between">
          <p className="text-sm text-muted-foreground">{label}</p>
          <div className={cn("text-sm font-bold", textColor)}>
            <CountUp
              duration={0.5}
              preserveValue
              end={value}
              decimals={0}
              formattingFn={formattingFn}
              className="text-sm"
            />
          </div>
        </div>
      </div>
    );
  }
