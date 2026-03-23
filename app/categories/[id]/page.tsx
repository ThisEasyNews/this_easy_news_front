import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { CATEGORIES, getArticlesByCategoryId } from '../../_data/mock-data';
import ArticleCard from '../../_components/ArticleCard';

/**
 * 카테고리 상세 페이지
 * 요구사항:
 * 2. 카테고리 -> 기사 클릭 -> 아티클 디테일
 */
export default async function CategoryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const category = CATEGORIES.find((item) => item.id === id);
  const articles = getArticlesByCategoryId(id);

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

      <div className="space-y-4">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}