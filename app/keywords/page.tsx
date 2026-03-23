'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ChevronDown,
  Cloud,
  ListOrdered,
  Newspaper,
  TrendingUp,
} from 'lucide-react';
import { KEYWORDS } from '../_data/mock-data';
import type { KeywordItem } from '../_types';

type ViewMode = 'cloud' | 'rank';

type KeywordViewItem = KeywordItem & {
  rank: number;
  text: string;
  size: string;
  weight: string;
  color: string;
  bg: string;
};

/**
 * 워드클라우드에서 순위별 시각 강조용 스타일
 */
function getKeywordStyle(rank: number) {
  if (rank === 1) {
    return {
      size: 'text-2xl',
      weight: 'font-black',
      color: 'text-[#3B82F6]',
      bg: 'bg-[#3B82F6]/10',
    };
  }

  if (rank <= 3) {
    return {
      size: 'text-xl',
      weight: 'font-bold',
      color: 'text-blue-400',
      bg: 'bg-blue-400/10',
    };
  }

  if (rank <= 5) {
    return {
      size: 'text-lg',
      weight: 'font-bold',
      color: 'text-blue-300',
      bg: 'bg-blue-300/10',
    };
  }

  return {
    size: 'text-base',
    weight: 'font-semibold',
    color: 'text-gray-300',
    bg: 'bg-gray-800',
  };
}

export default function KeywordsPage() {
  /**
   * 기본은 순위형 목록
   */
  const [viewMode, setViewMode] = useState<ViewMode>('rank');

  /**
   * 현재 열려 있는 키워드 id
   * - rank: 각 목록형 아코디언
   * - cloud: 아래 카드 1개 표시
   */
  const [openedKeywordId, setOpenedKeywordId] = useState<string | null>(null);

  /**
   * 키워드별 "더보기" 상태
   * false면 2개만, true면 전체 기사 노출
   */
  const [expandedKeywordMap, setExpandedKeywordMap] = useState<Record<string, boolean>>({});

  /**
   * 목데이터를 언급 횟수 기준으로 정렬하고
   * 화면용 속성을 붙인다.
   */
  const keywordViewItems = useMemo<KeywordViewItem[]>(() => {
    return [...KEYWORDS]
      .sort((a, b) => b.mentionCount - a.mentionCount)
      .map((item, index) => {
        const rank = index + 1;
        const style = getKeywordStyle(rank);

        return {
          ...item,
          rank,
          text: item.keyword,
          ...style,
        };
      });
  }, []);

  const handleKeywordClick = (keywordId: string) => {
    setOpenedKeywordId((prev) => (prev === keywordId ? null : keywordId));
  };

  const handleExpandArticles = (keywordId: string) => {
    setExpandedKeywordMap((prev) => ({
      ...prev,
      [keywordId]: true,
    }));
  };

  const selectedKeyword =
    keywordViewItems.find((keyword) => keyword.id === openedKeywordId) ?? null;

  return (
    <div className="space-y-6">
      {/* 상단 헤더 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-[#3B82F6]" />
          <h2 className="text-xl font-bold">HOT 키워드</h2>
        </div>

        <div className="flex bg-[#1F2937] p-1 rounded-lg border border-gray-800">
          <button
            onClick={() => setViewMode('cloud')}
            className={`p-2 rounded-md transition-all ${viewMode === 'cloud'
              ? 'bg-[#3B82F6] text-white'
              : 'text-gray-500 hover:text-gray-300'
              }`}
          >
            <Cloud className="w-4 h-4" />
          </button>

          <button
            onClick={() => setViewMode('rank')}
            className={`p-2 rounded-md transition-all ${viewMode === 'rank'
              ? 'bg-[#3B82F6] text-white'
              : 'text-gray-500 hover:text-gray-300'
              }`}
          >
            <ListOrdered className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* =========================
          1) 순위제: 목록형
         ========================= */}
      {viewMode === 'rank' && (
        <div className="space-y-3">
          {keywordViewItems.map((keyword, index) => {
            const isOpened = openedKeywordId === keyword.id;
            const visibleArticles = expandedKeywordMap[keyword.id]
              ? keyword.relatedArticles
              : keyword.relatedArticles.slice(0, 2);

            return (
              <div
                key={keyword.id}
                className="bg-[#1F2937] rounded-2xl border border-gray-800 overflow-hidden shadow-xl"
              >
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleKeywordClick(keyword.id)}
                  className={`w-full text-left flex items-center justify-between p-4 transition ${isOpened ? 'bg-[#3B82F6]/10' : 'bg-[#1F2937]'
                    }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xl font-black text-[#3B82F6] w-6">
                      {keyword.rank}
                    </span>

                    <div className="flex flex-col">
                      <span className="font-bold text-gray-200">{keyword.keyword}</span>
                      <span className="text-xs text-gray-400">
                        언급 {keyword.mentionCount}회 · 기사 {keyword.relatedArticleCount}건
                      </span>
                    </div>
                  </div>

                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 transition-transform ${isOpened ? 'rotate-180' : ''
                      }`}
                  />
                </motion.button>

                <AnimatePresence initial={false}>
                  {isOpened && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.22 }}
                      className="border-t border-gray-800"
                    >
                      <div className="p-4 space-y-3">
                        {visibleArticles.map((article) => (
                          <div
                            key={article.id}
                            className="rounded-xl border border-gray-700/60 bg-gray-800/20 p-4"
                          >
                            <div className="flex items-start gap-3">
                              <Newspaper className="w-4 h-4 text-[#3B82F6] mt-1 shrink-0" />

                              <div className="min-w-0">
                                <Link
                                  href={`/article-detail/${article.id}`}
                                  className="font-semibold text-gray-100 hover:text-[#60A5FA] transition"
                                >
                                  {article.originalTitle}
                                </Link>

                                <div className="mt-2 flex flex-wrap gap-2 text-xs text-gray-400">
                                  <span>{article.mediaName}</span>
                                  <span>·</span>
                                  <span>{article.categoryName}</span>
                                  <span>·</span>
                                  <span>{article.publishedAt}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}

                        {!expandedKeywordMap[keyword.id] &&
                          keyword.relatedArticles.length > 2 && (
                            <button
                              onClick={() => handleExpandArticles(keyword.id)}
                              className="w-full py-3 rounded-xl border border-gray-700 text-sm font-medium text-gray-300 hover:bg-gray-800/50 transition"
                            >
                              더보기
                            </button>
                          )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      )}

      {/* =========================
          2) 워드클라우드
          - 키워드가 살짝 떠오르며 등장
          - hover 시 우웅 커짐
          - 선택 상태는 테두리 없이
          - 아래 카드만 따로 보여줌
         ========================= */}
      {viewMode === 'cloud' && (
        <div className="space-y-4">
          <div className="bg-[#1F2937] rounded-2xl border border-gray-800 p-6 shadow-xl">
            <div className="flex flex-wrap gap-4 items-center justify-center min-h-[180px]">
              {keywordViewItems.map((keyword) => {
                const isOpened = openedKeywordId === keyword.id;

                return (
                  <motion.button
                    key={keyword.id}
                    onClick={() => handleKeywordClick(keyword.id)}
                    animate={
                      isOpened
                        ? {
                          scale: 1.08,
                          y: -2,
                          opacity: 1,
                        }
                        : {
                          scale: 1,
                          y: 0,
                          opacity: 0.92,
                        }
                    }
                    whileHover={{
                      scale: isOpened ? 1.1 : 1.04,
                      y: -1,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 260,
                      damping: 18,
                    }}
                    className={`
                px-4 py-2 rounded-full
                transition-shadow duration-200
                ${keyword.bg} ${keyword.color} ${keyword.size} ${keyword.weight}
                ${isOpened ? 'shadow-[0_0_10px_rgba(59,130,246,0.22)]' : 'shadow-none'}
              `}
                  >
                    {keyword.keyword}
                  </motion.button>
                );
              })}
            </div>
          </div>

          <AnimatePresence initial={false}>
            {openedKeywordId && (
              <motion.div
                key={openedKeywordId}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="bg-[#1F2937] rounded-2xl border border-gray-800 shadow-xl overflow-hidden min-h-[320px]"
              >
                {keywordViewItems
                  .filter((keyword) => keyword.id === openedKeywordId)
                  .map((keyword) => {
                    const visibleArticles = expandedKeywordMap[keyword.id]
                      ? keyword.relatedArticles
                      : keyword.relatedArticles.slice(0, 2);

                    return (
                      <div key={keyword.id} className="min-h-[320px] flex flex-col">
                        <div className="px-6 py-5 border-b border-gray-800 flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-bold text-white">
                              ‘{keyword.keyword}’ 연관 기사
                            </h3>
                            <p className="text-sm text-gray-400 mt-1">
                              총 {keyword.relatedArticleCount}건
                            </p>
                          </div>

                          <div className="text-sm text-gray-400">
                            언급 {keyword.mentionCount}회
                          </div>
                        </div>

                        <div className="p-6 space-y-4 flex-1">
                          {visibleArticles.map((article) => (
                            <div
                              key={article.id}
                              className="rounded-xl border border-gray-700/60 bg-gray-800/30 p-4"
                            >
                              <div className="flex items-start gap-3">
                                <Newspaper className="w-4 h-4 text-[#3B82F6] mt-1 shrink-0" />

                                <div className="min-w-0">
                                  <Link
                                    href={`/article-detail/${article.id}`}
                                    className="font-semibold text-gray-100 hover:text-[#60A5FA] transition"
                                  >
                                    {article.originalTitle}
                                  </Link>

                                  <div className="mt-2 flex flex-wrap gap-2 text-xs text-gray-400">
                                    <span>{article.mediaName}</span>
                                    <span>·</span>
                                    <span>{article.categoryName}</span>
                                    <span>·</span>
                                    <span>{article.publishedAt}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}

                          {!expandedKeywordMap[keyword.id] &&
                            keyword.relatedArticles.length > 2 && (
                              <button
                                onClick={() => handleExpandArticles(keyword.id)}
                                className="w-full py-3 rounded-xl border border-gray-700 text-sm font-medium text-gray-300 hover:bg-gray-800/50 transition"
                              >
                                더보기
                              </button>
                            )}
                        </div>
                      </div>
                    );
                  })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}