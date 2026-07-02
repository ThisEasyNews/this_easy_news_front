'use client';

import Link from 'next/link';
import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronDown, Filter } from 'lucide-react';

type FilterChipItem = {
  id: string;
  name: string;
};

export default function FilterChipBar({
  label,
  basePath,
  paramName,
  activeId,
  items,
}: {
  label: string;
  basePath: string;
  paramName: string;
  activeId?: string;
  items: FilterChipItem[];
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 text-xs text-[#3B82F6] font-bold uppercase tracking-wider"
      >
        <Filter className="w-3 h-3" />
        {label}
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              <Link
                href={basePath}
                className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-colors ${
                  activeId
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    : 'bg-[#3B82F6] text-white'
                }`}
              >
                전체
              </Link>
              {items.map((item) => (
                <Link
                  key={item.id}
                  href={`${basePath}?${paramName}=${item.id}`}
                  className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-colors ${
                    activeId === item.id
                      ? 'bg-[#3B82F6] text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
