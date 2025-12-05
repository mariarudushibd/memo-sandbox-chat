'use client';

import { Calculator, CheckCircle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CalculatorData } from '@/ai/tools';

interface CalculatorCardProps {
  data: CalculatorData;
  className?: string;
}

export function CalculatorCard({ data, className }: CalculatorCardProps) {
  return (
    <div className={cn('overflow-hidden rounded-xl border bg-card p-4 shadow-sm animate-fade-in', className)}>
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100">
          <Calculator className="h-4 w-4 text-purple-600" />
        </div>
        <span className="text-sm font-medium text-muted-foreground">Calculator</span>
        {data.success ? (
          <CheckCircle className="h-4 w-4 text-green-500 ml-auto" />
        ) : (
          <XCircle className="h-4 w-4 text-red-500 ml-auto" />
        )}
      </div>

      <div className="mt-3 space-y-2">
        <div className="rounded-lg bg-muted/50 p-3 font-mono text-sm">
          {data.expression}
        </div>

        {data.success ? (
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">=</span>
            <span className="text-2xl font-bold text-primary">{data.result}</span>
          </div>
        ) : (
          <p className="text-sm text-red-500">{data.error}</p>
        )}
      </div>
    </div>
  );
}
