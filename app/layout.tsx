import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Memo Sandbox Chat - Agentic AI Chatbot',
  description: 'A full-stack agentic chatbot with generative UI powered by AI SDK',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <main className="min-h-screen bg-gradient-to-b from-background to-muted/20">
          {children}
        </main>
      </body>
    </html>
  );
}
