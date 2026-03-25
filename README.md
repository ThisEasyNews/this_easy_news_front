# This Easy News — Frontend

Next.js 16 App Router 기반 뉴스 요약 서비스 프론트엔드

---

## 기술 스택

| 항목 | 버전 |
|------|------|
| Next.js (App Router) | 16.2.1 |
| React | 18.3.1 |
| TypeScript | 5.8.2 |
| Tailwind CSS | 4.1.12 |
| Framer Motion (`motion`) | 12.23.24 |
| Lucide React | 0.487.0 |

---

## 실행

```bash
# 패키지 설치
npm install

# 개발 서버 (http://localhost:3000)
npm run dev

# 프로덕션 빌드
npm run build && npm start
```

백엔드 서버(`http://localhost:8080`)가 먼저 실행되어 있어야 합니다.

---

## 환경 변수

`.env.local` 파일에 아래 값을 설정합니다.

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

---

## 디렉토리 구조

```
this_easy_news_front/
│
├── app/                            # Next.js App Router 루트
│   ├── layout.tsx                  # 전역 레이아웃 (MainLayout 포함)
│   ├── page.tsx                    # 홈 → /briefing 리다이렉트
│   ├── globals.css                 # 전역 스타일
│   │
│   ├── _components/                # 앱 공용 컴포넌트
│   │   ├── MainLayout.tsx          # 헤더·하단 네비게이션 쉘
│   │   ├── BriefingPageContent.tsx # 3분 브리핑 카드 목록 (서버 컴포넌트)
│   │   └── ArticleCard.tsx         # 기사 카드 (언론사/카테고리 뱃지 선택 가능)
│   │
│   ├── _data/
│   │   └── mock-data.ts            # 개발용 더미 데이터 (현재 미사용)
│   │
│   ├── _lib/
│   │   └── api.ts                  # 백엔드 API 호출 함수 모음 + formatDate 유틸
│   │
│   ├── _types/
│   │   └── index.ts                # 프론트엔드·API 공통 TypeScript 타입 정의
│   │
│   ├── briefing/
│   │   └── page.tsx                # /briefing — 3분 브리핑 페이지
│   │
│   ├── keywords/
│   │   ├── page.tsx                # /keywords — HOT 키워드 페이지 (서버 컴포넌트)
│   │   └── _components/
│   │       └── KeywordsContent.tsx # 워드클라우드·순위 인터랙티브 UI (클라이언트 컴포넌트)
│   │
│   ├── categories/
│   │   ├── page.tsx                # /categories — 카테고리 목록
│   │   └── [id]/
│   │       └── page.tsx            # /categories/[id] — 카테고리별 기사 목록
│   │
│   ├── publishers/
│   │   ├── page.tsx                # /publishers — 언론사 목록
│   │   └── [id]/
│   │       └── page.tsx            # /publishers/[id] — 언론사별 기사 목록
│   │
│   ├── article-detail/
│   │   └── [id]/
│   │       └── page.tsx            # /article-detail/[id] — 기사 상세
│   │
│   └── mypage/
│       └── page.tsx                # /mypage — 마이페이지 (구독 언론사·카테고리)
│
├── components/                     # (미사용) 레거시 컴포넌트
│   ├── MainShell.tsx
│   └── figma/
│       └── ImageWithFallback.tsx
│
├── styles/
│   ├── fonts.css                   # Pretendard 웹폰트
│   ├── theme.css                   # 디자인 토큰 (oklch 컬러 변수, 다크모드)
│   └── (globals.css → app/globals.css)
│
├── .env.local                      # 환경 변수 (gitignore 대상)
├── next.config.mjs
├── postcss.config.mjs
├── tsconfig.json
└── package.json
```

---

## 화면별 설명

### 홈 `/`
`/briefing`으로 즉시 리다이렉트됩니다.

---

### 3분 브리핑 `/briefing`
**API**: `GET /api/summaries/briefings/today`

오늘의 AI 브리핑 카드 목록을 표시합니다.
- 브리핑별 대표 이미지, 제목, 연관 키워드(`#태그`) 표시
- 각 브리핑에 포함된 요약 기사 목록 → 클릭 시 기사 상세로 이동
- 서버 컴포넌트로 구현 (SEO·초기 로딩 최적화)

---

### HOT 키워드 `/keywords`
**API**: `GET /api/keywords/hot`

오늘의 상위 10개 인기 키워드를 표시합니다.
- **순위형 뷰**: 언급 횟수·기사 수 표시, 아코디언으로 연관 기사 펼치기
- **워드클라우드 뷰**: 언급 빈도에 따라 크기·색상이 다른 키워드 버튼, 선택 시 연관 기사 카드 표시
- 우상단 토글 버튼으로 뷰 전환
- 서버 컴포넌트(데이터 fetch) + 클라이언트 컴포넌트(인터랙션) 분리

---

### 카테고리 목록 `/categories`
**API**: `GET /api/codes/categories`

전체 카테고리를 2열 그리드로 표시합니다.
- 카테고리별 아이콘·색상 자동 매핑 (정치, 경제, 사회, 국제, 스포츠, 문화, 연예, IT·과학)
- 카드 클릭 시 해당 카테고리 상세로 이동

---

### 카테고리 상세 `/categories/[id]`
**API**: `GET /api/news/category/{categoryId}`

선택한 카테고리의 최신 기사 목록(페이지당 20건)을 표시합니다.
- `ArticleCard` 컴포넌트 사용 (언론사명 뱃지)
- 기사 카드 클릭 시 기사 상세로 이동

---

### 언론사 목록 `/publishers`
**API**: `GET /api/codes/media`

등록된 언론사를 3열 그리드로 표시합니다.
- 언론사별 브랜드 색상 아이콘 (DB 색상 우선, 없으면 이름 기반 fallback 색상 적용)
- 카드 클릭 시 해당 언론사 상세로 이동

---

### 언론사 상세 `/publishers/[id]`
**API**: `GET /api/news/media/{mediaId}`

선택한 언론사의 최신 기사 목록(페이지당 20건)을 표시합니다.
- `ArticleCard` 컴포넌트 사용 (**카테고리명 뱃지** — 같은 언론사 기사 목록이므로 카테고리 구분)
- 기사 카드 클릭 시 기사 상세로 이동

---

### 기사 상세 `/article-detail/[id]`
**API**: `GET /api/news/{id}`

기사 전체 내용을 표시합니다.
- 대표 이미지, 언론사·카테고리·발행일 뱃지
- AI 요약 섹션
- 전체 기사 본문 (`crawlerContent`)
- 원문 보기 외부 링크

---

### 마이페이지 `/mypage`
구독 중인 언론사·카테고리 목록과 프로필 정보를 표시합니다.
(현재 정적 UI — 백엔드 회원 API 연동 예정)

---

## API 연결 구조

모든 데이터 fetch는 `app/_lib/api.ts`에서 중앙 관리합니다.

```
백엔드 (localhost:8080)
    └── GET /api/summaries/briefings/today  → BriefingPageContent
    └── GET /api/keywords/hot               → keywords/page
    └── GET /api/codes/categories           → categories/page
    └── GET /api/codes/media                → publishers/page
    └── GET /api/news/category/{id}         → categories/[id]/page
    └── GET /api/news/media/{id}            → publishers/[id]/page
    └── GET /api/news/{id}                  → article-detail/[id]/page
```

서버 컴포넌트에서 직접 fetch → CORS 없음, SSR로 초기 로딩 최적화
