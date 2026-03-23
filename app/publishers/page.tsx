import Link from 'next/link';
import { Globe, Plus } from 'lucide-react';
import { ARTICLES, PUBLISHERS } from '../_data/mock-data';

/**
 * 언론사 목록 페이지
 * - 언론사 클릭 -> /publishers/[id]
 */
export default function PublishersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-[#3B82F6]" />
          <h2 className="text-xl font-bold">주요 언론사</h2>
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
        {PUBLISHERS.map((publisher) => {
          const count = ARTICLES.filter((article) => article.mediaId === publisher.id).length;

          return (
            <Link key={publisher.id} href={`/publishers/${publisher.id}`} className="group block h-full">
              <div className="bg-[#1F2937] p-4 rounded-2xl border border-gray-800 shadow-sm flex flex-col items-center justify-center gap-3 transition-all hover:bg-gray-800 hover:border-[#3B82F6]/50">
                <div
                  className={`w-12 h-12 ${publisher.color} rounded-xl flex items-center justify-center text-white text-[10px] font-black uppercase shadow-inner`}
                >
                  {publisher.iconText}
                </div>

                <div className="text-center">
                  <p className="text-xs font-bold text-gray-200 group-hover:text-white transition-colors">
                    {publisher.name}
                  </p>
                  <p className="text-[10px] text-gray-500 font-medium group-hover:text-gray-400">
                    {count}개
                  </p>
                </div>
              </div>
            </Link>
          );
        })}

        <div className="group cursor-pointer">
          <div className="bg-gray-800/20 p-4 rounded-2xl border border-dashed border-gray-700 flex flex-col items-center justify-center gap-3 transition-all hover:bg-gray-800/40 hover:border-[#3B82F6]">
            <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center text-gray-500">
              <Plus className="w-5 h-5" />
            </div>
            <div className="text-center">
              <p className="text-xs font-bold text-gray-500">더 보기</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}