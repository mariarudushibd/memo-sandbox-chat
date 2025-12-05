'use client';

import { CheckSquare, AlertCircle, Clock, Flag } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { TaskData } from '@/ai/tools';

interface TaskCardProps {
  data: TaskData;
  className?: string;
}

const priorityColors = {
  low: 'bg-blue-100 text-blue-700 border-blue-200',
  medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  high: 'bg-red-100 text-red-700 border-red-200',
};

const priorityIcons = {
  low: 'text-blue-500',
  medium: 'text-yellow-500',
  high: 'text-red-500',
};

export function TaskCard({ data, className }: TaskCardProps) {
  if (!data.success) {
    return (
      <div className={cn('rounded-xl border border-red-200 bg-red-50 p-4', className)}>
        <div className="flex items-center gap-2 text-red-600">
          <AlertCircle size={20} />
          <span>Failed to create task</span>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('overflow-hidden rounded-xl border bg-card p-4 shadow-sm animate-fade-in', className)}>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <CheckSquare className="h-5 w-5 text-green-500" />
          <span className="text-sm font-medium text-green-600">Task Created</span>
        </div>
        <div className={cn(
          'flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium',
          priorityColors[data.priority]
        )}>
          <Flag size={10} className={priorityIcons[data.priority]} />
          <span className="capitalize">{data.priority}</span>
        </div>
      </div>

      <div className="mt-3">
        <h4 className="font-semibold">{data.title}</h4>
        {data.description && (
          <p className="mt-1 text-sm text-muted-foreground">{data.description}</p>
        )}
      </div>

      <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <Clock size={12} />
          <span>Created just now</span>
        </div>
        {data.dueDate && (
          <div className="flex items-center gap-1">
            <span>Due: {new Date(data.dueDate).toLocaleDateString()}</span>
          </div>
        )}
      </div>

      <div className="mt-2 rounded bg-muted/50 px-2 py-1 text-xs font-mono text-muted-foreground">
        ID: {data.id}
      </div>
    </div>
  );
}
