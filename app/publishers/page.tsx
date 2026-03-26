import Link from 'next/link';
import { Globe, Plus } from 'lucide-react';
import { fetchPublishers } from '../_lib/api';

/**
 * 언론사 이름 또는 ID 기준 브랜드 색상 fallback
 * - DB에 색상이 없거나 빈 값일 때 사용
 */
const PUBLISHER_COLOR_FALLBACK: Record<string, string> = {
  중앙일보: '#1A5276',
  동아일보: '#154360',
  한겨레: '#1E8449',
  한국일보: '#1F618D',
  서울경제: '#117A65',
  머니투데이: '#6E2F8B',
  이데일리: '#B7950B',
  아시아경제: '#1ABC9C',
  KBS: '#2874A6',
  MBC: '#1F618D',
  JTBC: '#E74C3C',
  채널A: '#1A5276',
  MBN: '#7D6608',
  YTN: '#2ECC71',
  연합뉴스: '#2E4057',
  뉴시스: '#1B4F72',
  조선일보: '#C0392B',
  경향신문: '#4A235A',
  TV조선: '#922B21',
  매일경제: '#1A6B3C',
  한국경제: '#21618C',
  SBS: '#D35400',
};

/**
 * 이미지 로고 fallback
 * - 주소가 있는 언론사는 이미지로 표시
 */
const PUBLISHER_IMAGE_FALLBACK: Record<string, string> = {
  // 아래 주소 주석걸면 원래대로 색상 아이콘으로 나옴(일단 하드코딩)
  SBS: 'https://file.alphasquare.co.kr/media/images/stock_logo/kr/034120.png',
  경향신문:
    'https://i.namu.wiki/i/80JSrOJps37B_BcaSAeJkWbsSBP-RyWyJ3Z8E_EH5Y0tUvXnDDRaG7uhSMN_-YCqjlH8FeeQPtWjH7s8eBxJfQ.svg',
  매일경제:
    'https://s3.ap-northeast-2.amazonaws.com/media.linkareer.com/activity_manager/logo/2018-03-151416355753390_%EB%A7%A4%EC%9D%BC%EA%B2%BD%EC%A0%9C%EC%9B%90%ED%98%95%EB%A1%9C%EA%B3%A0.png',
  조선일보:
    'https://i.namu.wiki/i/OwPADkkgg2sPRnru1TI7XACwFyPVWTG2UvHSyGmJ17D9moraMUUvihKO7SqxlNgaynvF-4uQAWP3sCogI0gr1w.svg',
  한국경제:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4osz_Wu856AhcDJJwfPs80cf9fkwQoIEG0A&s',
};

function resolveColor(name: string, id: string, dbColor?: string): string {
  if (dbColor && dbColor !== '#000000' && dbColor !== '#ffffff') return dbColor;
  return PUBLISHER_COLOR_FALLBACK[name] ?? PUBLISHER_COLOR_FALLBACK[id] ?? '#3B82F6';
}

function resolveImage(name: string, id: string): string | null {
  return PUBLISHER_IMAGE_FALLBACK[name] ?? PUBLISHER_IMAGE_FALLBACK[id] ?? null;
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
          const imageUrl = resolveImage(publisher.name, publisher.id);

          return (
            <Link
              key={publisher.id}
              href={`/publishers/${publisher.id}`}
              className="group block h-full"
            >
              <div className="bg-[#1F2937] p-4 rounded-2xl border border-gray-800 shadow-sm flex flex-col items-center justify-center gap-3 transition-all hover:bg-gray-800 hover:border-[#3B82F6]/50">
                <div className="w-12 h-12 rounded-xl overflow-hidden flex items-center justify-center bg-white shadow-inner">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={publisher.name}
                      className="w-full h-full object-contain p-1"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center text-white text-[10px] font-black uppercase"
                      style={{ backgroundColor: color }}
                    >
                      {publisher.iconText}
                    </div>
                  )}
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