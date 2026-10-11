import React from 'react';

interface StudioHeaderProps {
  onNavigate: (path: string) => void;
}

export default function StudioHeader({ onNavigate }: StudioHeaderProps) {
  return (
    <header className="fixed top-0 left-72 right-0 h-16 bg-white/90 backdrop-blur-md border-b border-[#E7E4DF] z-40 flex items-center justify-between px-6 lg:px-8">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-2.5 py-1 bg-[#FAF8F5] border border-[#E7E4DF]">
          <span className="w-2 h-2 rounded-full bg-[#C25E3E]"></span>
          <span className="font-mono text-[10px] text-[#141413] uppercase tracking-wider font-semibold">Active Workspace: Elena Vance</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={() => onNavigate('home')}
          className="font-sans text-xs text-[#141413] hover:text-[#C25E3E] transition-colors underline underline-offset-4 decoration-[#E7E4DF] flex items-center gap-1 uppercase tracking-wider cursor-pointer"
        >
          <span>View Public Portfolio</span>
          <span className="material-symbols-outlined text-[14px]">north_east</span>
        </button>
        <div className="h-4 w-px bg-[#E7E4DF]"></div>
        <button className="relative p-1.5 text-[#141413] hover:text-[#C25E3E] transition-colors cursor-pointer">
          <span className="material-symbols-outlined text-[20px]">notifications</span>
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#C25E3E]"></span>
        </button>
        <div className="w-8 h-8 rounded-full bg-[#9a4023] flex items-center justify-center text-white">
          <span className="material-symbols-outlined text-[18px]">person</span>
        </div>
      </div>
    </header>
  );
}
