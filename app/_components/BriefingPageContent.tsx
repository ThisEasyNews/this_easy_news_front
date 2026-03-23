import Link from 'next/link';
import { Bookmark, Sparkles } from 'lucide-react';
import { BRIEFINGS } from '../_data/mock-data';

/**
 * 3분 브리핑 실제 화면 컴포넌트
 * - 홈(/)과 /briefing 에서 공용으로 사용
 */
export default function BriefingPageContent() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="w-4 h-4 text-[#3B82F6]" />
        <p className="text-xs font-bold text-[#3B82F6] uppercase tracking-wider">
          Today&apos;s Core Summary
        </p>
      </div>

      <div className="space-y-6">
        {BRIEFINGS.map((briefing) => (
          <article
            key={briefing.id}
            className="bg-[#1F2937] rounded-2xl overflow-hidden border border-gray-800 shadow-lg"
          >
            <div className="relative h-44">
              <img
                src={briefing.imageUrl}
                alt={briefing.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F2937] to-transparent" />
              {/* <button className="absolute top-3 right-3 p-2 bg-black/40 rounded-full text-white/70">
                <Bookmark className="w-4 h-4" />
              </button>  북마크 기능은 나중에 추가할 예정입니다. 일단 UI에서만 보여주도록 주석 처리했습니다.*/}
            </div>

            <div className="p-5 space-y-4">
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500 uppercase">
                <Sparkles className="w-3 h-3" /> AI Summary
              </div>
              <h2 className="text-lg font-bold leading-tight text-white">{briefing.title}</h2>

              <div className="space-y-3">


                <ul className="space-y-3">
                  {briefing.sourceArticles.map((item) => (
                    <li key={item.articleId}>
                      <Link
                        href={`/article-detail/${item.articleId}`}
                        className="flex gap-2 text-sm text-gray-300 hover:text-white transition-colors"
                      >
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-[#3B82F6] flex-shrink-0" />
                        <span>
                          <span className="font-bold text-[#3B82F6] mr-1">{item.source}</span>
                          {item.text}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {briefing.keywords.map((keyword) => (
                  <span key={keyword} className="text-[11px] text-gray-500">
                    #{keyword}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}