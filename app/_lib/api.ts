import type {
  NewsResponse,
  BriefingResponse,
  KeywordResponse,
  PublisherResponse,
  CategoryResponse,
  PageResponse,
} from '../_types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

async function apiFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, { cache: 'no-store' });
  if (!res.ok) throw new Error(`API ${res.status}: ${path}`);
  const json: ApiResponse<T> = await res.json();
  return json.data;
}

export async function fetchTodayBriefing(): Promise<BriefingResponse[]> {
  return apiFetch<BriefingResponse[]>('/api/summaries/briefings/today');
}

export async function fetchHotKeywords(): Promise<KeywordResponse[]> {
  return apiFetch<KeywordResponse[]>('/api/keywords/hot');
}

export async function fetchPublishers(): Promise<PublisherResponse[]> {
  return apiFetch<PublisherResponse[]>('/api/codes/media');
}

export async function fetchCategories(): Promise<CategoryResponse[]> {
  return apiFetch<CategoryResponse[]>('/api/codes/categories');
}

export async function fetchArticlesByPublisher(
  mediaId: string,
  page = 0,
): Promise<PageResponse<NewsResponse>> {
  return apiFetch<PageResponse<NewsResponse>>(
    `/api/news/media/${mediaId}?page=${page}&size=20`,
  );
}

export async function fetchArticlesByCategory(
  categoryId: string,
  page = 0,
): Promise<PageResponse<NewsResponse>> {
  return apiFetch<PageResponse<NewsResponse>>(
    `/api/news/category/${categoryId}?page=${page}&size=20`,
  );
}

export async function fetchArticleById(id: number): Promise<NewsResponse> {
  return apiFetch<NewsResponse>(`/api/news/${id}`);
}

/** ISO datetime → "YYYY-MM-DD HH:mm" */
export function formatDate(iso: string): string {
  if (!iso) return '';
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
