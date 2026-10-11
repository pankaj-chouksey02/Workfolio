import React from 'react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="w-full bg-[#FAF8F5] border-t border-[#E7E4DF] pt-16 pb-12 mt-auto">
      <div className="w-full max-w-[1440px] mx-auto px-5 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-[#E7E4DF]">
          <div className="md:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="font-serif text-lg text-[#141413] tracking-wider uppercase">ATELIER</span>
                <span className="font-mono text-[10px] text-[#716E68] uppercase tracking-widest">Archival Registry</span>
              </div>
              <p className="font-sans text-sm text-[#56423d] max-w-md leading-relaxed">
                A scholarly, museum-grade portfolio and commission platform stewarding exceptional visual artists, master ceramists, and sculptors worldwide.
              </p>
            </div>
            <div className="space-y-2 pt-2">
              <span className="font-mono text-[10px] uppercase text-[#716E68] tracking-wider block">Curatorial Gazette & Monograph Inquiries</span>
              <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed to Curatorial Gazette.'); }} className="flex items-stretch max-w-md">
                <input 
                  type="email" 
                  placeholder="curator@institution.org" 
                  required 
                  className="flex-1 bg-white text-[#141413] font-sans text-sm px-4 py-2.5 placeholder:text-[#716E68] focus:outline-none border border-[#E7E4DF]"
                />
                <button type="submit" className="bg-[#141413] text-white font-sans text-xs uppercase px-5 py-2.5 hover:bg-[#C25E3E] transition-colors cursor-pointer">
                  Subscribe
                </button>
              </form>
              <p className="font-mono text-[11px] text-[#716E68]">Dispatched bimonthly. Strict privacy protocol respected.</p>
            </div>
          </div>

          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-6">
            <div className="flex flex-col space-y-3">
              <span className="font-mono text-[10px] uppercase text-[#716E68] tracking-widest block">Explore</span>
              <ul className="space-y-2 font-sans text-xs">
                <li><button onClick={() => onNavigate('home')} className="text-[#56423d] hover:text-[#141413] transition-colors cursor-pointer text-left">Featured Masters</button></li>
                <li><button onClick={() => onNavigate('studio-overview')} className="text-[#56423d] hover:text-[#141413] transition-colors cursor-pointer text-left">Open Commissions</button></li>
                <li><button onClick={() => onNavigate('collections')} className="text-[#56423d] hover:text-[#141413] transition-colors cursor-pointer text-left">Digital Pavilions</button></li>
                <li><button onClick={() => onNavigate('collections')} className="text-[#56423d] hover:text-[#141413] transition-colors cursor-pointer text-left">Curatorial Notes</button></li>
              </ul>
            </div>
            <div className="flex flex-col space-y-3">
              <span className="font-mono text-[10px] uppercase text-[#716E68] tracking-widest block">Disciplines</span>
              <ul className="space-y-2 font-sans text-xs">
                <li><button onClick={() => onNavigate('artworks')} className="text-[#56423d] hover:text-[#141413] transition-colors cursor-pointer text-left">Ceramics & Stoneware</button></li>
                <li><button onClick={() => onNavigate('artworks')} className="text-[#56423d] hover:text-[#141413] transition-colors cursor-pointer text-left">Sculpture & Bronze</button></li>
                <li><button onClick={() => onNavigate('artworks')} className="text-[#56423d] hover:text-[#141413] transition-colors cursor-pointer text-left">Oil & Linen</button></li>
                <li><button onClick={() => onNavigate('artworks')} className="text-[#56423d] hover:text-[#141413] transition-colors cursor-pointer text-left">Printmaking & Etching</button></li>
              </ul>
            </div>
            <div className="flex flex-col space-y-3">
              <span className="font-mono text-[10px] uppercase text-[#716E68] tracking-widest block">For Creators</span>
              <ul className="space-y-2 font-sans text-xs">
                <li><button onClick={() => onNavigate('artworks')} className="text-[#56423d] hover:text-[#141413] transition-colors cursor-pointer text-left">Submit Portfolio</button></li>
                <li><button onClick={() => onNavigate('portfolio-customizer')} className="text-[#56423d] hover:text-[#141413] transition-colors cursor-pointer text-left">Platform Standards</button></li>
                <li><button onClick={() => onNavigate('portfolio-customizer')} className="text-[#56423d] hover:text-[#141413] transition-colors cursor-pointer text-left">Provenance Protocol</button></li>
                <li><button onClick={() => onNavigate('portfolio-customizer')} className="text-[#56423d] hover:text-[#141413] transition-colors cursor-pointer text-left">The Atelier Charter</button></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-mono text-[11px] text-[#716E68]">
          <div className="flex items-center gap-6 flex-wrap">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#141413] font-medium">© MMXXIV ATELIER ACADÈMIE INC.</span>
            <span>ALL ARCHIVAL RIGHTS RESERVED</span>
            <span>REGISTRY REF // AT-2024-PROV</span>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => onNavigate('portfolio-customizer')} className="hover:text-[#141413] transition-colors cursor-pointer">ARCHIVAL PRIVACY</button>
            <span>/</span>
            <button onClick={() => onNavigate('studio-overview')} className="hover:text-[#141413] transition-colors cursor-pointer">TERMS OF COMMISSION</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
