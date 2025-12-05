'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export function ChatInput({ onSend, isLoading, disabled }: ChatInputProps) {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  }, [input]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading && !disabled) {
      onSend(input.trim());
      setInput('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="flex items-end gap-2 rounded-2xl border bg-background p-2 shadow-lg">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask me anything... (try: weather, stocks, calculations)"
          disabled={disabled}
          rows={1}
          className={cn(
            'flex-1 resize-none bg-transparent px-3 py-2 text-sm',
            'placeholder:text-muted-foreground focus:outline-none',
            'disabled:cursor-not-allowed disabled:opacity-50 max-h-[200px]'
          )}
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading || disabled}
          className={cn(
            'flex h-10 w-10 items-center justify-center rounded-xl',
            'bg-primary text-primary-foreground transition-all duration-200',
            'hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed',
            'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
          )}
        >
          {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
        </button>
      </div>

      {!input && (
        <div className="mt-2 flex flex-wrap gap-2">
          {[
            "What's the weather in Tokyo?",
            "AAPL stock price",
            "Calculate 15% of 850",
            "What time is it in London?",
          ].map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => setInput(suggestion)}
              className={cn(
                'rounded-full border bg-background px-3 py-1 text-xs',
                'text-muted-foreground hover:text-foreground',
                'hover:border-primary/50 transition-colors'
              )}
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </form>
  );
}
