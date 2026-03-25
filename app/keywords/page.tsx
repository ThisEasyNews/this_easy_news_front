import { fetchHotKeywords } from '../_lib/api';
import KeywordsContent from './_components/KeywordsContent';

export default async function KeywordsPage() {
  let keywords;
  try {
    keywords = await fetchHotKeywords();
  } catch {
    return (
      <div className="space-y-6">
        <div className="bg-[#1F2937] rounded-2xl border border-gray-800 p-6 text-center text-gray-400">
          키워드 데이터를 불러오지 못했습니다.
        </div>
      </div>
    );
  }

  return <KeywordsContent keywords={keywords} />;
}
