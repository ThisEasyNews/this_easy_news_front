import Link from 'next/link';
import SocialLoginButtons from './SocialLoginButtons';

export default function AuthPageContent() {
  return (
    <main className="min-h-screen bg-[#111827] px-4 py-8 text-white">
      <div className="mx-auto max-w-2xl">
        <section className="rounded-3xl border border-gray-800 bg-[#1F2937] p-6 shadow-sm md:p-8">
          {/* 타이틀 */}
          <div className="mb-8">
            <p className="text-sm font-semibold text-[#3B82F6]">This Easy News</p>

            <h1 className="mt-2 text-2xl font-bold leading-tight text-white md:text-3xl">
              로그인하고
              <br />
              맞춤형 뉴스 브리핑을 받아보세요
            </h1>

            <p className="mt-3 text-sm leading-6 text-gray-400">
              관심 카테고리와 언론사를 설정하면 더 나에게 맞는 브리핑과 추천 뉴스를
              볼 수 있어요.
            </p>
          </div>

          {/* 소셜 로그인 */}
          <div className="rounded-2xl bg-[#111827] p-4 ring-1 ring-gray-800">
            <h2 className="mb-4 text-sm font-semibold text-gray-300">
              간편 로그인
            </h2>

            <SocialLoginButtons />
          </div>

          {/* 구분선 */}
          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-700" />
            <span className="text-xs text-gray-500">또는</span>
            <div className="h-px flex-1 bg-gray-700" />
          </div>

          {/* ✅ 게스트 이용 */}
          <Link
            href="/"
            className="flex h-12 w-full items-center justify-center rounded-2xl border border-gray-700 bg-[#111827] text-sm font-semibold text-gray-300 transition hover:bg-[#1a2433] hover:text-white"
          >
            로그인 없이 계속하기
          </Link>

          {/* 하단 안내 */}
          <div className="mt-6 text-center text-xs text-gray-500">
            로그인하면 관심사 기반 추천 기능을 사용할 수 있어요
          </div>
        </section>
      </div>
    </main>
  );
}