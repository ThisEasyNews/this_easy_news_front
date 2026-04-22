'use client';

import { Facebook, Check } from 'lucide-react';

export default function LoginPage() {
  const handleLocalLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: 일반 로그인 API 연결
    console.log('local login');
  };

  const handleSocialLogin = (provider: 'naver' | 'facebook' | 'google') => {
    // TODO: 소셜 로그인 API/OAuth 엔드포인트 연결
    // 예:
    // window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/oauth2/authorization/${provider}`;
    console.log(`${provider} login`);
  };

  return (
    <main className="min-h-screen bg-[#f5f5f5] px-4 py-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 md:flex-row md:items-stretch md:justify-center">
        <section className="flex-1 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <h1 className="mb-8 text-center text-3xl font-bold text-[#222]">로그인</h1>

          <form onSubmit={handleLocalLogin} className="mx-auto max-w-sm">
            <div className="space-y-3">
              <input
                type="text"
                placeholder="아이디"
                className="h-12 w-full rounded-lg border border-gray-200 bg-[#fafafa] px-4 text-sm outline-none transition focus:border-[#2f6fed] focus:bg-white"
              />
              <input
                type="password"
                placeholder="비밀번호"
                className="h-12 w-full rounded-lg border border-gray-200 bg-[#fafafa] px-4 text-sm outline-none transition focus:border-[#2f6fed] focus:bg-white"
              />
            </div>

            <label className="mt-4 flex cursor-pointer items-center gap-2 text-sm text-gray-500">
              <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
              <span>아이디 저장</span>
            </label>

            <button
              type="submit"
              className="mt-5 h-12 w-full rounded-lg bg-[#2f6fed] text-sm font-semibold text-white transition hover:bg-[#255dde]"
            >
              로그인
            </button>

            <p className="mt-8 text-center text-xs text-gray-400">SNS 계정으로 간편 로그인</p>

            <div className="mt-4 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => handleSocialLogin('naver')}
                aria-label="네이버 로그인"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-[#03c75a] text-white shadow-sm transition hover:scale-105"
              >
                <span className="text-xl font-extrabold">N</span>
              </button>

              <button
                type="button"
                onClick={() => handleSocialLogin('facebook')}
                aria-label="페이스북 로그인"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1877f2] text-white shadow-sm transition hover:scale-105"
              >
                <Facebook size={24} fill="currentColor" />
              </button>

              <button
                type="button"
                onClick={() => handleSocialLogin('google')}
                aria-label="구글 로그인"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition hover:scale-105"
              >
                <span className="text-lg font-bold">
                  <span className="text-[#4285F4]">G</span>
                </span>
              </button>
            </div>
          </form>
        </section>

        <section className="flex-1 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <h2 className="mb-4 text-center text-3xl font-bold text-[#222]">회원가입</h2>
          <p className="mx-auto mb-8 max-w-xs text-center text-sm leading-6 text-gray-400">
            기존에 사용하던 계정으로
            <br />
            간편하게 회원가입 하세요.
          </p>

          <div className="mx-auto max-w-sm space-y-3">
            <button
              type="button"
              onClick={() => handleSocialLogin('naver')}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#03c75a] text-sm font-semibold text-white transition hover:opacity-95"
            >
              <span className="text-base font-extrabold">N</span>
              네이버로 시작하기
            </button>

            <button
              type="button"
              onClick={() => handleSocialLogin('facebook')}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#1877f2] text-sm font-semibold text-white transition hover:opacity-95"
            >
              <Facebook size={18} fill="currentColor" />
              페이스북으로 시작하기
            </button>

            <button
              type="button"
              onClick={() => handleSocialLogin('google')}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              <span className="font-bold text-[#4285F4]">G</span>
              구글로 시작하기
            </button>
          </div>

          <div className="mt-10 rounded-xl bg-[#f8f9fb] p-4 text-sm text-gray-500">
            <div className="flex items-start gap-2">
              <Check size={16} className="mt-0.5 text-[#2f6fed]" />
              <p>최초 로그인 시 회원 정보와 관심사 설정 화면으로 이동</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}