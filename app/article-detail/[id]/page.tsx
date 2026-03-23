import Link from 'next/link';
import { ChevronLeft, ExternalLink } from 'lucide-react';
import { getArticleById } from '../../_data/mock-data';

/**
 * 기사 상세 페이지
 * 요구사항:
 * - 전체 내용을 긁어온 우리 사이트 내부 페이지
 * - 모든 화면에서 이 페이지로 연결됨
 */
export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = getArticleById(Number(id));

  if (!article) {
    return (
      <div className="space-y-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#3B82F6]"
        >
          <ChevronLeft className="w-4 h-4" /> 홈으로
        </Link>

        <div className="bg-[#1F2937] rounded-2xl border border-gray-800 p-6">
          <h2 className="text-xl font-bold text-white">기사를 찾을 수 없습니다.</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#3B82F6] transition-colors"
      >
        <ChevronLeft className="w-4 h-4" /> 이전 화면으로
      </Link>

      <article className="bg-[#1F2937] rounded-2xl border border-gray-800 overflow-hidden">
        {article.imageUrl && (
          <div className="h-64 overflow-hidden">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="p-6 space-y-5">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="px-2 py-1 rounded bg-[#3B82F6]/10 text-[#3B82F6] font-bold">
                {article.mediaName}
              </span>
              <span className="px-2 py-1 rounded bg-gray-800 text-gray-300">
                {article.categoryName}
              </span>
              <span className="text-gray-500">{article.publishedAt}</span>
            </div>

            <h1 className="text-2xl font-bold leading-tight text-white">{article.title}</h1>
          </div>

          <section className="rounded-xl border border-gray-800 bg-[#111827]/40 p-4">
            <h2 className="text-sm font-bold text-[#3B82F6] mb-2">요약</h2>
            <p className="text-sm text-gray-300 leading-7">{article.summary}</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-bold text-[#3B82F6]">전체 기사 내용</h2>
            <div className="text-[15px] text-gray-200 leading-8 whitespace-pre-line">
              {article.content}
            </div>
          </section>

          <div className="pt-4 border-t border-gray-800">
            <a
              href={article.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#3B82F6] hover:underline"
            >
              원문 보기 <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </article>
    </div>
  );
}