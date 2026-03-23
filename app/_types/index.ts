/**
 * 언론사 타입
 */
export type Publisher = {
  id: string;
  name: string;
  iconText: string;
  color: string;
};

/**
 * 카테고리 타입
 */
export type Category = {
  id: string;
  name: string;
  countText?: string;
};

/**
 * 기사 타입
 * - article-detail 페이지에서 이 데이터를 기준으로 전체 내용을 보여줌
 */
export type Article = {
  id: number;
  title: string;
  content: string;
  summary: string;
  mediaId: string;
  mediaName: string;
  categoryId: string;
  categoryName: string;
  publishedAt: string;
  url: string;
  imageUrl?: string;
};

/**
 * 브리핑 카드 안의 "언론사별 기사 링크" 타입
 * - 브리핑 카드 클릭 후 각 기사 타이틀을 눌렀을 때 article-detail로 이동
 */
export type BriefingSourceArticle = {
  articleId: number;
  source: string;
  text: string;
};

/**
 * 브리핑 카드 타입
 */
export type BriefingItem = {
  id: number;
  title: string;
  keywords: string[];
  imageUrl: string;
  sourceArticles: BriefingSourceArticle[];
};

/**
 * 키워드 페이지에서 쓰는 관련 기사 타입
 */
export type RelatedArticle = {
  id: number;
  originalTitle: string;
  mediaName: string;
  categoryName: string;
  publishedAt: string;
  url: string;
};

/**
 * 키워드 API 응답 타입
 */
export type KeywordItem = {
  id: string;
  keyword: string;
  mentionCount: number;
  relatedArticleCount: number;
  relatedArticles: RelatedArticle[];
};