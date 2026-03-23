# Easy News Prototype (Next.js 변환본)

## 선택한 기준
- Next.js 14 (App Router)
- TypeScript 유지
- Tailwind CSS 4 유지
- Lucide React 유지
- motion 유지
- react-router 제거
- MUI 제거
- 사용되지 않는 `components/ui/*` 전체 제거

## 실행
```bash
npm install
npm run dev
```

## 주요 변경점
- `App.tsx`, `main.tsx`, `routes.ts` 삭제
- `app/` 라우팅 구조로 변경
- `components/ui/` 전체 제거
- `react-router` → `next/link`, `usePathname`, 동적 route params 로 교체
