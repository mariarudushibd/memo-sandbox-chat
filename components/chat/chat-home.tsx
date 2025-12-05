'use client';

import { useState } from 'react';
import { useChat } from '@ai-sdk/react';
import {
  Paperclip,
  Sparkles,
  Settings2,
  ArrowUp,
  Zap,
  Cpu,
  Crown,
  Sun,
  TrendingUp,
  Calculator,
  CheckSquare
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ChatMessage } from './chat-message';

const suggestions = [
  { icon: Sun, text: "What's the weather in Tokyo?", color: 'text-orange-500' },
  { icon: TrendingUp, text: 'AAPL stock price', color: 'text-green-500' },
  { icon: Calculator, text: 'Calculate 15% of 850', color: 'text-blue-500' },
  { icon: CheckSquare, text: 'Create a task to review docs', color: 'text-purple-500' },
];

const capabilities = [
  { name: 'Weather Lookup', enabled: true },
  { name: 'Stock Prices', enabled: true },
  { name: 'Calculator', enabled: true },
  { name: 'Date/Time', enabled: true },
  { name: 'Task Creation', enabled: true },
];

type ModelType = 'lightning' | 'custom' | 'pro';

export function ChatHome() {
  const [input, setInput] = useState('');
  const [selectedModel, setSelectedModel] = useState<ModelType>('custom');
  const [showCapabilities, setShowCapabilities] = useState(false);

  const { messages, append, isLoading } = useChat({
    api: '/api/chat',
  });

  const handleSubmit = () => {
    if (!input.trim() || isLoading) return;
    append({ role: 'user', content: input });
    setInput('');
  };

  const handleSuggestionClick = (text: string) => {
    append({ role: 'user', content: text });
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Show chat interface when there are messages
  if (messages.length > 0) {
    return (
      <div className="flex flex-col h-full">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isLoading && (
            <div className="flex items-center gap-2 p-4 text-gray-400">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <span className="text-sm">Thinking...</span>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="border-t bg-white p-4">
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
                placeholder="Type your message..."
                className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                rows={1}
              />
              <button
                onClick={handleSubmit}
                disabled={!input.trim() || isLoading}
                className={cn(
                  'absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-all',
                  input.trim() && !isLoading
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:opacity-90'
                    : 'bg-gray-100 text-gray-400'
                )}
              >
                <ArrowUp size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show landing page when no messages
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-end gap-2 p-4">
        <span className="text-sm text-gray-500">Free plan</span>
        <span className="text-gray-300">·</span>
        <button className="text-sm font-medium text-gray-900 hover:underline">
          Upgrade
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        {/* Greeting */}
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 text-center mb-8">
          {getGreeting()}, How Can I Help You?
        </h1>

        {/* Input Area */}
        <div className="w-full max-w-2xl">
          <div className="relative bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
              placeholder="Please enter the task and hand it over to Memo Agent."
              className="w-full px-5 py-4 text-gray-900 placeholder-gray-400 resize-none focus:outline-none min-h-[120px]"
              rows={4}
            />

            {/* Toolbar */}
            <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
              <div className="flex items-center gap-1">
                <ToolbarButton icon={Paperclip} />
                <ToolbarButton icon={Sparkles} label="Subagent" />
                <ToolbarButton label="MCP" />
                <ToolbarButton
                  icon={Settings2}
                  onClick={() => setShowCapabilities(!showCapabilities)}
                />
              </div>

              <div className="flex items-center gap-2">
                {/* Model Selector */}
                <div className="flex items-center bg-gray-100 rounded-lg p-0.5">
                  <ModelButton
                    icon={Zap}
                    label="Lightning"
                    active={selectedModel === 'lightning'}
                    onClick={() => setSelectedModel('lightning')}
                  />
                  <ModelButton
                    icon={Cpu}
                    label="Custom"
                    active={selectedModel === 'custom'}
                    onClick={() => setSelectedModel('custom')}
                  />
                  <ModelButton
                    icon={Crown}
                    label="Pro"
                    active={selectedModel === 'pro'}
                    onClick={() => setSelectedModel('pro')}
                  />
                </div>

                {/* Run Button */}
                <button
                  onClick={handleSubmit}
                  disabled={!input.trim() || isLoading}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all',
                    input.trim() && !isLoading
                      ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:opacity-90 shadow-lg shadow-pink-500/25'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  )}
                >
                  <ArrowUp size={16} />
                  Run
                </button>
              </div>
            </div>

            {/* Capabilities Dropdown */}
            {showCapabilities && (
              <div className="absolute bottom-full left-4 mb-2 bg-white rounded-xl border border-gray-200 shadow-lg p-3 min-w-[200px]">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Built-In</p>
                {capabilities.map((cap) => (
                  <div key={cap.name} className="flex items-center justify-between py-2">
                    <span className="text-sm text-gray-700">{cap.name}</span>
                    <div className={cn(
                      'w-9 h-5 rounded-full transition-colors relative',
                      cap.enabled ? 'bg-blue-500' : 'bg-gray-200'
                    )}>
                      <div className={cn(
                        'absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform',
                        cap.enabled ? 'left-4' : 'left-0.5'
                      )} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Suggestions */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion.text)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:border-gray-300 hover:bg-gray-50 transition-colors"
              >
                <suggestion.icon size={16} className={suggestion.color} />
                {suggestion.text}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="border-t border-gray-100 bg-gray-50/50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <button className="text-sm font-medium text-gray-900 border-b-2 border-gray-900 pb-1">
                Recommend
              </button>
              <button className="text-sm text-gray-500 hover:text-gray-700 pb-1">
                Code
              </button>
              <button className="text-sm text-gray-500 hover:text-gray-700 pb-1">
                Research
              </button>
            </div>
            <button className="text-sm text-gray-500 flex items-center gap-1">
              Popular
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <GalleryCard
              image="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=300&fit=crop"
              title="Generate a dashboard UI"
              author="@designer"
              remixes={1250}
            />
            <GalleryCard
              image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop"
              title="Analyze stock market trends"
              author="@analyst"
              remixes={890}
            />
            <GalleryCard
              image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop"
              title="Create a data visualization"
              author="@dataviz"
              remixes={2100}
            />
            <GalleryCard
              image="https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop"
              title="Build a REST API endpoint"
              author="@developer"
              remixes={1580}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ToolbarButton({
  icon: Icon,
  label,
  onClick
}: {
  icon?: React.ElementType;
  label?: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
    >
      {Icon && <Icon size={16} />}
      {label && <span>{label}</span>}
    </button>
  );
}

function ModelButton({
  icon: Icon,
  label,
  active,
  onClick
}: {
  icon: React.ElementType;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all',
        active
          ? 'bg-white text-gray-900 shadow-sm'
          : 'text-gray-500 hover:text-gray-700'
      )}
    >
      <Icon size={14} />
      {label}
    </button>
  );
}

function GalleryCard({
  image,
  title,
  author,
  remixes
}: {
  image: string;
  title: string;
  author: string;
  remixes: number;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
      <div className="aspect-video bg-gray-100 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-3">
        <h3 className="font-medium text-gray-900 text-sm truncate">{title}</h3>
        <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
          <span>{author}</span>
          <span>{remixes.toLocaleString()} Remixes</span>
        </div>
      </div>
    </div>
  );
}
