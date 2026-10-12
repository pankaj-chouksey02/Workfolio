import React from 'react';

export function LoadingSpinner({ label = 'Loading Atelier...' }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 gap-3">
      <div className="w-8 h-8 border-2 border-[#E7E4DF] border-t-[#141413] rounded-full animate-spin"></div>
      <span className="font-mono text-[11px] uppercase tracking-widest text-[#716E68]">{label}</span>
    </div>
  );
}

export default LoadingSpinner;
