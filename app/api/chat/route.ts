import { openai } from '@ai-sdk/openai';
import { streamText, convertToModelMessages, UIMessage } from 'ai';
import { tools } from '@/ai/tools';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();

    const result = streamText({
      model: openai('gpt-4o-mini'),
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

Remember: You can call multiple tools if needed to fully answer a question.`,
      messages: convertToModelMessages(messages),
      tools,
      maxSteps: 5,
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error('Chat API Error:', error);
    return new Response(
      JSON.stringify({ error: 'An error occurred while processing your request' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
