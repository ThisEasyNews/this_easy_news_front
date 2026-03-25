import Link from 'next/link';
import { Globe, Plus } from 'lucide-react';
import { fetchPublishers } from '../_lib/api';

/**
 * 언론사 이름 또는 ID 기준 브랜드 색상 fallback
 * - DB에 색상이 없거나 빈 값일 때 사용
 */
const PUBLISHER_COLOR_FALLBACK: Record<string, string> = {
  // 이름 기반
  조선일보: '#C0392B',
  중앙일보: '#1A5276',
  동아일보: '#154360',
  한겨레: '#1E8449',
  경향신문: '#4A235A',
  한국일보: '#1F618D',
  매일경제: '#1A6B3C',
  한국경제: '#21618C',
  서울경제: '#117A65',
  머니투데이: '#6E2F8B',
  이데일리: '#B7950B',
  아시아경제: '#1ABC9C',
  SBS: '#D35400',
  KBS: '#2874A6',
  MBC: '#1F618D',
  JTBC: '#E74C3C',
  TV조선: '#922B21',
  채널A: '#1A5276',
  MBN: '#7D6608',
  YTN: '#2ECC71',
  연합뉴스: '#2E4057',
  뉴시스: '#1B4F72',
};

function resolveColor(name: string, id: string, dbColor: string): string {
  if (dbColor && dbColor !== '#000000' && dbColor !== '#ffffff') return dbColor;
  return (
    PUBLISHER_COLOR_FALLBACK[name] ??
    PUBLISHER_COLOR_FALLBACK[id] ??
    '#3B82F6' // 기본 파란색
  );
}

export default async function PublishersPage() {
  let publishers;
  try {
    publishers = await fetchPublishers();
  } catch {
    return (
      <div className="space-y-6">
        <div className="bg-[#1F2937] rounded-2xl border border-gray-800 p-6 text-center text-gray-400">
          언론사 데이터를 불러오지 못했습니다.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-[#3B82F6]" />
          <h2 className="text-xl font-bold">주요 언론사</h2>
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
        {publishers.map((publisher) => {
          const color = resolveColor(publisher.name, publisher.id, publisher.color);

          return (
            <Link key={publisher.id} href={`/publishers/${publisher.id}`} className="group block h-full">
              <div className="bg-[#1F2937] p-4 rounded-2xl border border-gray-800 shadow-sm flex flex-col items-center justify-center gap-3 transition-all hover:bg-gray-800 hover:border-[#3B82F6]/50">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-[10px] font-black uppercase shadow-inner"
                  style={{ backgroundColor: color }}
                >
                  {publisher.iconText}
                </div>

                <div className="text-center">
                  <p className="text-xs font-bold text-gray-200 group-hover:text-white transition-colors">
                    {publisher.name}
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
