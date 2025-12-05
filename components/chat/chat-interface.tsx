'use client';

import { useChat } from '@ai-sdk/react';
import { useRef, useEffect } from 'react';
import { Bot, Sparkles } from 'lucide-react';
import { ChatMessage } from './chat-message';
import { ChatInput } from './chat-input';
import { cn } from '@/lib/utils';

export function ChatInterface() {
  const { messages, append, isLoading, error } = useChat({
    api: '/api/chat',
  });
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (content: string) => {
    append({
      role: 'user',
      content,
    });
  };

  return (
    <div className="flex h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center gap-3 px-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-lg">
            <Bot size={20} />
          </div>
          <div>
            <h1 className="font-bold">Memo Sandbox Chat</h1>
            <p className="text-xs text-muted-foreground">Agentic AI with Generative UI</p>
          </div>
          <div className="ml-auto flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">
            <Sparkles size={12} />
            <span>AI SDK Powered</span>
          </div>
        </div>
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center p-8 text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-xl">
              <Bot size={40} />
            </div>
            <h2 className="mb-2 text-2xl font-bold">Welcome to Memo Chat</h2>
            <p className="mb-6 max-w-md text-muted-foreground">
              I'm an agentic AI assistant with access to real-time tools. I can check weather,
              look up stocks, do calculations, tell time, and create tasks!
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { icon: '☀️', text: 'Weather lookup', example: 'Weather in Paris' },
                { icon: '📈', text: 'Stock prices', example: 'TSLA stock price' },
                { icon: '🧮', text: 'Calculations', example: '25% of 1200' },
                { icon: '✅', text: 'Task creation', example: 'Create a task to...' },
              ].map((item) => (
                <button
                  key={item.text}
                  onClick={() => handleSend(item.example)}
                  className={cn(
                    'flex items-center gap-3 rounded-xl border p-4 text-left',
                    'transition-all hover:border-primary/50 hover:bg-muted/50',
                    'focus:outline-none focus:ring-2 focus:ring-primary'
                  )}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <p className="font-medium">{item.text}</p>
                    <p className="text-xs text-muted-foreground">{item.example}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="divide-y">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
          </div>
        )}

        {isLoading && messages.length > 0 && (
          <div className="flex gap-3 p-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-purple-600 text-white">
              <Bot size={16} />
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <span className="typing-indicator flex gap-1">
                <span className="h-2 w-2 rounded-full bg-current" />
                <span className="h-2 w-2 rounded-full bg-current" />
                <span className="h-2 w-2 rounded-full bg-current" />
              </span>
            </div>
          </div>
        )}

        {error && (
          <div className="mx-4 my-2 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            <p className="font-medium">Something went wrong</p>
            <p className="mt-1 text-xs">{error.message}</p>
          </div>
        )}
      </div>

      <div className="sticky bottom-0 border-t bg-background/80 backdrop-blur-sm p-4">
        <div className="container max-w-3xl">
          <ChatInput onSend={handleSend} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
