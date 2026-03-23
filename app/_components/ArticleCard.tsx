import Link from 'next/link';
import { ExternalLink, Sparkles } from 'lucide-react';
import type { Article } from '../_types';

/**
 * 여러 페이지에서 공통으로 쓰는 기사 카드 컴포넌트
 * - 언론사 상세
 * - 카테고리 상세
 * 등에서 재사용
 */
export default function ArticleCard({ article }: { article: Article }) {
  return (
    <div className="p-5 bg-[#1F2937] rounded-xl border border-gray-800 hover:border-[#3B82F6]/50 transition-colors group">
      <div className="flex justify-between items-start gap-4 mb-3">
        <Link
          href={`/article-detail/${article.id}`}
          className="font-bold text-gray-200 group-hover:text-white transition-colors flex-1 leading-snug"
        >
          {article.title}
        </Link>

        <div className="text-[10px] text-[#3B82F6] font-bold px-2 py-1 bg-[#3B82F6]/10 rounded uppercase">
          {article.mediaName}
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500 uppercase">
          <Sparkles className="w-3 h-3" /> Quick Summary
        </div>
        <p className="text-sm text-gray-400 leading-relaxed">{article.summary}</p>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-gray-800">
        <span className="text-xs text-gray-500">{article.publishedAt}</span>

        <Link
          href={`/article-detail/${article.id}`}
          className="flex items-center gap-1 text-[11px] font-bold text-[#3B82F6] hover:underline"
        >
          상세 보기 <ExternalLink className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}