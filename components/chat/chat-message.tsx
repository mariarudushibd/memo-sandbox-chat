'use client';

import { Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { WeatherCard } from '@/components/ui/weather-card';
import { StockCard } from '@/components/ui/stock-card';
import { CalculatorCard } from '@/components/ui/calculator-card';
import { DateTimeCard } from '@/components/ui/datetime-card';
import { TaskCard } from '@/components/ui/task-card';
import { ToolLoading } from '@/components/ui/tool-loading';
import type { UIMessage } from 'ai';

interface ChatMessageProps {
  message: UIMessage;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={cn('flex gap-3 p-4 animate-fade-in', isUser ? 'bg-muted/30' : 'bg-background')}>
      <div className={cn(
        'flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
        isUser ? 'bg-primary text-primary-foreground' : 'bg-gradient-to-br from-violet-500 to-purple-600 text-white'
      )}>
        {isUser ? <User size={16} /> : <Bot size={16} />}
      </div>

      <div className="flex-1 space-y-3 overflow-hidden">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm">{isUser ? 'You' : 'Memo'}</span>
        </div>

        <div className="space-y-3">
          {message.parts.map((part, index) => {
            if (part.type === 'text') {
              return (
                <div key={index} className="prose prose-sm max-w-none text-foreground">
                  <p className="whitespace-pre-wrap">{part.text}</p>
                </div>
              );
            }

            if (part.type === 'tool-invocation') {
              const { toolName, state, result } = part;

              if (state === 'call' || state === 'partial-call') {
                return <ToolLoading key={index} toolName={toolName} />;
              }

              if (state === 'result' && result) {
                return (
                  <div key={index} className="max-w-sm">
                    {toolName === 'getWeather' && <WeatherCard data={result} />}
                    {toolName === 'getStockPrice' && <StockCard data={result} />}
                    {toolName === 'calculate' && <CalculatorCard data={result} />}
                    {toolName === 'getDateTime' && <DateTimeCard data={result} />}
                    {toolName === 'createTask' && <TaskCard data={result} />}
                  </div>
                );
              }
            }

            return null;
          })}
        </div>
      </div>
    </div>
  );
}
