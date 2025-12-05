import { tool } from 'ai';
import { z } from 'zod';

/**
 * Weather Tool - Fetches weather information for a location
 * Returns structured data that renders as a custom Weather component
 */
export const weatherTool = tool({
  description: 'Get the current weather for a specific location. Use this when users ask about weather conditions.',
  parameters: z.object({
    location: z.string().describe('The city or location to get weather for'),
    unit: z.enum(['celsius', 'fahrenheit']).optional().default('celsius').describe('Temperature unit'),
  }),
  execute: async ({ location, unit }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const weatherConditions = ['Sunny', 'Cloudy', 'Partly Cloudy', 'Rainy', 'Stormy', 'Snowy'];
    const condition = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
    const tempCelsius = Math.floor(Math.random() * 35) + 5;
    const temperature = unit === 'fahrenheit' ? Math.round(tempCelsius * 9/5 + 32) : tempCelsius;

    return {
      location,
      temperature,
      unit,
      condition,
      humidity: Math.floor(Math.random() * 60) + 30,
      windSpeed: Math.floor(Math.random() * 30) + 5,
      feelsLike: temperature + Math.floor(Math.random() * 6) - 3,
    };
  },
});

/**
 * Stock Tool - Fetches stock price information
 */
export const stockTool = tool({
  description: 'Get the current stock price and information for a given stock symbol. Use this when users ask about stock prices.',
  parameters: z.object({
    symbol: z.string().describe('The stock ticker symbol (e.g., AAPL, GOOGL, TSLA)'),
  }),
  execute: async ({ symbol }) => {
    await new Promise((resolve) => setTimeout(resolve, 800));

    const basePrice = Math.random() * 500 + 50;
    const change = (Math.random() * 10 - 5).toFixed(2);
    const changePercent = ((parseFloat(change) / basePrice) * 100).toFixed(2);

    return {
      symbol: symbol.toUpperCase(),
      price: parseFloat(basePrice.toFixed(2)),
      change: parseFloat(change),
      changePercent: parseFloat(changePercent),
      high: parseFloat((basePrice * 1.02).toFixed(2)),
      low: parseFloat((basePrice * 0.98).toFixed(2)),
      volume: Math.floor(Math.random() * 10000000) + 1000000,
      marketCap: `${(Math.random() * 500 + 50).toFixed(1)}B`,
    };
  },
});

/**
 * Calculator Tool - Performs mathematical calculations
 */
export const calculatorTool = tool({
  description: 'Perform mathematical calculations. Use this when users need to calculate something.',
  parameters: z.object({
    expression: z.string().describe('The mathematical expression to evaluate'),
  }),
  execute: async ({ expression }) => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    try {
      let expr = expression.replace(/(\d+)%\s*of\s*(\d+)/gi, '($1/100)*$2');
      expr = expr.replace(/sqrt\((\d+)\)/gi, 'Math.sqrt($1)');
      expr = expr.replace(/pow\((\d+),\s*(\d+)\)/gi, 'Math.pow($1,$2)');

      const result = Function(`"use strict"; return (${expr})`)();

      return {
        expression,
        result: typeof result === 'number' ? parseFloat(result.toFixed(6)) : result,
        success: true,
      };
    } catch {
      return {
        expression,
        result: null,
        success: false,
        error: 'Unable to evaluate expression',
      };
    }
  },
});

/**
 * DateTime Tool - Provides current date and time information
 */
export const dateTimeTool = tool({
  description: 'Get the current date, time, or timezone information.',
  parameters: z.object({
    timezone: z.string().optional().default('UTC').describe('The timezone'),
    format: z.enum(['full', 'date', 'time']).optional().default('full'),
  }),
  execute: async ({ timezone, format }) => {
    await new Promise((resolve) => setTimeout(resolve, 200));

    const now = new Date();

    try {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: timezone,
        ...(format === 'full' || format === 'date' ? {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        } : {}),
        ...(format === 'full' || format === 'time' ? {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        } : {}),
      };

      const formatted = new Intl.DateTimeFormat('en-US', options).format(now);

      return {
        formatted,
        timezone,
        timestamp: now.toISOString(),
        dayOfWeek: now.toLocaleDateString('en-US', { weekday: 'long', timeZone: timezone }),
      };
    } catch {
      return {
        formatted: now.toISOString(),
        timezone: 'UTC',
        timestamp: now.toISOString(),
        error: 'Invalid timezone, using UTC',
      };
    }
  },
});

/**
 * Task Manager Tool - Creates and manages tasks
 */
export const taskTool = tool({
  description: 'Create a new task or reminder.',
  parameters: z.object({
    title: z.string().describe('The title of the task'),
    description: z.string().optional(),
    priority: z.enum(['low', 'medium', 'high']).optional().default('medium'),
    dueDate: z.string().optional(),
  }),
  execute: async ({ title, description, priority, dueDate }) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const taskId = `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    return {
      id: taskId,
      title,
      description: description || '',
      priority,
      dueDate: dueDate || null,
      createdAt: new Date().toISOString(),
      status: 'pending',
      success: true,
    };
  },
});

export const tools = {
  getWeather: weatherTool,
  getStockPrice: stockTool,
  calculate: calculatorTool,
  getDateTime: dateTimeTool,
  createTask: taskTool,
};

export type WeatherData = Awaited<ReturnType<typeof weatherTool.execute>>;
export type StockData = Awaited<ReturnType<typeof stockTool.execute>>;
export type CalculatorData = Awaited<ReturnType<typeof calculatorTool.execute>>;
export type DateTimeData = Awaited<ReturnType<typeof dateTimeTool.execute>>;
export type TaskData = Awaited<ReturnType<typeof taskTool.execute>>;
