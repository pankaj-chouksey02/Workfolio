'use client';

import React from 'react';

export interface ImageGridItem {
  id: string;
  url: string;
  title: string;
  medium?: string;
  year?: number | string;
}

interface ImageGridProps {
  items: ImageGridItem[];
  columns?: 2 | 3 | 4;
  onItemClick?: (item: ImageGridItem) => void;
  className?: string;
}

export function ImageGrid({
  items,
  columns = 3,
  onItemClick,
  className = '',
}: ImageGridProps) {
  const columnClasses = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  }[columns];

  return (
    <div className={`grid ${columnClasses} gap-6 ${className}`}>
      {items.map((item) => (
        <div
          key={item.id}
          onClick={() => onItemClick?.(item)}
          className="group bg-white border border-[#E7E4DF] hover:border-[#141413] transition-colors cursor-pointer overflow-hidden"
        >
          <div className="relative aspect-[4/5] bg-[#FAF8F5] overflow-hidden">
            <img
              src={item.url}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="p-4 space-y-1">
            <h4 className="font-serif text-base text-[#141413] truncate">{item.title}</h4>
            {(item.medium || item.year) && (
              <p className="font-mono text-xs text-[#716E68]">
                {item.medium} {item.year ? `· ${item.year}` : ''}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ImageGrid;
