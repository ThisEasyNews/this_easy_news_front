import Link from 'next/link';
import { Briefcase, Cpu, Trophy, Globe, Heart, TrendingUp } from 'lucide-react';
import { fetchCategories } from '../_lib/api';
import type { CategoryResponse } from '../_types';

function getCategoryIcon(name: string) {
  const map: Record<string, React.ReactNode> = {
    정치: <Globe className="w-6 h-6" />,
    경제: <TrendingUp className="w-6 h-6" />,
    사회: <Heart className="w-6 h-6" />,
    국제: <Globe className="w-6 h-6" />,
    스포츠: <Trophy className="w-6 h-6" />,
    문화: <Briefcase className="w-6 h-6" />,
    연예: <Briefcase className="w-6 h-6" />,
    'IT·과학': <Cpu className="w-6 h-6" />,
  };
  return map[name] ?? <Briefcase className="w-6 h-6" />;
}

function getCategoryColor(name: string) {
  const map: Record<string, string> = {
    정치: 'bg-rose-500/20 text-rose-400',
    경제: 'bg-blue-500/20 text-blue-400',
    사회: 'bg-pink-500/20 text-pink-400',
    국제: 'bg-cyan-500/20 text-cyan-400',
    스포츠: 'bg-orange-500/20 text-orange-400',
    문화: 'bg-green-500/20 text-green-400',
    연예: 'bg-purple-500/20 text-purple-400',
    'IT·과학': 'bg-indigo-500/20 text-indigo-400',
  };
  return map[name] ?? 'bg-gray-700 text-gray-200';
}

export default async function CategoriesPage() {
  let categories: CategoryResponse[] = [];
  try {
    categories = await fetchCategories();
  } catch {
    // 빈 목록으로 폴백
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-bold">카테고리별 탐색</h2>
        <p className="text-sm text-gray-400">관심 있는 분야의 뉴스를 더 깊게 읽어보세요.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.id}`}
            className="group relative bg-[#1F2937] rounded-2xl border border-gray-800 transition-all overflow-hidden p-5 hover:border-[#3B82F6]/40"
          >
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${getCategoryColor(category.name)}`}
            >
              {getCategoryIcon(category.name)}
            </div>

            <div>
              <p className="text-sm font-bold text-gray-200">{category.name}</p>
              {category.countText && (
                <p className="text-[10px] text-gray-500 font-medium group-hover:text-gray-400 transition-colors">
                  {category.countText} 뉴스 요약됨
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
