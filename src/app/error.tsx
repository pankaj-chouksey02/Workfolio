'use client';

import React, { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App runtime error:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <span className="font-mono text-xs text-red-600 uppercase tracking-widest mb-2">Registry Anomaly</span>
      <h1 className="font-serif text-4xl text-[#141413] mb-4">Something went wrong</h1>
      <p className="font-sans text-sm text-[#716E68] max-w-md mb-8">
        An unexpected error occurred while loading this archival screen.
      </p>
      <button
        onClick={() => reset()}
        className="bg-[#141413] text-white font-sans text-xs uppercase tracking-wider px-6 py-3 hover:bg-[#C25E3E] transition-colors cursor-pointer"
      >
        Retry Registry Sync
      </button>
    </div>
  );
}
