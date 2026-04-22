'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'motion/react';
import { Zap } from 'lucide-react';
import AuthHeaderActions from './common/AuthHeaderActions';

const TABS = [
  { id: 'briefing', label: '3분 브리핑', path: '/' },
  { id: 'keywords', label: 'HOT 키워드', path: '/keywords' },
  { id: 'publishers', label: '언론사', path: '/publishers' },
  { id: 'categories', label: '카테고리', path: '/categories' },
];

const HIDE_LAYOUT_PATHS = ['/login', '/signup'];

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isAuthPage =
    pathname != null &&
    HIDE_LAYOUT_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`));

  if (isAuthPage) {
    return (
      <div className="min-h-screen bg-[#111827] text-white font-sans selection:bg-[#3B82F6]/30">
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111827] text-white font-sans selection:bg-[#3B82F6]/30">
      <header className="sticky top-0 z-50 border-b border-gray-800 bg-[#111827]/80 backdrop-blur-md">
        <div className="max-w-2xl mx-auto px-4 pt-6 pb-2">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2">
              <div className="rounded-lg bg-[#3B82F6] p-1.5">
                <Zap className="h-5 w-5 fill-white text-white" />
              </div>
              <h1 className="truncate text-xl font-bold tracking-tight">This Easy News</h1>
            </div>

            <div className="flex shrink-0 items-center gap-3">
              <div className="hidden text-xs font-medium text-gray-400 sm:block">
                {new Intl.DateTimeFormat('ko-KR', {
                  month: 'long',
                  day: 'numeric',
                  weekday: 'short',
                }).format(new Date())}
              </div>

              <AuthHeaderActions />
            </div>
          </div>

          <nav className="flex items-center justify-between gap-1 overflow-x-auto no-scrollbar">
            {TABS.map((tab) => {
              const isActive = pathname === tab.path;

              return (
                <Link
                  key={tab.id}
                  href={tab.path}
                  className={`relative whitespace-nowrap px-3 py-2 text-sm font-medium transition-colors ${
                    isActive ? 'text-[#3B82F6]' : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  {tab.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3B82F6]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">{children}</main>

      <footer className="max-w-2xl mx-auto mt-10 border-t border-gray-800/50 px-4 py-8 text-center text-[10px] uppercase tracking-widest text-gray-500">
        © 2026 This Easy News. AI Powered News Summary.
      </footer>
    </div>
  );
}