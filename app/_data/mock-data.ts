import type {
  Article,
  BriefingItem,
  Category,
  KeywordItem,
  Publisher,
} from '../_types';

/**
 * =========================
 * 1. 언론사
 * =========================
 */
export const PUBLISHERS: Publisher[] = [
  { id: 'chosun', name: '조선일보', iconText: '조선', color: 'bg-red-500' },
  { id: 'mk', name: '매일경제', iconText: '매경', color: 'bg-emerald-600' },
  { id: 'hankyung', name: '한국경제', iconText: '한경', color: 'bg-blue-800' },
  { id: 'khan', name: '경향신문', iconText: '경향', color: 'bg-indigo-600' },
  { id: 'sbs', name: 'SBS', iconText: 'SBS', color: 'bg-orange-500' },
];

/**
 * =========================
 * 2. 카테고리
 * =========================
 */
export const CATEGORIES: Category[] = [
  { id: 'politics', name: '정치' },
  { id: 'economy', name: '경제' },
  { id: 'society', name: '사회' },
  { id: 'international', name: '국제' },
  { id: 'sports', name: '스포츠' },
  { id: 'culture', name: '문화' },
  { id: 'entertainment', name: '연예' },
  { id: 'tech', name: 'IT·과학' },
];

/**
 * =========================
 * 3. 기사 (핵심 데이터)
 * =========================
 * 👉 모든 페이지는 결국 이걸 참조함
 */
export const ARTICLES: Article[] = [
  {
    id: 1,
    title: '반도체 업황 회복 기대감… 수출 반등 신호',
    summary: '반도체 시장이 회복세를 보이며 수출 증가 기대감이 커지고 있다.',
    content:
      '반도체 시장이 회복세를 보이면서 글로벌 수요가 증가하고 있다. 특히 AI 서버 수요 증가가 주요 요인으로 분석된다. 업계는 하반기 실적 개선을 기대하고 있다.',
    mediaId: 'hankyung',
    mediaName: '한국경제',
    categoryId: 'economy',
    categoryName: '경제',
    publishedAt: '2026-03-23 09:00',
    url: 'https://example.com/1',
  },
  {
    id: 2,
    title: 'AI 반도체 경쟁 본격화… 국내 기업 투자 확대',
    summary: 'AI 반도체 시장 선점을 위한 경쟁이 치열해지고 있다.',
    content:
      'AI 반도체 시장이 빠르게 성장하면서 국내 기업들의 투자도 증가하고 있다. 글로벌 기업과의 경쟁도 더욱 치열해지고 있다.',
    mediaId: 'mk',
    mediaName: '매일경제',
    categoryId: 'tech',
    categoryName: 'IT·과학',
    publishedAt: '2026-03-23 10:30',
    url: 'https://example.com/2',
  },
  {
    id: 3,
    title: '연준 금리 인하 가능성… 시장 기대감 상승',
    summary: '금리 인하 기대감이 금융시장에 긍정적인 영향을 주고 있다.',
    content:
      '연준의 금리 정책 변화 가능성이 커지면서 금융시장 기대감이 상승하고 있다. 투자자들은 향후 정책 방향에 주목하고 있다.',
    mediaId: 'sbs',
    mediaName: 'SBS',
    categoryId: 'economy',
    categoryName: '경제',
    publishedAt: '2026-03-23 08:40',
    url: 'https://example.com/3',
  },
  {
    id: 4,
    title: '국제 유가 상승… 에너지 시장 불안 확대',
    summary: '국제 유가 상승으로 에너지 시장 불안이 커지고 있다.',
    content:
      '중동 지역 긴장으로 인해 국제 유가가 상승하고 있다. 이에 따라 글로벌 경제에 미치는 영향이 주목된다.',
    mediaId: 'khan',
    mediaName: '경향신문',
    categoryId: 'international',
    categoryName: '국제',
    publishedAt: '2026-03-23 11:20',
    url: 'https://example.com/4',
  },
  {
    id: 5,
    title: '프로야구 개막… 팬 기대감 고조',
    summary: '프로야구 시즌이 시작되며 팬들의 관심이 집중되고 있다.',
    content:
      '프로야구 개막과 함께 팬들의 관심이 높아지고 있다. 각 구단의 전력 분석도 활발히 진행 중이다.',
    mediaId: 'chosun',
    mediaName: '조선일보',
    categoryId: 'sports',
    categoryName: '스포츠',
    publishedAt: '2026-03-23 07:50',
    url: 'https://example.com/5',
  },
];

/**
 * =========================
 * 4. 브리핑
 * =========================
 */
export const BRIEFINGS: BriefingItem[] = [
  {
    id: 1,
    title: '반도체 시장 회복 및 AI 투자 확대',
    keywords: ['반도체', 'AI', '투자'],
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
    sourceArticles: [
      { articleId: 1, source: '한국경제', text: '반도체 업황 회복 기대감…' },
      { articleId: 2, source: '매일경제', text: 'AI 반도체 경쟁 본격화…' },
    ],
  },
  {
    id: 2,
    title: '금리 정책 변화와 시장 영향',
    keywords: ['금리', '연준', '경제'],
    imageUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44',
    sourceArticles: [
      { articleId: 3, source: 'SBS', text: '연준 금리 인하 가능성…' },
    ],
  },
];

/**
 * =========================
 * 5. 키워드
 * =========================
 */
export const KEYWORDS: KeywordItem[] = [
  {
    id: 'KW1',
    keyword: '반도체',
    mentionCount: 120,
    relatedArticleCount: 2,
    relatedArticles: [
      {
        id: 1,
        originalTitle: '반도체 업황 회복 기대감… 수출 반등 신호',
        mediaName: '한국경제',
        categoryName: '경제',
        publishedAt: '2026-03-23 09:00',
        url: '',
      },
      {
        id: 2,
        originalTitle: 'AI 반도체 경쟁 본격화… 국내 기업 투자 확대',
        mediaName: '매일경제',
        categoryName: 'IT·과학',
        publishedAt: '2026-03-23 10:30',
        url: '',
      },
    ],
  },
  {
    id: 'KW2',
    keyword: '금리',
    mentionCount: 90,
    relatedArticleCount: 1,
    relatedArticles: [
      {
        id: 3,
        originalTitle: '연준 금리 인하 가능성… 시장 기대감 상승',
        mediaName: 'SBS',
        categoryName: '경제',
        publishedAt: '2026-03-23 08:40',
        url: '',
      },
    ],
  },
];

/**
 * =========================
 * 6. 공통 함수
 * =========================
 */

export function getArticleById(id: number) {
  return ARTICLES.find((a) => a.id === id);
}

export function getArticlesByPublisherId(id: string) {
  return ARTICLES.filter((a) => a.mediaId === id);
}

export function getArticlesByCategoryId(id: string) {
  return ARTICLES.filter((a) => a.categoryId === id);
}