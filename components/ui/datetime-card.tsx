'use client';

import { Clock, Globe, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { DateTimeData } from '@/ai/tools';

interface DateTimeCardProps {
  data: DateTimeData;
  className?: string;
}

export function DateTimeCard({ data, className }: DateTimeCardProps) {
  return (
    <div className={cn(
      'overflow-hidden rounded-xl border bg-gradient-to-br from-indigo-500 to-purple-600 p-4 text-white shadow-lg animate-fade-in',
      className
    )}>
      <div className="flex items-center gap-2">
        <Clock className="h-5 w-5" />
        <span className="text-sm font-medium opacity-90">Current Time</span>
      </div>

      <div className="mt-3">
        <p className="text-2xl font-bold">{data.formatted}</p>
      </div>

      <div className="mt-3 flex items-center gap-4 text-sm opacity-90">
        <div className="flex items-center gap-1">
          <Globe size={14} />
          <span>{data.timezone}</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar size={14} />
          <span>{data.dayOfWeek}</span>
        </div>
      </div>

      {data.error && (
        <p className="mt-2 text-xs opacity-75">{data.error}</p>
      )}
    </div>
  );
}
