import React from 'react';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export default function Header({ currentPath, onNavigate }: HeaderProps) {
  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E7E4DF]">
      <div className="h-20 w-full max-w-[1440px] mx-auto px-5 md:px-12 lg:px-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => onNavigate('home')} 
            className="flex items-center gap-2 text-left cursor-pointer group"
          >
            <span className="font-serif text-xl tracking-wider uppercase text-[#141413] group-hover:text-[#C25E3E] transition-colors">ATELIER</span>
          </button>
          <span className="hidden lg:inline-block font-mono text-[10px] uppercase text-[#716E68] tracking-widest pl-2 border-l border-[#E7E4DF]">
            Monograph & Provenance
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <button 
            onClick={() => onNavigate('home')}
            className={`font-sans text-xs uppercase tracking-wider transition-colors cursor-pointer ${currentPath === 'home' ? 'text-[#141413] font-semibold' : 'text-[#56423d] hover:text-[#141413]'}`}
          >
            Explore Creators
          </button>
          <button 
            onClick={() => onNavigate('collections')}
            className="font-sans text-xs uppercase tracking-wider text-[#56423d] hover:text-[#141413] transition-colors cursor-pointer"
          >
            Disciplines
          </button>
          <button 
            onClick={() => onNavigate('studio-overview')}
            className="font-sans text-xs uppercase tracking-wider text-[#56423d] hover:text-[#141413] transition-colors cursor-pointer"
          >
            Commissions
          </button>
          <button 
            onClick={() => onNavigate('portfolio-customizer')}
            className="font-sans text-xs uppercase tracking-wider text-[#56423d] hover:text-[#141413] transition-colors cursor-pointer"
          >
            About
          </button>
        </nav>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => onNavigate('studio-overview')}
            className="hidden sm:inline-block font-sans text-xs uppercase tracking-wider text-[#56423d] hover:text-[#141413] transition-colors px-2 py-1 cursor-pointer"
          >
            Sign In
          </button>
          <button 
            onClick={() => onNavigate('studio-overview')}
            className="inline-flex items-center justify-center font-sans text-xs uppercase tracking-wider bg-[#141413] text-white hover:bg-[#C25E3E] transition-colors px-5 py-2.5 shadow-sm cursor-pointer"
          >
            Start Your Atelier
          </button>
          <div 
            onClick={() => onNavigate('studio-overview')}
            className="w-8 h-8 rounded-full bg-[#9a4023] flex items-center justify-center text-white cursor-pointer shadow-sm hover:opacity-90" 
            title="Elena Vance Studio"
          >
            <span className="material-symbols-outlined text-[18px]">person</span>
          </div>
        </div>
      </div>
    </header>
  );
}
