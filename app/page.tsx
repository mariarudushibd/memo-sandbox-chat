import dynamic from 'next/dynamic';

// Dynamically import components that use Firebase to prevent SSR issues
const Sidebar = dynamic(() => import('@/components/layout/sidebar').then(mod => ({ default: mod.Sidebar })), {
  ssr: false,
  loading: () => <div className="w-64 h-screen bg-white border-r border-gray-100" />
});

const ChatHome = dynamic(() => import('@/components/chat/chat-home').then(mod => ({ default: mod.ChatHome })), {
  ssr: false,
  loading: () => (
    <div className="flex-1 flex items-center justify-center">
      <div className="animate-pulse text-gray-400">Loading...</div>
    </div>
  )
});

export default function Home() {
  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      <main className="flex-1 overflow-hidden">
        <ChatHome />
      </main>
    </div>
  );
}
