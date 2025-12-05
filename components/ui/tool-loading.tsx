'use client';

import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ToolLoadingProps {
  toolName: string;
  className?: string;
}

const toolDisplayNames: Record<string, string> = {
  getWeather: 'Fetching weather data',
  getStockPrice: 'Looking up stock price',
  calculate: 'Calculating',
  getDateTime: 'Getting current time',
  createTask: 'Creating task',
};

export function ToolLoading({ toolName, className }: ToolLoadingProps) {
  const displayName = toolDisplayNames[toolName] || `Running ${toolName}`;

  return (
    <div className={cn(
      'flex items-center gap-2 rounded-lg border border-dashed bg-muted/30 px-3 py-2 animate-pulse',
      className
    )}>
      <Loader2 className="h-4 w-4 animate-spin text-primary" />
      <span className="text-sm text-muted-foreground">{displayName}...</span>
    </div>
  );
}
