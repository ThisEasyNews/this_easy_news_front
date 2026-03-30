'use client';

import { ChevronLeft } from 'lucide-react';

export default function BackButton() {
  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = '/';
    }
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#3B82F6] transition-colors"
    >
      <ChevronLeft className="w-4 h-4" /> 이전 화면으로
    </button>
  );
}