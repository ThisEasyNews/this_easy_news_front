import Link from 'next/link';
import BriefingPageContent from '../BriefingPageContent';

export default function VisitorHomeContent() {
  return (
    <div className="space-y-6">
      <section className="mx-auto max-w-6xl rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold text-[#2563eb]">This Easy News</p>
            <h2 className="text-2xl font-bold text-gray-900">
              지금 바로 주요 뉴스를 빠르게 확인해보세요
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              로그인하면 관심 카테고리와 언론사를 기반으로 맞춤형 뉴스를 볼 수 있어요.
            </p>
          </div>

          <div className="flex gap-2">
            <Link
              href="/login"
              className="rounded-2xl bg-[#2563eb] px-4 py-2 text-sm font-semibold text-white"
            >
              로그인
            </Link>
            <Link
              href="/signup"
              className="rounded-2xl border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700"
            >
              회원가입
            </Link>
          </div>
        </div>
      </section>

      <BriefingPageContent />
    </div>
  );
}