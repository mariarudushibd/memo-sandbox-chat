import { Sidebar } from '@/components/layout/sidebar';
import { ChatHome } from '@/components/chat/chat-home';

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
