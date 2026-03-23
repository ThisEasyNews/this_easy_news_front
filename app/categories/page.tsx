import Link from 'next/link';
import { Briefcase, Cpu, Dribbble, Globe, Heart, TrendingUp } from 'lucide-react';
import { CATEGORIES } from '../_data/mock-data';

const CATEGORY_ICON_MAP: Record<string, React.ReactNode> = {
  politics: <Globe className="w-6 h-6" />,
  economy: <TrendingUp className="w-6 h-6" />,
  society: <Heart className="w-6 h-6" />,
  international: <Globe className="w-6 h-6" />,
  sports: <Dribbble className="w-6 h-6" />,
  culture: <Briefcase className="w-6 h-6" />,
  entertainment: <Briefcase className="w-6 h-6" />,
  'tech-science': <Cpu className="w-6 h-6" />,
};

const CATEGORY_COLOR_MAP: Record<string, string> = {
  politics: 'bg-rose-500/20 text-rose-400',
  economy: 'bg-blue-500/20 text-blue-400',
  society: 'bg-pink-500/20 text-pink-400',
  international: 'bg-cyan-500/20 text-cyan-400',
  sports: 'bg-orange-500/20 text-orange-400',
  culture: 'bg-green-500/20 text-green-400',
  entertainment: 'bg-purple-500/20 text-purple-400',
  'tech-science': 'bg-indigo-500/20 text-indigo-400',
};

export default function CategoriesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-bold">카테고리별 탐색</h2>
        <p className="text-sm text-gray-400">관심 있는 분야의 뉴스를 더 깊게 읽어보세요.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {CATEGORIES.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.id}`}
            className="group relative bg-[#1F2937] rounded-2xl border border-gray-800 transition-all overflow-hidden p-5 hover:border-[#3B82F6]/40"
          >
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                CATEGORY_COLOR_MAP[category.id] ?? 'bg-gray-700 text-gray-200'
              }`}
            >
              {CATEGORY_ICON_MAP[category.id] ?? <Briefcase className="w-6 h-6" />}
            </div>

            <div>
              <p className="text-sm font-bold text-gray-200">{category.name}</p>
              <p className="text-[10px] text-gray-500 font-medium group-hover:text-gray-400 transition-colors">
                {category.countText} 뉴스 요약됨
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}