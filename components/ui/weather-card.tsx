'use client';

import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning, Wind, Droplets, Thermometer } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { WeatherData } from '@/ai/tools';

interface WeatherCardProps {
  data: WeatherData;
  className?: string;
}

const weatherIcons: Record<string, React.ElementType> = {
  'Sunny': Sun,
  'Cloudy': Cloud,
  'Partly Cloudy': Cloud,
  'Rainy': CloudRain,
  'Stormy': CloudLightning,
  'Snowy': CloudSnow,
};

const weatherGradients: Record<string, string> = {
  'Sunny': 'from-yellow-400 to-orange-500',
  'Cloudy': 'from-gray-400 to-gray-600',
  'Partly Cloudy': 'from-blue-400 to-gray-500',
  'Rainy': 'from-blue-500 to-blue-700',
  'Stormy': 'from-gray-700 to-purple-900',
  'Snowy': 'from-blue-200 to-blue-400',
};

export function WeatherCard({ data, className }: WeatherCardProps) {
  const Icon = weatherIcons[data.condition] || Cloud;
  const gradient = weatherGradients[data.condition] || 'from-blue-400 to-blue-600';
  const unitSymbol = data.unit === 'fahrenheit' ? 'F' : 'C';

  return (
    <div className={cn(
      'relative overflow-hidden rounded-xl p-4 text-white shadow-lg',
      'bg-gradient-to-br', gradient, 'animate-fade-in', className
    )}>
      <div className="absolute -right-4 -top-4 opacity-20">
        <Icon size={120} />
      </div>

      <div className="relative z-10">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold">{data.location}</h3>
            <p className="text-sm opacity-90">{data.condition}</p>
          </div>
          <Icon size={32} className="opacity-90" />
        </div>

        <div className="mt-4">
          <span className="text-5xl font-bold">{data.temperature}</span>
          <span className="text-2xl">°{unitSymbol}</span>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
          <div className="flex items-center gap-1">
            <Thermometer size={16} className="opacity-80" />
            <span>Feels {data.feelsLike}°</span>
          </div>
          <div className="flex items-center gap-1">
            <Droplets size={16} className="opacity-80" />
            <span>{data.humidity}%</span>
          </div>
          <div className="flex items-center gap-1">
            <Wind size={16} className="opacity-80" />
            <span>{data.windSpeed} km/h</span>
          </div>
        </div>
      </div>
    </div>
  );
}
