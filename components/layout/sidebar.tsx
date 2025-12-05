'use client';

import { useState } from 'react';
import {
  PenSquare,
  Search,
  LayoutGrid,
  Clock,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Github,
  Twitter,
  Mail,
  Info,
  LogOut,
  Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/auth-context';
import { AuthModal } from '@/components/auth/auth-modal';

interface TaskHistoryItem {
  id: string;
  title: string;
  truncated: boolean;
}

const taskHistory: TaskHistoryItem[] = [
  { id: '1', title: 'Make a web page, upda...', truncated: true },
  { id: '2', title: 'Create a performance re...', truncated: true },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user, loading, logout } = useAuth();

  const getUserDisplayName = () => {
    if (!user) return 'Guest';
    if (user.isAnonymous) return 'Guest';
    return user.displayName || user.email?.split('@')[0] || 'User';
  };

  const getUserInitial = () => {
    const name = getUserDisplayName();
    return name.charAt(0).toUpperCase();
  };

  const getPlanType = () => {
    if (!user || user.isAnonymous) return 'Free';
    return 'Pro';
  };

  return (
    <>
      <aside
        className={cn(
          'flex flex-col h-screen bg-white border-r border-gray-100 transition-all duration-300',
          collapsed ? 'w-16' : 'w-64'
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                <div className="w-1 h-5 bg-gray-900 rounded-full" />
                <div className="w-1 h-7 bg-gray-900 rounded-full" />
                <div className="w-1 h-4 bg-gray-900 rounded-full" />
                <div className="w-1 h-6 bg-gray-900 rounded-full" />
              </div>
              <span className="font-bold text-lg tracking-tight">MEMO</span>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1">
          <NavItem icon={PenSquare} label="New Task" collapsed={collapsed} active />
          <NavItem icon={Search} label="Search" collapsed={collapsed} />
          <NavItem icon={LayoutGrid} label="Gallery" collapsed={collapsed} />

          {/* Task History */}
          {!collapsed && (
            <div className="pt-4">
              <div className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-gray-400 uppercase tracking-wider">
                <Clock size={14} />
                <span>Task History</span>
              </div>
              <div className="space-y-1 mt-1">
                {taskHistory.map((task) => (
                  <button
                    key={task.id}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors text-left"
                  >
                    <MessageSquare size={14} className="shrink-0" />
                    <span className="truncate">{task.title}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-gray-100 space-y-3">
          {!collapsed && (
            <>
              <button className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm text-gray-500 hover:bg-gray-50 rounded-lg transition-colors">
                <Info size={16} />
                <span>About Memo</span>
              </button>
              <div className="flex items-center justify-center gap-3">
                <SocialIcon icon={MessageSquare} />
                <SocialIcon icon={Github} />
                <SocialIcon icon={Twitter} />
                <SocialIcon icon={Mail} />
              </div>
            </>
          )}

          {/* User Profile */}
          {loading ? (
            <div className="flex items-center justify-center p-2">
              <Loader2 size={20} className="animate-spin text-gray-400" />
            </div>
          ) : user ? (
            <div className={cn(
              'flex items-center gap-3 p-2 rounded-lg transition-colors',
              collapsed && 'justify-center'
            )}>
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={getUserDisplayName()}
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center text-white text-sm font-medium">
                  {getUserInitial()}
                </div>
              )}
              {!collapsed && (
                <>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {getUserDisplayName()}
                    </p>
                    <p className="text-xs text-gray-400">{getPlanType()}</p>
                  </div>
                  <button
                    onClick={logout}
                    className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Sign out"
                  >
                    <LogOut size={16} />
                  </button>
                </>
              )}
            </div>
          ) : (
            <button
              onClick={() => setShowAuthModal(true)}
              className={cn(
                'w-full flex items-center gap-3 p-2 rounded-lg bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:opacity-90 transition-colors',
                collapsed && 'justify-center'
              )}
            >
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-medium">
                ?
              </div>
              {!collapsed && (
                <span className="text-sm font-medium">Sign In</span>
              )}
            </button>
          )}
        </div>
      </aside>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
}

function NavItem({
  icon: Icon,
  label,
  collapsed,
  active = false
}: {
  icon: React.ElementType;
  label: string;
  collapsed: boolean;
  active?: boolean;
}) {
  return (
    <button
      className={cn(
        'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors',
        active
          ? 'bg-gray-100 text-gray-900 font-medium'
          : 'text-gray-600 hover:bg-gray-50',
        collapsed && 'justify-center'
      )}
    >
      <Icon size={18} />
      {!collapsed && <span className="text-sm">{label}</span>}
    </button>
  );
}

function SocialIcon({ icon: Icon }: { icon: React.ElementType }) {
  return (
    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
      <Icon size={16} />
    </button>
  );
}
