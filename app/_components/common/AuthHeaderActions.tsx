'use client';

import Link from 'next/link';
import { useAuth } from '../../_providers/AuthProvider';

export default function AuthHeaderActions() {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return (
      <Link
        href="/login"
        className="inline-flex items-center rounded-lg bg-[#3B82F6] px-3 py-2 text-sm font-semibold text-white transition hover:bg-[#2563eb]"
      >
        로그인
      </Link>
    );
  }

  return (
    <Link
      href="/mypage"
      className="inline-flex items-center rounded-lg border border-gray-700 bg-[#1F2937] px-3 py-2 text-sm font-semibold text-white transition hover:bg-[#273244]"
    >
      {user?.nickname || user?.name || '마이페이지'}
    </Link>
  );
}