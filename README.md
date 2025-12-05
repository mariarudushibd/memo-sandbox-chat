# Memo Sandbox Chat

A full-stack **agentic AI chatbot** with **Generative UI** powered by the [Vercel AI SDK](https://ai-sdk.dev).

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![AI SDK](https://img.shields.io/badge/AI%20SDK-4.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4)

## Features

### Agentic Capabilities
The chatbot has access to multiple **tools** that enable it to perform real-world tasks:

| Tool | Description | Example |
|------|-------------|---------|
| **Weather** | Get current weather for any location | "What's the weather in Tokyo?" |
| **Stocks** | Look up stock prices and market data | "AAPL stock price" |
| **Calculator** | Perform mathematical calculations | "Calculate 15% of 850" |
| **Date/Time** | Get current time in any timezone | "What time is it in London?" |
| **Tasks** | Create tasks and reminders | "Create a task to review PR" |

### Generative UI
Each tool returns structured data that renders as **beautiful, interactive UI components** instead of plain text:

- **Weather Cards** - Gradient backgrounds with weather icons
- **Stock Cards** - Real-time price display with trends
- **Calculator Cards** - Expression and result display
- **DateTime Cards** - Timezone-aware time display
- **Task Cards** - Priority badges and status indicators

### Multi-Step Conversations
The AI can chain multiple tool calls together to answer complex questions, thanks to the `maxSteps` configuration.

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org) (App Router)
- **AI**: [Vercel AI SDK](https://ai-sdk.dev) with OpenAI
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **Icons**: [Lucide React](https://lucide.dev)
- **Validation**: [Zod](https://zod.dev)

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- OpenAI API Key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mariarudushibd/memo-sandbox-chat.git
   cd memo-sandbox-chat
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` and add your OpenAI API key:
   ```
   OPENAI_API_KEY=sk-your-api-key-here
   ```

4. **Run the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
memo-sandbox-chat/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts      # Chat API endpoint with streaming
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Main page
├── ai/
│   └── tools.ts              # Agentic tool definitions
├── components/
│   ├── chat/
│   │   ├── chat-interface.tsx  # Main chat component
│   │   ├── chat-message.tsx    # Message renderer
│   │   └── chat-input.tsx      # Input component
│   └── ui/
│       ├── weather-card.tsx    # Weather generative UI
│       ├── stock-card.tsx      # Stock generative UI
│       ├── calculator-card.tsx # Calculator generative UI
│       ├── datetime-card.tsx   # DateTime generative UI
│       ├── task-card.tsx       # Task generative UI
│       └── tool-loading.tsx    # Loading state component
├── lib/
│   └── utils.ts              # Utility functions
└── ...config files
```

## Key Concepts

### Tools (Agentic AI)

Tools are defined in `ai/tools.ts` using the AI SDK's `tool` function:

```typescript
import { tool } from 'ai';
import { z } from 'zod';

export const weatherTool = tool({
  description: 'Get weather for a location',
  parameters: z.object({
    location: z.string(),
  }),
  execute: async ({ location }) => {
    // Fetch weather data
    return { location, temperature: 72, condition: 'Sunny' };
  },
});
```

### Generative UI

Tool results are rendered as React components based on their type:

```tsx
if (part.type === 'tool-invocation' && part.state === 'result') {
  if (part.toolName === 'getWeather') {
    return <WeatherCard data={part.result} />;
  }
}
```

### Multi-Step Execution

Enable multi-step tool calling with `maxSteps`:

```typescript
const result = streamText({
  model: openai('gpt-4o-mini'),
  messages,
  tools,
  maxSteps: 5, // Allow up to 5 tool calls
});
```

## Customization

### Adding New Tools

1. Define the tool in `ai/tools.ts`
2. Create a UI component in `components/ui/`
3. Add rendering logic in `chat-message.tsx`

### Styling

The project uses Tailwind CSS with custom CSS variables for theming. Edit `app/globals.css` to customize colors.

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import to Vercel
3. Add `OPENAI_API_KEY` environment variable
4. Deploy!

## Learn More

- [AI SDK Documentation](https://ai-sdk.dev/docs)
- [Generative UI Guide](https://ai-sdk.dev/docs/ai-sdk-ui/generative-user-interfaces)
- [Tool Calling](https://ai-sdk.dev/docs/ai-sdk-core/tools-and-tool-calling)
- [Next.js Documentation](https://nextjs.org/docs)

## License

MIT
