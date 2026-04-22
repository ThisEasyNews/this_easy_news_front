// 'use client';

import Link from 'next/link';
import BriefingPageContent from '../BriefingPageContent';
import { useAuth } from '../../_providers/AuthProvider';

export default function MemberHomeContent() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <section className="mx-auto max-w-6xl rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold text-[#2563eb]">맞춤형 뉴스</p>
            <h2 className="text-2xl font-bold text-gray-900">
              {user?.nickname || user?.name}님을 위한 브리핑
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              관심 카테고리와 언론사를 기반으로 개인화 기능을 확장할 수 있어요.
            </p>
          </div>

          <div className="flex gap-2">
            <Link
              href="/mypage"
              className="rounded-2xl bg-[#2563eb] px-4 py-2 text-sm font-semibold text-white"
            >
              마이페이지
            </Link>
            <Link
              href="/mypage/interests"
              className="rounded-2xl border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700"
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