import React from 'react';

interface StudioSidebarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export default function StudioSidebar({ currentPath, onNavigate }: StudioSidebarProps) {
  const isSelected = (path: string) => currentPath === path;

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-[#FAF8F5] border-r border-[#E7E4DF] z-50 flex flex-col justify-between overflow-y-auto">
      <div className="flex flex-col">
        {/* Top brand block */}
        <div className="h-16 px-5 border-b border-[#E7E4DF] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <span className="font-serif text-lg tracking-tight text-[#141413] uppercase font-semibold">Atelier</span>
            <span className="font-mono text-[10px] bg-[#141413] text-white px-1.5 py-0.5 tracking-widest uppercase">Studio</span>
          </div>
          <span className="font-mono text-[10px] text-[#716E68] uppercase tracking-widest">v2.4</span>
        </div>

        {/* Artist profile switcher */}
        <div className="p-4 border-b border-[#E7E4DF] bg-[#FAF8F5]">
          <div className="w-full flex items-center justify-between p-2 bg-white border border-[#E7E4DF] text-left">
            <div className="flex flex-col min-w-0 pr-2">
              <span className="font-sans text-xs font-semibold text-[#141413] truncate">Elena Vance</span>
              <span className="font-mono text-[11px] text-[#716E68] truncate">@elenavance</span>
            </div>
            <span className="material-symbols-outlined text-[18px] text-[#716E68]">unfold_more</span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 px-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 animate-pulse"></span>
            <span className="font-mono text-[10px] text-[#716E68] uppercase tracking-wider">Accepting Commissions</span>
          </div>
        </div>

        {/* Navigation Group 1 */}
        <div className="px-3 py-3">
          <span className="px-3 py-1 font-mono text-[10px] text-[#716E68] uppercase tracking-widest block">Curation & Works</span>
          <nav className="flex flex-col gap-0.5 mt-1">
            <button 
              onClick={() => onNavigate('studio-overview')}
              className={`w-full flex items-center justify-between px-3 py-2 text-xs transition-colors cursor-pointer text-left ${isSelected('studio-overview') ? 'bg-[#141413] text-white font-semibold' : 'text-[#56423d] hover:bg-[#eae8e5] hover:text-[#1b1c1a]'}`}
            >
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[18px]">grid_view</span>
                <span>Studio Overview</span>
              </div>
            </button>
            <button 
              onClick={() => onNavigate('portfolio-customizer')}
              className={`w-full flex items-center justify-between px-3 py-2 text-xs transition-colors cursor-pointer text-left ${isSelected('portfolio-customizer') ? 'bg-[#141413] text-white font-semibold' : 'text-[#56423d] hover:bg-[#eae8e5] hover:text-[#1b1c1a]'}`}
            >
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[18px]">auto_stories</span>
                <span>Portfolio Customizer</span>
              </div>
            </button>
            <button 
              onClick={() => onNavigate('artworks')}
              className={`w-full flex items-center justify-between px-3 py-2 text-xs transition-colors cursor-pointer text-left ${isSelected('artworks') ? 'bg-[#141413] text-white font-semibold' : 'text-[#56423d] hover:bg-[#eae8e5] hover:text-[#1b1c1a]'}`}
            >
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[18px]">palette</span>
                <span>Artworks</span>
              </div>
            </button>
            <button 
              onClick={() => onNavigate('collections')}
              className={`w-full flex items-center justify-between px-3 py-2 text-xs transition-colors cursor-pointer text-left ${isSelected('collections') ? 'bg-[#141413] text-white font-semibold' : 'text-[#56423d] hover:bg-[#eae8e5] hover:text-[#1b1c1a]'}`}
            >
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[18px]">folder_special</span>
                <span>Collections</span>
              </div>
            </button>
            <button 
              onClick={() => onNavigate('products')}
              className={`w-full flex items-center justify-between px-3 py-2 text-xs transition-colors cursor-pointer text-left ${isSelected('products') ? 'bg-[#141413] text-white font-semibold' : 'text-[#56423d] hover:bg-[#eae8e5] hover:text-[#1b1c1a]'}`}
            >
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[18px]">sell</span>
                <span>Products & Editions</span>
              </div>
            </button>
          </nav>
        </div>

        {/* Navigation Group 2 */}
        <div className="px-3 py-3">
          <span className="px-3 py-1 font-mono text-[10px] text-[#716E68] uppercase tracking-widest block">Commerce & Archive</span>
          <nav className="flex flex-col gap-0.5 mt-1">
            <button 
              onClick={() => onNavigate('studio-overview')}
              className="w-full flex items-center justify-between px-3 py-2 text-xs text-[#56423d] hover:bg-[#eae8e5] hover:text-[#1b1c1a] transition-colors cursor-pointer text-left"
            >
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[18px]">assignment</span>
                <span>Commissions</span>
              </div>
              <span className="font-mono text-[9px] px-1.5 py-0.5 bg-[#C25E3E] text-white tracking-wider">3 NEW</span>
            </button>
            <button 
              onClick={() => onNavigate('products')}
              className="w-full flex items-center justify-between px-3 py-2 text-xs text-[#56423d] hover:bg-[#eae8e5] hover:text-[#1b1c1a] transition-colors cursor-pointer text-left"
            >
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[18px]">receipt_long</span>
                <span>Orders</span>
              </div>
            </button>
            <button 
              onClick={() => onNavigate('studio-overview')}
              className="w-full flex items-center justify-between px-3 py-2 text-xs text-[#56423d] hover:bg-[#eae8e5] hover:text-[#1b1c1a] transition-colors cursor-pointer text-left"
            >
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[18px]">insights</span>
                <span>Analytics</span>
              </div>
            </button>
            <button 
              onClick={() => onNavigate('portfolio-customizer')}
              className="w-full flex items-center justify-between px-3 py-2 text-xs text-[#56423d] hover:bg-[#eae8e5] hover:text-[#1b1c1a] transition-colors cursor-pointer text-left"
            >
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[18px]">tune</span>
                <span>Settings</span>
              </div>
            </button>
          </nav>
        </div>
      </div>

      {/* Footer Storage & Quick Upload */}
      <div className="p-4 border-t border-[#E7E4DF] bg-[#FAF8F5] space-y-3">
        <div className="bg-white p-3 border border-[#E7E4DF] space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-mono text-[10px] text-[#716E68] uppercase tracking-wider">Lossless Archival</span>
            <span className="font-mono text-xs text-[#141413] font-medium">18.4 / 50 GB</span>
          </div>
          <div className="w-full h-1 bg-[#efeeeb] overflow-hidden">
            <div className="h-full bg-[#C25E3E]" style={{ width: '36.8%' }}></div>
          </div>
        </div>
        <button 
          onClick={() => onNavigate('artworks')}
          className="w-full flex items-center justify-center gap-2 bg-[#141413] text-white hover:bg-[#C25E3E] transition-colors py-2.5 px-4 font-sans text-xs uppercase tracking-wider cursor-pointer shadow-sm"
        >
          <span className="material-symbols-outlined text-[16px]">add</span>
          <span>Quick Upload</span>
        </button>
        <div className="flex items-center justify-between pt-1 text-[#716E68]">
          <span className="font-mono text-[11px]">Curatorial Support</span>
          <span className="material-symbols-outlined text-[16px]">help_outline</span>
        </div>
      </div>
    </aside>
  );
}
