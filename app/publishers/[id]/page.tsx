import Link from 'next/link';
import { ChevronLeft, Filter } from 'lucide-react';
import { PUBLISHERS, getArticlesByPublisherId } from '../../_data/mock-data';
import ArticleCard from '../../_components/ArticleCard';

/**
 * 언론사 상세 페이지
 * 요구사항:
 * 1. 언론사 -> 기사 클릭 -> 아티클 디테일
 */
export default async function PublisherDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const publisher = PUBLISHERS.find((item) => item.id === id);
  const articles = getArticlesByPublisherId(id);

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

      <div className="space-y-4">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}