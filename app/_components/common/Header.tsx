'use client';

import Link from 'next/link';
import { useAuth } from '../../_providers/AuthProvider';

export default function Header() {
  const { isAuthenticated, user } = useAuth();

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold text-gray-900">
          This Easy News
        </Link>

        <nav className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <span className="text-sm text-gray-600">
                {user?.nickname || user?.name}님
              </span>
              <Link
                href="/mypage"
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700"
              >
                마이페이지
              </Link>
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white"
            >
              로그인
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}