"use client";

import React, { useState } from 'react';

interface PortfolioCustomizerScreenProps {
  onNavigate: (path: string) => void;
}

export default function PortfolioCustomizerScreen({ onNavigate }: PortfolioCustomizerScreenProps) {
  const [viewportMode, setViewportMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [archetype, setArchetype] = useState<'editorial' | 'gallery' | 'masonry'>('editorial');
  const [typography, setTypography] = useState<'playfair' | 'cormorant' | 'syne'>('playfair');
  const [canvasColor, setCanvasColor] = useState<'bone' | 'linen' | 'basalt'>('bone');
  const [publishedToast, setPublishedToast] = useState(false);

  const handlePublish = () => {
    setPublishedToast(true);
    setTimeout(() => setPublishedToast(false), 4000);
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#FAF8F5]">
      {/* Top Action & Viewport Context Bar */}
      <div className="w-full bg-white border-b border-[#E7E4DF] sticky top-16 z-30 px-5 lg:px-8 py-3 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-sm">
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] text-[#716E68] uppercase tracking-widest">Creator Studio</span>
            <span className="text-[#716E68] text-xs">/</span>
            <span className="font-mono text-[10px] text-[#716E68] uppercase tracking-widest">Studio</span>
            <span className="text-[#716E68] text-xs">/</span>
            <span className="font-mono text-[10px] text-[#C25E3E] uppercase tracking-widest font-semibold">Portfolio Customizer</span>
          </div>
          <div className="flex items-center gap-3">
            <h1 className="font-serif text-lg font-medium text-[#141413] tracking-tight">Portfolio Customizer</h1>
            <span className="hidden xl:inline-block w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
            <span className="hidden xl:inline-block font-mono text-xs text-[#716E68]">Changes auto-saved to Draft · Unsaved changes published: 14 mins ago</span>
          </div>
        </div>

        {/* Actions & Viewport Toggle */}
        <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap justify-between sm:justify-end">
          <div className="flex items-center bg-[#f5f3f0] p-0.5 border border-[#E7E4DF]">
            <button 
              onClick={() => setViewportMode('desktop')}
              className={`px-2.5 py-1 text-xs flex items-center gap-1.5 font-mono cursor-pointer ${viewportMode === 'desktop' ? 'bg-[#141413] text-white' : 'text-[#716E68]'}`}
            >
              <span className="material-symbols-outlined text-[15px]">desktop_windows</span>
              <span className="hidden lg:inline">Desktop</span>
            </button>
            <button 
              onClick={() => setViewportMode('tablet')}
              className={`px-2.5 py-1 text-xs flex items-center gap-1.5 font-mono cursor-pointer ${viewportMode === 'tablet' ? 'bg-[#141413] text-white' : 'text-[#716E68]'}`}
            >
              <span className="material-symbols-outlined text-[15px]">tablet_mac</span>
              <span className="hidden lg:inline">Tablet</span>
            </button>
            <button 
              onClick={() => setViewportMode('mobile')}
              className={`px-2.5 py-1 text-xs flex items-center gap-1.5 font-mono cursor-pointer ${viewportMode === 'mobile' ? 'bg-[#141413] text-white' : 'text-[#716E68]'}`}
            >
              <span className="material-symbols-outlined text-[15px]">phone_iphone</span>
              <span className="hidden lg:inline">Mobile</span>
            </button>
          </div>

          <div className="h-6 w-px bg-[#E7E4DF] hidden sm:block"></div>

          <div className="flex items-center gap-2">
            <button onClick={() => alert('Draft reverted to last published version.')} className="px-3 py-1.5 font-sans text-xs uppercase tracking-wider text-[#716E68] hover:text-[#141413] transition-colors cursor-pointer">
              Discard Draft
            </button>
            <button onClick={() => onNavigate('home')} className="px-3.5 py-1.5 border border-[#141413] text-[#141413] hover:bg-[#141413] hover:text-white transition-all font-sans text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer">
              <span>View Live</span>
              <span className="material-symbols-outlined text-[14px]">north_east</span>
            </button>
            <button onClick={handlePublish} className="px-4 py-1.5 bg-[#141413] text-white hover:bg-[#C25E3E] transition-colors flex items-center gap-2 font-sans text-xs uppercase tracking-wider shadow-sm cursor-pointer">
              <span>Publish Sovereign</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C25E3E]"></span>
            </button>
          </div>
        </div>
      </div>

      {publishedToast && (
        <div className="fixed top-24 right-6 z-50 bg-[#141413] text-white px-6 py-3 shadow-xl font-mono text-xs flex items-center gap-2 border border-white/20">
          <span className="material-symbols-outlined text-emerald-400">check_circle</span>
          Portfolio successfully published to atelier.art/@elenavance (DNS-SEC Verified).
        </div>
      )}

      {/* Dual-Pane Studio Canvas */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-0 relative flex-1">
        {/* LEFT COLUMN: Customization Controls */}
        <div className="lg:col-span-4 xl:col-span-4 bg-[#FAF8F5] border-r border-[#E7E4DF] p-4 lg:p-6 space-y-6 max-h-[calc(100vh-7rem)] overflow-y-auto">
          {/* Section 1: Layout Archetype */}
          <div className="bg-white border border-[#E7E4DF] p-4 space-y-3.5">
            <div className="flex items-center justify-between border-b border-[#E7E4DF] pb-2.5">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] bg-[#141413] text-white px-1.5 py-0.5">01</span>
                <span className="font-serif text-base text-[#141413]">Layout Archetype</span>
              </div>
              <span className="font-mono text-[10px] uppercase text-[#C25E3E] font-semibold">Active: {archetype}</span>
            </div>
            <p className="font-sans text-xs text-[#5f5e5d]">Determines spatial density, heroic focal balance, and navigational rhythm of your catalog.</p>
            
            <div className="space-y-2.5">
              <div 
                onClick={() => setArchetype('editorial')}
                className={`p-3 border cursor-pointer transition-all flex gap-3 ${archetype === 'editorial' ? 'bg-[#efeeeb] ring-1 ring-[#141413] border-[#141413]' : 'bg-white border-[#E7E4DF]'}`}
              >
                <div className="w-12 h-14 bg-white border border-[#E7E4DF] flex flex-col justify-between p-1 shrink-0">
                  <div className="h-1.5 w-7 bg-[#141413]"></div>
                  <div className="h-5 w-full bg-[#efeeeb] border-dashed border border-[#716E68]/40"></div>
                </div>
                <div>
                  <span className="font-sans text-xs font-semibold text-[#141413] block">Editorial Monolith</span>
                  <p className="font-mono text-[11px] text-[#716E68] mt-0.5">Heroic statement, intentional asymmetry, museum-grade vertical flow.</p>
                </div>
              </div>

              <div 
                onClick={() => setArchetype('gallery')}
                className={`p-3 border cursor-pointer transition-all flex gap-3 ${archetype === 'gallery' ? 'bg-[#efeeeb] ring-1 ring-[#141413] border-[#141413]' : 'bg-white border-[#E7E4DF]'}`}
              >
                <div className="w-12 h-14 bg-[#FAF8F5] border border-[#E7E4DF] flex flex-col justify-between p-1 shrink-0">
                  <div className="grid grid-cols-2 gap-1 my-auto">
                    <div className="h-3 bg-[#efeeeb]"></div>
                    <div className="h-3 bg-[#efeeeb]"></div>
                  </div>
                </div>
                <div>
                  <span className="font-sans text-xs font-semibold text-[#141413] block">Clean Gallery</span>
                  <p className="font-mono text-[11px] text-[#716E68] mt-0.5">Equidistant white cube grid, minimal chrome, instant multi-object scan.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Typography Hierarchy */}
          <div className="bg-white border border-[#E7E4DF] p-4 space-y-3.5">
            <div className="flex items-center justify-between border-b border-[#E7E4DF] pb-2.5">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] bg-[#141413] text-white px-1.5 py-0.5">02</span>
                <span className="font-serif text-base text-[#141413]">Typography Hierarchy</span>
              </div>
              <span className="font-mono text-[10px] uppercase text-[#716E68]">Dual Foundry</span>
            </div>

            <div className="space-y-2">
              <label 
                onClick={() => setTypography('playfair')}
                className={`flex items-start gap-3 p-3 border cursor-pointer ${typography === 'playfair' ? 'border-[#141413] bg-[#f5f3f0]' : 'border-[#E7E4DF] bg-white'}`}
              >
                <input type="radio" checked={typography === 'playfair'} onChange={() => setTypography('playfair')} className="mt-1 accent-[#141413]" />
                <div>
                  <span className="font-serif text-base text-[#141413]">Playfair + JetBrains Mono</span>
                  <p className="font-mono text-[11px] text-[#716E68] mt-1">Exhibition title serif paired with archival cold monospace technical specs.</p>
                </div>
              </label>

              <label 
                onClick={() => setTypography('cormorant')}
                className={`flex items-start gap-3 p-3 border cursor-pointer ${typography === 'cormorant' ? 'border-[#141413] bg-[#f5f3f0]' : 'border-[#E7E4DF] bg-white'}`}
              >
                <input type="radio" checked={typography === 'cormorant'} onChange={() => setTypography('cormorant')} className="mt-1 accent-[#141413]" />
                <div>
                  <span className="font-serif text-base italic text-[#141413]">Cormorant Garamond + Inter</span>
                  <p className="font-mono text-[11px] text-[#716E68] mt-1">Refined continental publishing face with ultra-neutral modern sans details.</p>
                </div>
              </label>
            </div>
          </div>

          {/* Section 3: Tonal Canvas & Accents */}
          <div className="bg-white border border-[#E7E4DF] p-4 space-y-4">
            <div className="flex items-center justify-between border-b border-[#E7E4DF] pb-2.5">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] bg-[#141413] text-white px-1.5 py-0.5">03</span>
                <span className="font-serif text-base text-[#141413]">Tonal Canvas & Accents</span>
              </div>
              <span className="font-mono text-[10px] uppercase text-[#716E68]">Atmosphere</span>
            </div>

            <div className="space-y-1.5">
              <span className="font-mono text-[10px] uppercase text-[#716E68] tracking-wider block">Gallery Canvas Ground</span>
              <div className="grid grid-cols-3 gap-2">
                <button 
                  onClick={() => setCanvasColor('bone')}
                  className={`p-2 border cursor-pointer text-center font-mono text-[10px] ${canvasColor === 'bone' ? 'border-2 border-[#141413] bg-[#FAF8F5]' : 'border-[#E7E4DF] bg-white'}`}
                >
                  Bone
                </button>
                <button 
                  onClick={() => setCanvasColor('linen')}
                  className={`p-2 border cursor-pointer text-center font-mono text-[10px] ${canvasColor === 'linen' ? 'border-2 border-[#141413] bg-white' : 'border-[#E7E4DF] bg-white'}`}
                >
                  Pure Linen
                </button>
                <button 
                  onClick={() => setCanvasColor('basalt')}
                  className={`p-2 border cursor-pointer text-center font-mono text-[10px] ${canvasColor === 'basalt' ? 'border-2 border-[#141413] bg-[#141413] text-white' : 'border-[#E7E4DF] bg-white'}`}
                >
                  Basalt
                </button>
              </div>
            </div>
          </div>

          {/* Section 4: Identity & Statement */}
          <div className="bg-white border border-[#E7E4DF] p-4 space-y-3.5 mb-6">
            <div className="flex items-center justify-between border-b border-[#E7E4DF] pb-2.5">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] bg-[#141413] text-white px-1.5 py-0.5">04</span>
                <span className="font-serif text-base text-[#141413]">Identity & Statement</span>
              </div>
              <span className="material-symbols-outlined text-[18px] text-emerald-700">verified</span>
            </div>
            <div>
              <label className="font-mono text-[10px] uppercase text-[#716E68] tracking-wider block mb-1">Sovereign URL Route</label>
              <div className="flex items-center bg-[#f5f3f0] border border-[#E7E4DF] px-2.5 py-1.5">
                <span className="font-mono text-xs text-[#716E68]">atelier.art/</span>
                <input type="text" defaultValue="@elenavance" className="bg-transparent font-mono text-xs text-[#141413] font-semibold outline-none flex-1" />
                <span className="font-mono text-[9px] bg-emerald-100 text-emerald-800 px-1">LIVE</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive High-Fidelity Studio Live Viewport */}
        <div className={`lg:col-span-8 xl:col-span-8 bg-[#f5f3f0] p-4 lg:p-8 flex flex-col items-center justify-start overflow-y-auto min-h-[calc(100vh-7rem)] transition-all duration-300`}>
          <div 
            className="transition-all duration-300 border border-[#E7E4DF] shadow-xl bg-white w-full"
            style={{
              maxWidth: viewportMode === 'mobile' ? '390px' : viewportMode === 'tablet' ? '768px' : '100%'
            }}
          >
            {/* Browser Simulated Header Bar */}
            <div className="h-10 bg-[#FAF8F5] border-b border-[#E7E4DF] px-4 flex items-center justify-between select-none">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E7E4DF]"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#E7E4DF]"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#E7E4DF]"></span>
                <span className="h-3.5 w-px bg-[#E7E4DF] mx-1"></span>
                <span className="material-symbols-outlined text-[15px] text-[#716E68]">lock</span>
                <span className="font-mono text-[11px] text-[#141413] font-medium">atelier.art/@elenavance?preview=draft_v2</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] text-[#716E68] uppercase tracking-widest hidden sm:inline">100% Zoom · Live Preview</span>
              </div>
            </div>

            {/* LIVE PREVIEW CONTENT */}
            <div className={`p-6 sm:p-10 space-y-10 ${canvasColor === 'basalt' ? 'bg-[#141413] text-white' : canvasColor === 'linen' ? 'bg-white text-[#141413]' : 'bg-[#FAF8F5] text-[#141413]'}`}>
              {/* Monograph Top Navigation Bar */}
              <div className="border-b border-[#E7E4DF] pb-5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
                <div className="flex items-baseline gap-4">
                  <span className={`font-serif text-2xl font-bold tracking-tight ${canvasColor === 'basalt' ? 'text-white' : 'text-[#141413]'}`}>Elena Vance</span>
                  <span className="font-mono text-[10px] text-[#716E68] uppercase tracking-widest">Atelier Monograph</span>
                </div>
                <nav className="flex items-center gap-6 font-sans text-xs">
                  <a href="#works" className="font-semibold border-b border-[#141413] pb-0.5">Works (34)</a>
                  <a href="#collections" className="text-[#716E68] hover:text-[#141413] transition-colors">Collections (3)</a>
                  <a href="#bio" className="text-[#716E68] hover:text-[#141413] transition-colors">Monograph & Bio</a>
                  <span className="text-[#C25E3E] font-medium flex items-center gap-1">Commission</span>
                </nav>
              </div>

              {/* Hero Section */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pt-2">
                <div className="lg:col-span-8 space-y-4">
                  <span className="font-mono text-[10px] bg-[#141413] text-white px-2 py-0.5 tracking-widest uppercase">Ceramic Sculptor · Zürich & Kyoto</span>
                  <h2 className={`font-serif text-3xl sm:text-4xl tracking-tight leading-[1.1] ${canvasColor === 'basalt' ? 'text-white' : 'text-[#141413]'}`}>
                    Investigating geological fractures, thermal vitrification, and unglazed volcanic stoneware.
                  </h2>
                </div>
                <div className="lg:col-span-4 space-y-3 lg:border-l lg:border-[#E7E4DF] lg:pl-6">
                  <p className="font-sans text-sm text-[#716E68] leading-relaxed">
                    Sculptural artifacts born from high-temperature wood kilns. Each monolith interrogates tectonic tension, mineral shrinkage, and the silent permanence of physical earth.
                  </p>
                  <div className="flex items-center gap-2 pt-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                    <span className="font-mono text-[11px] text-[#141413] font-medium">Accepting 2 Private Commissions for Q1/Q2</span>
                  </div>
                </div>
              </div>

              {/* Featured Curated Work Hero */}
              <div className={`p-6 sm:p-8 space-y-6 border ${canvasColor === 'basalt' ? 'bg-[#30312f] border-white/10' : 'bg-white border-[#E7E4DF]'}`}>
                <div className="flex items-center justify-between border-b border-[#E7E4DF] pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-[#C25E3E] uppercase font-semibold">Featured Masterwork</span>
                    <span className="text-[#716E68] text-xs">·</span>
                    <span className="font-mono text-[11px] text-[#716E68]">INV #EV-2024-004</span>
                  </div>
                  <span className="font-mono text-[10px] bg-[#FAF8F5] border border-[#E7E4DF] px-2 py-0.5 text-[#141413]">Verified</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  <div className="md:col-span-7 overflow-hidden relative">
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDX4-IMJs6sRHxl9Nfv-gtMKZf6RIxHTIzwNKTmCR1xsXY3Z1GNgIN6HmYrs1I0Q7wM9gXq4_-CQ0m1eeexY-q6YmuQcjzGV4TcAIv4BosgnJK2EyjBkRe4mhJ6P6tbkkkfa1HebktnpXbR_FRySlDJcsC7oxiUID8OxrfcNvpzvXgz49c6Dt0l6t8XCvoCD0NHu27k8CTZLWYORqt9REn8AwMQeROphbdWR2CwRmOnxKnDxMWxsdGemA" alt="Tectonic Vessel No. 04" className="w-full aspect-[4/3] object-cover border border-[#E7E4DF]" referrerPolicy="no-referrer" />
                  </div>
                  <div className="md:col-span-5 space-y-4">
                    <div>
                      <span className="font-mono text-[10px] text-[#716E68] uppercase tracking-widest block mb-1">Catalog Entry No. 04</span>
                      <h3 className={`font-serif text-2xl tracking-tight ${canvasColor === 'basalt' ? 'text-white' : 'text-[#141413]'}`}>Tectonic Vessel No. 04</h3>
                      <p className="font-serif italic text-xs text-[#716E68] mt-0.5">Wood-Fired Anagama Stoneware, 1320°C</p>
                    </div>
                    <div className="space-y-1 py-2 border-y border-[#E7E4DF] font-mono text-[11px] text-[#716E68]">
                      <div className="flex justify-between">
                        <span>Medium</span>
                        <span className="text-[#141413] font-medium">Unglazed Shigaraki Clay</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Dimensions</span>
                        <span className="text-[#141413] font-medium">48 × 32 × 30 cm</span>
                      </div>
                    </div>
                    <button className="w-full py-2.5 bg-[#141413] text-white font-sans text-xs uppercase tracking-wider hover:bg-[#C25E3E] transition-colors cursor-pointer">
                      Inquire on Work
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
