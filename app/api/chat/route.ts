import { groq } from '@ai-sdk/groq';
import { streamText, type Message } from 'ai';
import { tools } from '@/ai/tools';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages }: { messages: Message[] } = await req.json();

    const result = streamText({
      model: groq('deepseek-r1-distill-llama-70b'),
      system: `You are a helpful, friendly AI assistant called "Memo" with access to several tools.

Your capabilities include:
- **Weather**: Get current weather for any location using the getWeather tool
- **Stocks**: Look up stock prices and information using the getStockPrice tool
- **Calculator**: Perform mathematical calculations using the calculate tool
- **Date/Time**: Get current date and time in any timezone using the getDateTime tool
- **Tasks**: Create tasks and reminders using the createTask tool

Guidelines:
1. Be conversational and friendly while remaining helpful
2. Use tools proactively when they would help answer the user's question
3. When using tools, explain what you're doing briefly
4. After receiving tool results, summarize the information naturally
5. If a tool fails, acknowledge it gracefully and offer alternatives
6. For general questions that don't require tools, respond directly
7. Keep responses concise but informative

Remember: You can call multiple tools if needed to fully answer a question. For example, if someone asks about weather in multiple cities, call the weather tool for each.`,
      messages,
      tools,
      maxSteps: 5, // Enable multi-step tool calling
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Chat API Error:', error);
    return new Response(
      JSON.stringify({ error: 'An error occurred while processing your request' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
