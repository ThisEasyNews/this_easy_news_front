import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { fetchTodayBriefing } from '../_lib/api';

export default async function BriefingPageContent() {
  let briefings;
  try {
    briefings = await fetchTodayBriefing();
  } catch {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-[#3B82F6]" />
          <p className="text-xs font-bold text-[#3B82F6] uppercase tracking-wider">
            Today&apos;s Core Summary
          </p>
        </div>
        <div className="bg-[#1F2937] rounded-2xl border border-gray-800 p-6 text-center text-gray-400">
          브리핑 데이터를 불러오지 못했습니다.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="w-4 h-4 text-[#3B82F6]" />
        <p className="text-xs font-bold text-[#3B82F6] uppercase tracking-wider">
          Today&apos;s Core Summary
        </p>
      </div>

      <div className="space-y-6">
        {briefings.map((briefing) => (
          <article
            key={briefing.id}
            className="bg-[#1F2937] rounded-2xl overflow-hidden border border-gray-800 shadow-lg"
          >
            {briefing.imageUrl && (
              <div className="relative h-44">
                <img
                  src={briefing.imageUrl}
                  alt={briefing.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1F2937] to-transparent" />
              </div>
            )}

            <div className="p-5 space-y-4">
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500 uppercase">
                <Sparkles className="w-3 h-3" /> AI Summary
              </div>
              <h2 className="text-lg font-bold leading-tight text-white">{briefing.title}</h2>

              <ul className="space-y-3">
                {briefing.summaries.map((item) => (
                  <li key={item.id}>
                    {item.articleId ? (
                      <Link
                        href={`/article-detail/${item.articleId}`}
                        className="flex gap-2 text-sm text-gray-300 hover:text-white transition-colors"
                      >
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-[#3B82F6] flex-shrink-0" />
                        <span>{item.title}</span>
                      </Link>
                    ) : (
                      <span className="flex gap-2 text-sm text-gray-300">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-[#3B82F6] flex-shrink-0" />
                        <span>{item.title}</span>
                      </span>
                    )}
                  </li>
                ))}
              </ul>

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
