'use client';

import { TrendingUp, TrendingDown, Activity, DollarSign, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { StockData } from '@/ai/tools';

interface StockCardProps {
  data: StockData;
  className?: string;
}

export function StockCard({ data, className }: StockCardProps) {
  const isPositive = data.change >= 0;
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;

  return (
    <div className={cn('overflow-hidden rounded-xl border bg-card p-4 shadow-sm animate-fade-in', className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Activity className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-bold text-lg">{data.symbol}</h3>
            <p className="text-xs text-muted-foreground">Stock Price</p>
          </div>
        </div>
        <div className={cn(
          'flex items-center gap-1 rounded-full px-2 py-1 text-sm font-medium',
          isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        )}>
          <TrendIcon size={14} />
          <span>{isPositive ? '+' : ''}{data.changePercent}%</span>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold">${data.price.toFixed(2)}</span>
          <span className={cn('text-sm font-medium', isPositive ? 'text-green-600' : 'text-red-600')}>
            {isPositive ? '+' : ''}{data.change.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-muted/50 p-2">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <TrendingUp size={12} /><span>High</span>
          </div>
          <p className="font-semibold">${data.high.toFixed(2)}</p>
        </div>
        <div className="rounded-lg bg-muted/50 p-2">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <TrendingDown size={12} /><span>Low</span>
          </div>
          <p className="font-semibold">${data.low.toFixed(2)}</p>
        </div>
        <div className="rounded-lg bg-muted/50 p-2">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <BarChart3 size={12} /><span>Volume</span>
          </div>
          <p className="font-semibold">{(data.volume / 1000000).toFixed(2)}M</p>
        </div>
        <div className="rounded-lg bg-muted/50 p-2">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <DollarSign size={12} /><span>Mkt Cap</span>
          </div>
          <p className="font-semibold">${data.marketCap}</p>
        </div>
      </div>
    </div>
  );
}
