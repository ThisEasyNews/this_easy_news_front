import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { fetchArticlesByCategory, fetchCategories, formatDate } from '../../_lib/api';
import ArticleCard from '../../_components/ArticleCard';
import type { Article } from '../../_types';

export default async function CategoryDetailPage({
  params,
}: Readonly<{
  params: Promise<{ id: string }>;
}>) {
  const { id } = await params;

  const [categoriesResult, articlesResult] = await Promise.allSettled([
    fetchCategories(),
    fetchArticlesByCategory(id),
  ]);

  const categories = categoriesResult.status === 'fulfilled' ? categoriesResult.value : [];
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

      {articles.length === 0 ? (
        <div className="bg-[#1F2937] rounded-2xl border border-gray-800 p-6 text-center text-gray-400">
          기사가 없습니다.
        </div>
      ) : (
        <div className="space-y-4">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
