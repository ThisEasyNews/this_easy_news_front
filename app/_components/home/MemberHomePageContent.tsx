'use client';

import Link from 'next/link';
import BriefingPageContent from '../BriefingPageContent';
import { useAuth } from '../../_providers/AuthProvider';

export default function MemberHomePageContent() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <section className="mx-auto max-w-6xl rounded-2xl border border-gray-200 bg-white p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-gray-500">환영합니다</p>
            <h2 className="text-2xl font-bold text-gray-900">
              {user?.nickname || user?.name}님 맞춤 뉴스
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              관심 카테고리와 언론사를 기반으로 추천을 준비할 수 있어요.
            </p>
          </div>

          <div className="flex gap-2">
            <Link
              href="/mypage"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white"
            >
              마이페이지
            </Link>
            <Link
              href="/mypage/interests"
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700"
            >
              관심사 설정
            </Link>
          </div>
        </div>
      </section>

      <BriefingPageContent />
    </div>
  );
}