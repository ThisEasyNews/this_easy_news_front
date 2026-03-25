import Link from 'next/link';
import { ChevronLeft, Filter } from 'lucide-react';
import { fetchArticlesByPublisher, fetchPublishers, formatDate } from '../../_lib/api';
import ArticleCard from '../../_components/ArticleCard';
import type { Article } from '../../_types';

export default async function PublisherDetailPage({
  params,
}: Readonly<{
  params: Promise<{ id: string }>;
}>) {
  const { id } = await params;

  const [publishersResult, articlesResult] = await Promise.allSettled([
    fetchPublishers(),
    fetchArticlesByPublisher(id),
  ]);

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

  const publisher = publishers.find((p) => p.id === id);

  return (
    <div className="space-y-6">
      <Link
        href="/publishers"
        className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#3B82F6] transition-colors"
      >
        <ChevronLeft className="w-4 h-4" /> 언론사 목록으로
      </Link>

      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold text-white">
          {publisher?.name ?? id} 뉴스 리스트
        </h2>
        <div className="flex items-center gap-2 text-xs text-[#3B82F6] font-bold uppercase tracking-wider">
          <Filter className="w-3 h-3" /> All Categories
        </div>
      </div>

      {articles.length === 0 ? (
        <div className="bg-[#1F2937] rounded-2xl border border-gray-800 p-6 text-center text-gray-400">
          기사가 없습니다.
        </div>
      ) : (
        <div className="space-y-4">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} badge="category" />
          ))}
        </div>
      )}
    </div>
  );
}
