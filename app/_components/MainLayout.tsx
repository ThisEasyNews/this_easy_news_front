'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'motion/react';
import { Zap } from 'lucide-react';

const TABS = [
  { id: 'briefing', label: '3분 브리핑', path: '/' },
  { id: 'keywords', label: 'HOT 키워드', path: '/keywords' },
  { id: 'publishers', label: '언론사', path: '/publishers' },
  { id: 'categories', label: '카테고리', path: '/categories' },
  { id: 'mypage', label: 'MY', path: '/mypage' },
];

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#111827] text-white font-sans selection:bg-[#3B82F6]/30">
      <header className="sticky top-0 z-50 bg-[#111827]/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-2xl mx-auto px-4 pt-6 pb-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="bg-[#3B82F6] p-1.5 rounded-lg">
                <Zap className="w-5 h-5 text-white fill-white" />
              </div>
              <h1 className="text-xl font-bold tracking-tight">This Easy News</h1>
            </div>

            <div className="text-xs text-gray-400 font-medium">
              {new Intl.DateTimeFormat('ko-KR', {
                month: 'long',
                day: 'numeric',
                weekday: 'short',
              }).format(new Date())}
            </div>
          </div>

          <nav className="flex items-center justify-between gap-1 overflow-x-auto no-scrollbar">
            {TABS.map((tab) => {
              const isActive = pathname === tab.path;

              return (
                <Link
                  key={tab.id}
                  href={tab.path}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap ${
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

      <footer className="max-w-2xl mx-auto px-4 py-8 text-center text-gray-500 text-[10px] uppercase tracking-widest border-t border-gray-800/50 mt-10">
        © 2026 This Easy News. AI Powered News Summary.
      </footer>
    </div>
  );
}