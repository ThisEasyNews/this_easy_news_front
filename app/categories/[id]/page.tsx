import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import FilterChipBar from '../../_components/common/FilterChipBar';
import {
  fetchArticlesByCategory,
  fetchCategories,
  fetchPublishers,
  formatDate,
} from '../../_lib/api';
import type { Article } from '../../_types';

export default async function CategoryDetailPage({
  params,
  searchParams,
}: Readonly<{
  params: Promise<{ id: string }>;
  searchParams: Promise<{ media?: string }>;
}>) {
  const { id } = await params;
  const { media: mediaId } = await searchParams;

  const [categoriesResult, publishersResult, articlesResult] = await Promise.allSettled([
    fetchCategories(),
    fetchPublishers(),
    fetchArticlesByCategory(id, mediaId),
  ]);

  const categories = categoriesResult.status === 'fulfilled' ? categoriesResult.value : [];
  const publishers = publishersResult.status === 'fulfilled' ? publishersResult.value : [];
  const articles: Article[] =
    articlesResult.status === 'fulfilled'
      ? articlesResult.value.content.map((a) => ({
          id: a.id,
          title: a.title,
          summary: a.summary,
          content: a.crawlerContent ?? a.content,
          mediaId: a.mediaId,
          mediaName: a.mediaName,
          categoryId: a.categoryId,
          categoryName: a.categoryName,
          publishedAt: formatDate(a.publishedAt),
          url: a.url,
          imageUrl: a.imageUrl,
        }))
      : [];

  const category = categories.find((c) => c.id === id);

  return (
    <div className="space-y-6">
      <Link
        href="/categories"
        className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#3B82F6] transition-colors"
      >
        <ChevronLeft className="w-4 h-4" /> 카테고리 목록으로
      </Link>

      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold text-white">{category?.name ?? id} 기사 목록</h2>
        <p className="text-sm text-gray-400">
          {category?.name ?? id} 분야의 최신 뉴스를 확인하세요.
        </p>
      </div>

      <FilterChipBar
        label="Media company"
        basePath={`/categories/${id}`}
        paramName="media"
        activeId={mediaId}
        items={publishers.map((publisher) => ({ id: publisher.id, name: publisher.name }))}
      />

      {articles.length === 0 ? (
        <div className="bg-[#1F2937] rounded-2xl border border-gray-800 p-6 text-center text-gray-400">
          기사가 없습니다.
        </div>
      ) : (
        <div className="space-y-4">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/article-detail/${article.id}`}
              className="block overflow-hidden rounded-2xl border border-gray-800 bg-[#1F2937] transition hover:-translate-y-0.5 hover:border-[#3B82F6] hover:bg-[#243041]"
            >
              {article.imageUrl && (
                <div className="h-52 overflow-hidden">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}

              <div className="p-5 space-y-3">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  {article.mediaName && (
                    <span className="px-2 py-1 rounded bg-[#3B82F6]/10 text-[#3B82F6] font-bold">
                      {article.mediaName}
                    </span>
                  )}
                  {article.categoryName && (
                    <span className="px-2 py-1 rounded bg-gray-800 text-gray-300">
                      {article.categoryName}
                    </span>
                  )}
                  {article.publishedAt && (
                    <span className="text-gray-500">{article.publishedAt}</span>
                  )}
                </div>

                <h3 className="text-lg font-bold leading-snug text-white">
                  {article.title}
                </h3>

                {article.summary && (
                  <p className="text-sm leading-7 text-gray-300 line-clamp-3">
                    {article.summary}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}