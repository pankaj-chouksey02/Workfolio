'use client';

import React, { useState } from 'react';

interface ImagePreviewProps {
  src: string;
  alt?: string;
  allowZoom?: boolean;
  className?: string;
}

export function ImagePreview({
  src,
  alt = 'Master artwork display',
  allowZoom = true,
  className = '',
}: ImagePreviewProps) {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <>
      <div
        className={`relative overflow-hidden bg-[#FAF8F5] border border-[#E7E4DF] ${
          allowZoom ? 'cursor-zoom-in' : ''
        } ${className}`}
        onClick={() => allowZoom && setIsZoomed(true)}
      >
        <img src={src} alt={alt} className="w-full h-full object-cover" />
        {allowZoom && (
          <div className="absolute top-3 right-3 bg-white/90 border border-[#E7E4DF] p-1.5 text-[#141413]">
            <span className="material-symbols-outlined text-[16px]">zoom_in</span>
          </div>
        )}
      </div>

      {isZoomed && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setIsZoomed(false)}
        >
          <img
            src={src}
            alt={alt}
            className="max-h-[90vh] max-w-[90vw] object-contain shadow-2xl"
          />
          <button
            onClick={() => setIsZoomed(false)}
            className="absolute top-6 right-6 text-white/80 hover:text-white p-2"
          >
            <span className="material-symbols-outlined text-[28px]">close</span>
          </button>
        </div>
      )}
    </>
  );
}

export default ImagePreview;
