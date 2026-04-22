'use client';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

function startSocialLogin(provider: 'google' | 'naver' | 'kakao') {
  if (!BASE_URL) {
    alert('NEXT_PUBLIC_API_URL 값이 없습니다.');
    return;
  }

  window.location.href = `${BASE_URL}/oauth2/authorization/${provider}`;
}

export default function SocialLoginButtons() {
  return (
    <div className="mx-auto flex w-full max-w-[420px] flex-col gap-3">
      <button
        type="button"
        onClick={() => startSocialLogin('naver')}
        className="flex h-14 w-full items-center justify-center rounded-2xl bg-transparent transition hover:opacity-90"
      >
        <img
          src="/images/naverlogin.png"
          alt="naver login"
          className="max-h-12 w-auto"
        />
      </button>

      <button
        type="button"
        onClick={() => startSocialLogin('kakao')}
        className="flex h-14 w-full items-center justify-center rounded-2xl bg-transparent transition hover:opacity-90"
      >
        <img
          src="/images/kakaologin.png"
          alt="kakao login"
          className="max-h-12 w-auto"
        />
      </button>

      <button
        type="button"
        onClick={() => startSocialLogin('google')}
        className="flex h-14 w-full items-center justify-center rounded-2xl bg-transparent transition hover:opacity-90"
      >
        <img
          src="/images/googlelogin.png"
          alt="google login"
          className="max-h-12 w-auto"
        />
      </button>
    </div>
  );
}