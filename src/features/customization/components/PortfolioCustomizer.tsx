"use client";

import React, { useState } from 'react';
import { useCustomization } from '@/features/customization/CustomizationProvider';

export interface PortfolioCustomizerProps {
  onNavigate?: (path: string) => void;
}

type TemplateId =
  | 'minimal'
  | 'editorial'
  | 'gallery'
  | 'artistic'
  | 'studio'
  | 'frieze'
  | 'sothebys'
  | 'kinfolk'
  | 'muji'
  | 'atelier'
  | 'obsidian'
  | 'nocturne';
type TypographyOption = 'serif' | 'sans';
type ColorOption = 'terracotta' | 'sage' | 'charcoal';
type SpacingOption = 'compact' | 'comfortable' | 'airy';
type ButtonStyleOption = 'border' | 'fill';
type ButtonRadiusOption = 'sharp' | 'rounded' | 'pill';
type CanvasToneOption = 'bone' | 'linen' | 'basalt';

interface TemplateConfig {
  id: TemplateId;
  name: string;
}

const TEMPLATES: TemplateConfig[] = [
  { id: 'minimal', name: 'Minimal' },
  { id: 'editorial', name: 'Editorial' },
  { id: 'gallery', name: 'Gallery' },
  { id: 'artistic', name: 'Artistic' },
  { id: 'studio', name: 'Studio' },
  { id: 'frieze', name: 'Frieze' },
  { id: 'sothebys', name: "Sotheby's" },
  { id: 'kinfolk', name: 'Kinfolk' },
  { id: 'muji', name: 'MUJI' },
  { id: 'atelier', name: 'Atelier' },
  { id: 'obsidian', name: 'Obsidian' },
  { id: 'nocturne', name: 'Nocturne' },
];

const COLOR_PALETTES = {
  terracotta: {
    name: 'Terracotta',
    swatchHex: '#C86D4B',
    accent: '#C86D4B',
    accentHover: '#B35A39',
    accentLight: '#FDF6F2',
    accentBorder: '#F2C4B2',
    accentText: '#B85532',
    boneBg: '#FAF7F3',
    tagBg: '#F8EFE9',
    tagText: '#C86D4B',
  },
  sage: {
    name: 'Sage',
    swatchHex: '#759976',
    accent: '#5E8260',
    accentHover: '#4D6E4F',
    accentLight: '#F2F6F3',
    accentBorder: '#BCD1BE',
    accentText: '#486D4A',
    boneBg: '#F5F7F5',
    tagBg: '#EDF4EE',
    tagText: '#5E8260',
  },
  charcoal: {
    name: 'Charcoal',
    swatchHex: '#4E4844',
    accent: '#2B2927',
    accentHover: '#141413',
    accentLight: '#F3F2F0',
    accentBorder: '#CCC8C2',
    accentText: '#2B2927',
    boneBg: '#F7F6F4',
    tagBg: '#EFECE8',
    tagText: '#3B3835',
  },
};

export function PortfolioCustomizer({ onNavigate }: PortfolioCustomizerProps) {
  const [viewportMode, setViewportMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [template, setTemplate] = useState<TemplateId>('artistic');
  const [typography, setTypography] = useState<TypographyOption>('serif');
  const [colorScheme, setColorScheme] = useState<ColorOption>('terracotta');
  const [spacing, setSpacing] = useState<SpacingOption>('comfortable');
  const [buttonStyle, setButtonStyle] = useState<ButtonStyleOption>('fill');
  const [buttonRadius, setButtonRadius] = useState<ButtonRadiusOption>('rounded');
  const [canvasTone, setCanvasTone] = useState<CanvasToneOption>('bone');
  const [publishedToast, setPublishedToast] = useState(false);
  const [customAccent, setCustomAccent] = useState<string | null>(() => {
    try {
      return typeof window !== 'undefined' ? localStorage.getItem('pc:accent') : null;
    } catch (e) {
      return null;
    }
  });

  const activePalette = COLOR_PALETTES[colorScheme];
  const activeAccent = customAccent || activePalette.accent;

  const { settings, setSettings } = useCustomization();

  const handlePublish = () => {
    setPublishedToast(true);
    setTimeout(() => setPublishedToast(false), 4000);
  };

  const spacingStyles = {
    compact: {
      container: 'p-5 sm:p-7 space-y-6',
      heroGap: 'gap-4',
      sectionGap: 'space-y-6',
      gridGap: 'gap-4',
    },
    comfortable: {
      container: 'p-7 sm:p-10 space-y-10',
      heroGap: 'gap-8',
      sectionGap: 'space-y-10',
      gridGap: 'gap-6',
    },
    airy: {
      container: 'p-9 sm:p-14 space-y-14',
      heroGap: 'gap-12',
      sectionGap: 'space-y-14',
      gridGap: 'gap-8',
    },
  }[spacing];

  const buttonRadiusClass = {
    sharp: 'rounded-none',
    rounded: 'rounded-md',
    pill: 'rounded-full',
  }[buttonRadius];

  const canvasBgClass =
    canvasTone === 'basalt'
      ? 'bg-[#181817] text-white'
      : canvasTone === 'linen'
      ? 'bg-[#FFFFFF] text-[#141413]'
      : activePalette.boneBg + ' text-[#141413]';

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#FAF8F5]">
      <div className="w-full bg-white border-b border-[#E7E4DF] sticky top-16 z-30 px-5 lg:px-8 py-3 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-xs">
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
            <span className="hidden xl:inline-block font-mono text-xs text-[#716E68]">
              Auto-saved to Draft · Template: <strong className="capitalize text-[#141413] font-medium">{template}</strong>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap justify-between sm:justify-end">
          <div className="flex items-center bg-[#f5f3f0] p-0.5 border border-[#E7E4DF] rounded-md">
            <button
              onClick={() => setViewportMode('desktop')}
              className={`px-2.5 py-1 text-xs flex items-center gap-1.5 font-mono cursor-pointer rounded-sm transition-all ${
                viewportMode === 'desktop' ? 'bg-[#141413] text-white shadow-xs' : 'text-[#716E68] hover:text-[#141413]'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">desktop_windows</span>
              <span className="hidden lg:inline">Desktop</span>
            </button>
            <button
              onClick={() => setViewportMode('tablet')}
              className={`px-2.5 py-1 text-xs flex items-center gap-1.5 font-mono cursor-pointer rounded-sm transition-all ${
                viewportMode === 'tablet' ? 'bg-[#141413] text-white shadow-xs' : 'text-[#716E68] hover:text-[#141413]'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">tablet_mac</span>
              <span className="hidden lg:inline">Tablet</span>
            </button>
            <button
              onClick={() => setViewportMode('mobile')}
              className={`px-2.5 py-1 text-xs flex items-center gap-1.5 font-mono cursor-pointer rounded-sm transition-all ${
                viewportMode === 'mobile' ? 'bg-[#141413] text-white shadow-xs' : 'text-[#716E68] hover:text-[#141413]'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">phone_iphone</span>
              <span className="hidden lg:inline">Mobile</span>
            </button>
          </div>

          <div className="h-6 w-px bg-[#E7E4DF] hidden sm:block"></div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setTemplate('artistic');
                setTypography('serif');
                setColorScheme('terracotta');
                setSpacing('comfortable');
                setButtonStyle('fill');
                setButtonRadius('rounded');
                setCanvasTone('bone');
              }}
              className="px-3 py-1.5 font-sans text-xs uppercase tracking-wider text-[#716E68] hover:text-[#141413] transition-colors cursor-pointer"
            >
              Reset
            </button>
            <button
              onClick={() => onNavigate?.('home')}
              className="px-3.5 py-1.5 border border-[#141413] text-[#141413] hover:bg-[#141413] hover:text-white transition-all font-sans text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer rounded-md"
            >
              <span>View Live</span>
              <span className="material-symbols-outlined text-[14px]">north_east</span>
            </button>
            <button
              onClick={handlePublish}
              style={{ backgroundColor: activeAccent }}
              className="px-4 py-1.5 text-white hover:opacity-90 transition-opacity flex items-center gap-2 font-sans text-xs uppercase tracking-wider shadow-xs cursor-pointer rounded-md"
            >
              <span>Publish Sovereign</span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/80"></span>
            </button>
          </div>
        </div>
      </div>

      {publishedToast && (
        <div className="fixed top-24 right-6 z-50 bg-[#141413] text-white px-6 py-3 shadow-xl font-mono text-xs flex items-center gap-2 border border-white/20 rounded-md">
          <span className="material-symbols-outlined text-emerald-400">check_circle</span>
          Portfolio successfully published with updated {template} styling to atelier.art/@elenavance.
        </div>
      )}

      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-0 relative flex-1">
        <div className="lg:col-span-4 xl:col-span-4 bg-[#FAF8F5] border-r border-[#E7E4DF] p-4 lg:p-5 space-y-4 max-h-[calc(100vh-7rem)] overflow-y-auto">
          <div className="bg-white border border-[#EAE6DF] rounded-2xl p-4 sm:p-5 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-3.5">
            <h2 className="text-[11px] font-semibold text-[#8C847C] tracking-wider uppercase">TEMPLATE</h2>
            <div className="grid grid-cols-2 gap-3">
              {TEMPLATES.map((tmpl) => {
                const isSelected = template === tmpl.id;
                return (
                  <button
                    key={tmpl.id}
                    onClick={() => {
                      setTemplate(tmpl.id);
                      setSettings({ layout: tmpl.id === 'gallery' ? 'grid' : 'columns' });
                    }}
                    className={`rounded-2xl p-3 flex flex-col items-start gap-2.5 cursor-pointer text-left transition-all duration-200 outline-none w-full ${
                      isSelected
                        ? 'border border-[#F0A98F] bg-[#FFF8F4] shadow-xs'
                        : 'border border-[#EAE6DF] bg-white hover:border-[#D5CFBE] hover:bg-[#FAF9F6]'
                    }`}
                  >
                    <div className={`w-full h-16 rounded-xl flex items-center justify-center transition-colors duration-200 ${isSelected ? 'bg-[#FAECE4]' : 'bg-[#F4F1EA]'}`}>
                      <div className="flex items-end justify-center gap-1.5">
                        <div className={`w-3.5 h-6 rounded-[2px] transition-colors duration-200 ${isSelected ? 'bg-[#D07352]' : 'bg-[#D1C9BE]'}`} />
                        <div className={`w-3.5 h-10 rounded-[2px] transition-colors duration-200 ${isSelected ? 'bg-[#D07352]' : 'bg-[#D1C9BE]'}`} />
                        <div className={`w-3.5 h-7 rounded-[2px] transition-colors duration-200 ${isSelected ? 'bg-[#D07352]' : 'bg-[#D1C9BE]'}`} />
                      </div>
                    </div>
                    <span className={`text-xs sm:text-sm font-medium transition-colors ${isSelected ? 'text-[#B85532] font-semibold' : 'text-[#1C1A17]'}`}>
                      {tmpl.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-white border border-[#EAE6DF] rounded-2xl p-4 sm:p-5 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-3.5">
            <h2 className="text-[11px] font-semibold text-[#8C847C] tracking-wider uppercase">APPEARANCE</h2>
            <div className="space-y-3.5 pt-1">
              <div className="flex items-center justify-between py-0.5">
                <span className="text-sm font-medium text-[#1C1A17]">Typography</span>
                <div className="inline-flex items-center bg-[#F4F1EB] p-1 rounded-full border border-[#ECE8E0]">
                  <button onClick={() => { setTypography('serif'); setSettings({ typography: 'serif' }); }} className={`px-4 py-1 rounded-full text-xs transition-all font-serif cursor-pointer ${typography === 'serif' ? 'bg-white text-[#1C1A17] font-semibold shadow-xs' : 'text-[#7A756D] hover:text-[#1C1A17]'}`}>
                    Serif
                  </button>
                  <button onClick={() => { setTypography('sans'); setSettings({ typography: 'sans' }); }} className={`px-4 py-1 rounded-full text-xs transition-all font-sans cursor-pointer ${typography === 'sans' ? 'bg-white text-[#1C1A17] font-semibold shadow-xs' : 'text-[#7A756D] hover:text-[#1C1A17]'}`}>
                    Sans
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between py-0.5">
                <span className="text-sm font-medium text-[#1C1A17]">Colors</span>
                <div className="flex items-center gap-2.5">
                  {(['terracotta', 'sage', 'charcoal'] as ColorOption[]).map((col) => {
                    const isColSelected = colorScheme === col;
                    const palette = COLOR_PALETTES[col];
                    return (
                      <button
                        key={col}
                        onClick={() => {
                          setColorScheme(col);
                          setSettings({ colorPalette: col, accent: palette.swatchHex });
                        }}
                        title={palette.name}
                        style={{ backgroundColor: palette.swatchHex }}
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full cursor-pointer transition-all duration-200 relative ${isColSelected ? 'ring-2 ring-offset-2 ring-[#1C1A17] scale-105 shadow-xs' : 'hover:scale-105 opacity-85 hover:opacity-100'}`}
                      />
                    );
                  })}
                  <input
                    aria-label="Custom accent color"
                    title="Custom accent"
                    type="color"
                    value={customAccent ?? activePalette.swatchHex}
                    onChange={(e) => {
                      const v = e.target.value;
                      setCustomAccent(v);
                      try {
                        localStorage.setItem('pc:accent', v);
                      } catch (err) {}
                      setSettings({ accent: v });
                    }}
                    className="w-8 h-8 rounded-full border-none p-0 cursor-pointer"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between py-0.5">
                <span className="text-sm font-medium text-[#1C1A17]">Spacing</span>
                <div className="inline-flex items-center bg-[#F4F1EB] p-1 rounded-full border border-[#ECE8E0]">
                  <button onClick={() => { setSpacing('compact'); setSettings({ spacing: 'compact' }); }} className={`px-3 py-1 rounded-full text-xs transition-all cursor-pointer ${spacing === 'compact' ? 'bg-white text-[#1C1A17] font-semibold shadow-xs' : 'text-[#7A756D] hover:text-[#1C1A17]'}`}>Compact</button>
                  <button onClick={() => { setSpacing('comfortable'); setSettings({ spacing: 'comfortable' }); }} className={`px-3.5 py-1 rounded-full text-xs transition-all cursor-pointer ${spacing === 'comfortable' ? 'bg-white text-[#1C1A17] font-semibold shadow-xs' : 'text-[#7A756D] hover:text-[#1C1A17]'}`}>Comfortable</button>
                  <button onClick={() => { setSpacing('airy'); setSettings({ spacing: 'airy' }); }} className={`px-3 py-1 rounded-full text-xs transition-all cursor-pointer ${spacing === 'airy' ? 'bg-white text-[#1C1A17] font-semibold shadow-xs' : 'text-[#7A756D] hover:text-[#1C1A17]'}`}>Airy</button>
                </div>
              </div>

              <div className="flex items-center justify-between py-0.5">
                <span className="text-sm font-medium text-[#1C1A17]">Buttons</span>
                <div className="inline-flex items-center bg-[#F4F1EB] p-1 rounded-full border border-[#ECE8E0]">
                  <button onClick={() => setButtonStyle('border')} className={`px-4 py-1 rounded-full text-xs transition-all cursor-pointer ${buttonStyle === 'border' ? 'bg-white text-[#1C1A17] font-semibold shadow-xs' : 'text-[#7A756D] hover:text-[#1C1A17]'}`}>Border</button>
                  <button onClick={() => setButtonStyle('fill')} className={`px-4 py-1 rounded-full text-xs transition-all cursor-pointer ${buttonStyle === 'fill' ? 'bg-white text-[#1C1A17] font-semibold shadow-xs' : 'text-[#7A756D] hover:text-[#1C1A17]'}`}>Fill</button>
                </div>
              </div>

              <div className="flex items-center justify-between py-0.5">
                <span className="text-sm font-medium text-[#1C1A17]">Corners</span>
                <div className="inline-flex items-center bg-[#F4F1EB] p-1 rounded-full border border-[#ECE8E0]">
                  <button onClick={() => setButtonRadius('sharp')} className={`px-3 py-1 rounded-full text-xs transition-all cursor-pointer ${buttonRadius === 'sharp' ? 'bg-white text-[#1C1A17] font-semibold shadow-xs' : 'text-[#7A756D] hover:text-[#1C1A17]'}`}>Sharp</button>
                  <button onClick={() => setButtonRadius('rounded')} className={`px-3 py-1 rounded-full text-xs transition-all cursor-pointer ${buttonRadius === 'rounded' ? 'bg-white text-[#1C1A17] font-semibold shadow-xs' : 'text-[#7A756D] hover:text-[#1C1A17]'}`}>Rounded</button>
                  <button onClick={() => setButtonRadius('pill')} className={`px-3 py-1 rounded-full text-xs transition-all cursor-pointer ${buttonRadius === 'pill' ? 'bg-white text-[#1C1A17] font-semibold shadow-xs' : 'text-[#7A756D] hover:text-[#1C1A17]'}`}>Pill</button>
                </div>
              </div>

              <div className="flex items-center justify-between py-0.5">
                <span className="text-sm font-medium text-[#1C1A17]">Canvas Tone</span>
                <div className="inline-flex items-center bg-[#F4F1EB] p-1 rounded-full border border-[#ECE8E0]">
                  <button onClick={() => { setCanvasTone('bone'); setSettings({ darkMode: false }); }} className={`px-2.5 py-1 rounded-full text-xs transition-all cursor-pointer ${canvasTone === 'bone' ? 'bg-white text-[#1C1A17] font-semibold shadow-xs' : 'text-[#7A756D] hover:text-[#1C1A17]'}`}>Bone</button>
                  <button onClick={() => { setCanvasTone('linen'); setSettings({ darkMode: false }); }} className={`px-2.5 py-1 rounded-full text-xs transition-all cursor-pointer ${canvasTone === 'linen' ? 'bg-white text-[#1C1A17] font-semibold shadow-xs' : 'text-[#7A756D] hover:text-[#1C1A17]'}`}>Linen</button>
                  <button onClick={() => { setCanvasTone('basalt'); setSettings({ darkMode: true }); }} className={`px-2.5 py-1 rounded-full text-xs transition-all cursor-pointer ${canvasTone === 'basalt' ? 'bg-[#1C1A17] text-white font-semibold shadow-xs' : 'text-[#7A756D] hover:text-[#1C1A17]'}`}>Basalt</button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#EAE6DF] rounded-2xl p-4 sm:p-5 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-[11px] font-semibold text-[#8C847C] tracking-wider uppercase">IDENTITY & DOMAIN</h2>
              <span className="material-symbols-outlined text-[17px] text-emerald-700">verified</span>
            </div>
            <div>
              <label className="text-[10px] font-mono text-[#716E68] uppercase tracking-wider block mb-1.5">
                Live Sovereign URL
              </label>
              <div className="flex items-center bg-[#FAF8F5] border border-[#E7E4DF] px-3 py-2 rounded-lg">
                <span className="font-mono text-xs text-[#716E68]">atelier.art/</span>
                <input
                  type="text"
                  defaultValue="@elenavance"
                  className="bg-transparent font-mono text-xs text-[#141413] font-semibold outline-none flex-1"
                />
                <span className="font-mono text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-sm font-semibold">
                  LIVE
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 xl:col-span-8 bg-[#F3EFE9] p-4 lg:p-8 flex flex-col items-center justify-start overflow-y-auto min-h-[calc(100vh-7rem)] transition-all duration-300">
          <div
            className="transition-all duration-300 border border-[#E0DBD2] shadow-xl bg-white w-full rounded-xl overflow-hidden preview-card"
            style={{
              maxWidth: viewportMode === 'mobile' ? '390px' : viewportMode === 'tablet' ? '768px' : '100%',
            }}
          >
            {settings.showHeader && (
              <div className="h-10 bg-[#FAF8F5] border-b border-[#E7E4DF] px-4 flex items-center justify-between select-none">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E2DDD5]"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E2DDD5]"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E2DDD5]"></span>
                  <span className="h-3.5 w-px bg-[#E7E4DF] mx-1"></span>
                  <span className="material-symbols-outlined text-[15px] text-[#716E68]">lock</span>
                  <span className="font-mono text-[11px] text-[#141413] font-medium">
                    atelier.art/@elenavance?template={template}&preview=draft_v2
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] text-[#716E68] uppercase tracking-widest hidden sm:inline">
                    {typography} · {colorScheme} · {spacing}
                  </span>
                </div>
              </div>
            )}

            <div
              className={`${canvasBgClass} ${spacingStyles.container} transition-all duration-300`}
              style={{ filter: settings.imageFilter }}
            >
              {settings.showHeader ? (
                <div className="border-b border-[#E7E4DF]/80 pb-5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
                  <div className="flex items-baseline gap-3">
                    <span
                      className={`text-2xl font-bold tracking-tight ${
                        typography === 'serif' ? 'font-serif' : 'font-sans'
                      } ${canvasTone === 'basalt' ? 'text-white' : 'text-[#141413]'}`}
                    >
                      Elena Vance
                    </span>
                    <span className="font-mono text-[10px] text-[#716E68] uppercase tracking-widest">
                      {template === 'studio' ? 'Atelier Ledger & Specs' : 'Atelier Monograph'}
                    </span>
                  </div>
                  <nav className="flex items-center gap-5 sm:gap-6 text-xs">
                    <a
                      href="#works"
                      className="font-semibold pb-0.5 border-b-2"
                      style={{ borderColor: activeAccent, color: activeAccent }}
                    >
                      Works (34)
                    </a>
                    <a
                      href="#collections"
                      className={`transition-colors ${
                        canvasTone === 'basalt' ? 'text-stone-400 hover:text-white' : 'text-[#716E68] hover:text-[#141413]'
                      }`}
                    >
                      Collections
                    </a>
                    <a
                      href="#bio"
                      className={`transition-colors ${
                        canvasTone === 'basalt' ? 'text-stone-400 hover:text-white' : 'text-[#716E68] hover:text-[#141413]'
                      }`}
                    >
                      Monograph
                    </a>
                    <button
                      className={`px-3 py-1 font-mono text-[11px] uppercase tracking-wider transition-all cursor-pointer ${buttonRadiusClass}`}
                      style={
                        buttonStyle === 'fill'
                          ? { backgroundColor: activeAccent, color: '#FFFFFF' }
                          : { border: `1.5px solid ${activeAccent}`, color: activeAccent }
                      }
                    >
                      Commission
                    </button>
                  </nav>
                </div>
              ) : null}

              {/* DYNAMIC CONTENT PER TEMPLATE */}

              {/* 1. ARTISTIC TEMPLATE (Selected in user image) */}
              {template === 'artistic' && (
                <div className={spacingStyles.sectionGap}>
                  {/* Organic Hero */}
                  <div className={`grid grid-cols-1 lg:grid-cols-12 ${spacingStyles.heroGap} items-center`}>
                    <div className="lg:col-span-7 space-y-4">
                      <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-mono" style={{ backgroundColor: activePalette.tagBg, color: activePalette.tagText }}>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: activePalette.accent }}></span>
                        <span>Ceramic Sculptor · Zürich & Kyoto</span>
                      </div>
                      <h2
                        className={`text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.1] ${
                          typography === 'serif' ? 'font-serif italic' : 'font-sans font-bold'
                        } ${canvasTone === 'basalt' ? 'text-white' : 'text-[#141413]'}`}
                      >
                        Investigating geological fractures & unglazed volcanic stoneware.
                      </h2>
                      <p className={`text-sm leading-relaxed max-w-xl ${canvasTone === 'basalt' ? 'text-stone-300' : 'text-[#615C56]'}`}>
                        Sculptural artifacts born from high-temperature wood kilns. Each monolith interrogates tectonic tension, mineral shrinkage, and the silent permanence of physical earth.
                      </p>
                      <div className="pt-2 flex items-center gap-4">
                        <button
                          className={`px-5 py-2.5 text-xs uppercase tracking-wider font-medium shadow-xs transition-all cursor-pointer ${buttonRadiusClass}`}
                          style={
                            buttonStyle === 'fill'
                              ? { backgroundColor: activeAccent, color: '#FFFFFF' }
                              : { border: `2px solid ${activeAccent}`, color: activeAccent }
                          }
                        >
                          Acquire Catalog
                        </button>
                        <span className="font-mono text-xs text-[#716E68]">Accepting 2 Private Commissions</span>
                      </div>
                    </div>

                    <div className="lg:col-span-5">
                      <div className={`p-4 rounded-2xl border transition-all preview-card ${canvasTone === 'basalt' ? 'bg-[#242322] border-stone-800' : 'bg-white border-[#EAE6DF]'}`}>
                        <div className="aspect-[4/5] overflow-hidden rounded-xl relative">
                          <img
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDX4-IMJs6sRHxl9Nfv-gtMKZf6RIxHTIzwNKTmCR1xsXY3Z1GNgIN6HmYrs1I0Q7wM9gXq4_-CQ0m1eeexY-q6YmuQcjzGV4TcAIv4BosgnJK2EyjBkRe4mhJ6P6tbkkkfa1HebktnpXbR_FRySlDJcsC7oxiUID8OxrfcNvpzvXgz49c6Dt0l6t8XCvoCD0NHu27k8CTZLWYORqt9REn8AwMQeROphbdWR2CwRmOnxKnDxMWxsdGemA"
                            alt="Tectonic Vessel"
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded-sm font-mono text-[10px] text-white bg-black/60 backdrop-blur-xs">
                            Masterwork IV
                          </span>
                        </div>
                        <div className="pt-3 flex justify-between items-center text-xs">
                          <span className="font-serif italic font-medium">Tectonic Vessel No. 04</span>
                          <span className="font-mono text-[#716E68]">1320°C Anagama</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Curated Grid */}
                  <div className={`grid grid-cols-1 md:grid-cols-3 ${spacingStyles.gridGap}`}>
                    {[
                      {
                        title: 'Strata Monolith IX',
                        year: '2024',
                        desc: 'Coarse Chamotte & Ash',
                        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfpcvJIiJqG-61uu2eZzkd-p7joH3nu1pR4OJJIV9YgWhOwLv0T9bJ_qMFiilDALU0uE2Y8-C-rxDm5JGipt7B7qGYcIPO4N7Z0hExdku7JA3S5PVs3yWnBt6mi7Odbpif0cz_LzIuGf4uh5wlfumfy-HCiZbITrze-heFJtDNuh0u-SkCaKN2_Z-rp4Y5eSxNAz9czuVNVEzKMBbIeVzaHpn1exfY1yH_tyVizctSQFJ0yPB9dSyA7w',
                      },
                      {
                        title: 'Caldera Relic 02',
                        year: '2024',
                        desc: 'Volcanic Porous Clay',
                        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMleKXqqQAXw99rnEONi9Rejyrm8vV1ATgfO6q1GExwKDlJO9lpSz8WN5mzcnRwimlbi7diVuKNMdQmELNpdV3vy1apiD68Qa7W-R_fMTxqiGwZavvhGmI6nLmDUgvCbVmpQDgfsJmFXTkgtLbq8V0wBSa7L3WXbCDSUjNPhxodL61FJc2AVlR3YbG9v7ILj9aCQX2SJ02HFaikXH3YSNJY7-7SzPYMGGiHo_DiNY8wxJdTNn5MTvVGQ',
                      },
                      {
                        title: 'Basaltic Fissure VII',
                        year: '2023',
                        desc: 'Reduced Iron Slip',
                        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDha1TzoOkLMLpC_Bs7xc7KfYol24S6Ozc4T_tILVTNXWd1gJMy-YCCGDNR81oSa67kPy8pmJeFcltIIXNq695dXm4t_l1MACK4MtgfbNGK8lh7B-Fuv4EdWZgMpa68X92X6c_Bvg5_CwsotT4UuE-POB_NYuijoPFFC-ILSD-hW_c2sWFqfpHMsb5RxFG3ODsN-VI6GDrd8-xM8geSl8ib4XETj5RSMQ62xAOPKzobR0Ms3cacjNzrUA',
                      },
                    ].map((work, idx) => (
                      <div key={idx} className={`p-3.5 rounded-xl border preview-card ${canvasTone === 'basalt' ? 'bg-[#222120] border-stone-800' : 'bg-white border-[#EAE6DF]'}`}>
                        <div className="aspect-square rounded-lg overflow-hidden mb-3">
                          <img
                            src={work.img}
                            alt={work.title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex justify-between items-baseline">
                          <h4 className={`text-sm font-medium ${typography === 'serif' ? 'font-serif' : 'font-sans'}`}>{work.title}</h4>
                          <span className="font-mono text-[11px] text-[#716E68]">{work.year}</span>
                        </div>
                        <p className="font-mono text-[11px] text-[#716E68] mt-0.5">{work.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 2. MINIMAL TEMPLATE */}
              {template === 'minimal' && (
                <div className={spacingStyles.sectionGap}>
                  <div className="max-w-2xl mx-auto text-center space-y-4 pt-4">
                    <span className="font-mono text-[10px] tracking-widest uppercase text-[#716E68]">Studio Monograph</span>
                    <h2
                      className={`text-3xl sm:text-4xl tracking-tight ${
                        typography === 'serif' ? 'font-serif' : 'font-sans font-light tracking-wide'
                      }`}
                    >
                      Geological Ceramics & Tectonic Stoneware
                    </h2>
                    <p className={`text-xs leading-relaxed max-w-md mx-auto ${canvasTone === 'basalt' ? 'text-stone-400' : 'text-[#716E68]'}`}>
                      Quiet reduction firings, natural wood ash, and raw mineral compositions. Handcrafted between Zürich and Kyoto.
                    </p>
                  </div>
                </div>
              )}

              {/* 3. EDITORIAL TEMPLATE */}
              {template === 'editorial' && (
                <div className={spacingStyles.sectionGap}>
                  <div className={`grid grid-cols-1 lg:grid-cols-12 ${spacingStyles.heroGap} items-end pt-2`}>
                    <div className="lg:col-span-8 space-y-4">
                      <span className="font-mono text-[10px] bg-[#141413] text-white px-2 py-0.5 tracking-widest uppercase">
                        Ceramic Sculptor · Zürich & Kyoto
                      </span>
                      <h2
                        className={`text-3xl sm:text-5xl tracking-tight leading-[1.08] ${
                          typography === 'serif' ? 'font-serif' : 'font-sans font-bold'
                        } ${canvasTone === 'basalt' ? 'text-white' : 'text-[#141413]'}`}
                      >
                        Investigating geological fractures, thermal vitrification, and unglazed volcanic stoneware.
                      </h2>
                    </div>
                    <div className="lg:col-span-4 space-y-3 lg:border-l lg:border-[#E7E4DF] lg:pl-6">
                      <p className={`text-xs sm:text-sm leading-relaxed ${canvasTone === 'basalt' ? 'text-stone-300' : 'text-[#716E68]'}`}>
                        Sculptural artifacts born from high-temperature wood kilns. Each monolith interrogates tectonic tension, mineral shrinkage, and the silent permanence of physical earth.
                      </p>
                      <button
                        className={`px-4 py-2 text-xs uppercase tracking-wider font-medium cursor-pointer ${buttonRadiusClass}`}
                        style={
                          buttonStyle === 'fill'
                            ? { backgroundColor: activePalette.accent, color: '#FFFFFF' }
                            : { border: `1.5px solid ${activePalette.accent}`, color: activePalette.accent }
                        }
                      >
                        Commission Brief →
                      </button>
                    </div>
                  </div>

                  {/* Featured Monolith */}
                  <div className={`p-6 sm:p-8 space-y-6 border ${canvasTone === 'basalt' ? 'bg-[#222120] border-white/10' : 'bg-white border-[#E7E4DF]'}`}>
                    <div className="flex items-center justify-between border-b border-[#E7E4DF] pb-3">
                      <span className="font-mono text-[10px] uppercase font-semibold" style={{ color: activePalette.accent }}>
                        Featured Masterwork · INV #EV-2024-004
                      </span>
                      <span className="font-mono text-[10px] px-2 py-0.5 border border-[#E7E4DF]">Verified Archival</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                      <div className="md:col-span-7 overflow-hidden">
                        <img
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDX4-IMJs6sRHxl9Nfv-gtMKZf6RIxHTIzwNKTmCR1xsXY3Z1GNgIN6HmYrs1I0Q7wM9gXq4_-CQ0m1eeexY-q6YmuQcjzGV4TcAIv4BosgnJK2EyjBkRe4mhJ6P6tbkkkfa1HebktnpXbR_FRySlDJcsC7oxiUID8OxrfcNvpzvXgz49c6Dt0l6t8XCvoCD0NHu27k8CTZLWYORqt9REn8AwMQeROphbdWR2CwRmOnxKnDxMWxsdGemA"
                          alt="Tectonic Vessel No. 04"
                          className="w-full aspect-[4/3] object-cover"
                        />
                      </div>
                      <div className="md:col-span-5 space-y-3">
                        <h3 className={`text-2xl tracking-tight ${typography === 'serif' ? 'font-serif' : 'font-sans font-bold'}`}>
                          Tectonic Vessel No. 04
                        </h3>
                        <p className="font-serif italic text-xs text-[#716E68]">Wood-Fired Anagama Stoneware, 1320°C</p>
                        <div className="py-2 border-y border-[#E7E4DF] font-mono text-[11px] space-y-1 text-[#716E68]">
                          <div className="flex justify-between">
                            <span>Dimensions</span>
                            <span className="text-[#141413]">48 × 32 × 30 cm</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Status</span>
                            <span style={{ color: activePalette.accent }}>Available for Acquisition</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 4. GALLERY TEMPLATE */}
              {template === 'gallery' && (
                <div className={spacingStyles.sectionGap}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E7E4DF]">
                    <div>
                      <h2 className={`text-2xl ${typography === 'serif' ? 'font-serif' : 'font-sans font-bold'}`}>Exhibition Catalog: 2023–2025</h2>
                      <p className="font-mono text-xs text-[#716E68]">Curated Series · 34 Verified Works</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-mono text-xs px-2.5 py-1 bg-[#141413] text-white rounded-sm">All Works (34)</span>
                      <span className="font-mono text-xs px-2.5 py-1 border border-[#E7E4DF] rounded-sm text-[#716E68]">Available (9)</span>
                    </div>
                  </div>

                  <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ${spacingStyles.gridGap}`}>
                    {[
                      { title: 'Tectonic Vessel No. 04', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDX4-IMJs6sRHxl9Nfv-gtMKZf6RIxHTIzwNKTmCR1xsXY3Z1GNgIN6HmYrs1I0Q7wM9gXq4_-CQ0m1eeexY-q6YmuQcjzGV4TcAIv4BosgnJK2EyjBkRe4mhJ6P6tbkkkfa1HebktnpXbR_FRySlDJcsC7oxiUID8OxrfcNvpzvXgz49c6Dt0l6t8XCvoCD0NHu27k8CTZLWYORqt9REn8AwMQeROphbdWR2CwRmOnxKnDxMWxsdGemA', status: 'Available' },
                      { title: 'Strata Monolith IX', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfpcvJIiJqG-61uu2eZzkd-p7joH3nu1pR4OJJIV9YgWhOwLv0T9bJ_qMFiilDALU0uE2Y8-C-rxDm5JGipt7B7qGYcIPO4N7Z0hExdku7JA3S5PVs3yWnBt6mi7Odbpif0cz_LzIuGf4uh5wlfumfy-HCiZbITrze-heFJtDNuh0u-SkCaKN2_Z-rp4Y5eSxNAz9czuVNVEzKMBbIeVzaHpn1exfY1yH_tyVizctSQFJ0yPB9dSyA7w', status: 'Available' },
                      { title: 'Caldera Relic 02', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMleKXqqQAXw99rnEONi9Rejyrm8vV1ATgfO6q1GExwKDlJO9lpSz8WN5mzcnRwimlbi7diVuKNMdQmELNpdV3vy1apiD68Qa7W-R_fMTxqiGwZavvhGmI6nLmDUgvCbVmpQDgfsJmFXTkgtLbq8V0wBSa7L3WXbCDSUjNPhxodL61FJc2AVlR3YbG9v7ILj9aCQX2SJ02HFaikXH3YSNJY7-7SzPYMGGiHo_DiNY8wxJdTNn5MTvVGQ', status: 'Acquired' },
                      { title: 'Lithic Fragment I', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDha1TzoOkLMLpC_Bs7xc7KfYol24S6Ozc4T_tILVTNXWd1gJMy-YCCGDNR81oSa67kPy8pmJeFcltIIXNq695dXm4t_l1MACK4MtgfbNGK8lh7B-Fuv4EdWZgMpa68X92X6c_Bvg5_CwsotT4UuE-POB_NYuijoPFFC-ILSD-hW_c2sWFqfpHMsb5RxFG3ODsN-VI6GDrd8-xM8geSl8ib4XETj5RSMQ62xAOPKzobR0Ms3cacjNzrUA', status: 'Available' },
                    ].map((item, i) => (
                      <div key={i} className={`border p-3 rounded-lg ${canvasTone === 'basalt' ? 'bg-[#222120] border-stone-800' : 'bg-white border-[#E7E4DF]'}`}>
                        <div className="aspect-[4/5] overflow-hidden mb-3 rounded-sm">
                          <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex justify-between items-center pt-1">
                          <h4 className="text-xs font-semibold">{item.title}</h4>
                          <span
                            className="font-mono text-[10px] px-1.5 py-0.5 rounded-sm"
                            style={item.status === 'Available' ? { backgroundColor: activePalette.tagBg, color: activePalette.tagText } : { backgroundColor: '#EFECE8', color: '#716E68' }}
                          >
                            {item.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 5. STUDIO TEMPLATE */}
              {template === 'studio' && (
                <div className={spacingStyles.sectionGap}>
                  <div className="border border-[#141413] p-6 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#141413] pb-3">
                      <div>
                        <span className="font-mono text-[10px] uppercase tracking-widest text-[#716E68]">Studio Specifications</span>
                        <h2 className={`text-2xl ${typography === 'serif' ? 'font-serif' : 'font-sans font-bold'}`}>Atelier Vance · Technical Ledger</h2>
                      </div>
                      <span className="font-mono text-xs text-[#716E68]">Coordinates: 47.3769° N, 8.5417° E</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
                      <div>
                        <span className="text-[#716E68] block text-[10px]">Kiln Apparatus</span>
                        <span className="font-semibold">Split Anagama 4.2m³</span>
                      </div>
                      <div>
                        <span className="text-[#716E68] block text-[10px]">Peak Firing</span>
                        <span className="font-semibold">1340°C Orton Cone 12</span>
                      </div>
                      <div>
                        <span className="text-[#716E68] block text-[10px]">Primary Body</span>
                        <span className="font-semibold">Shigaraki High-Silica</span>
                      </div>
                      <div>
                        <span className="text-[#716E68] block text-[10px]">Atmosphere</span>
                        <span className="font-semibold">Heavy Wood Reduction</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border border-[#E7E4DF] p-4 bg-white space-y-3">
                      <div className="aspect-video overflow-hidden">
                        <img
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDX4-IMJs6sRHxl9Nfv-gtMKZf6RIxHTIzwNKTmCR1xsXY3Z1GNgIN6HmYrs1I0Q7wM9gXq4_-CQ0m1eeexY-q6YmuQcjzGV4TcAIv4BosgnJK2EyjBkRe4mhJ6P6tbkkkfa1HebktnpXbR_FRySlDJcsC7oxiUID8OxrfcNvpzvXgz49c6Dt0l6t8XCvoCD0NHu27k8CTZLWYORqt9REn8AwMQeROphbdWR2CwRmOnxKnDxMWxsdGemA"
                          alt="Kiln load"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="font-mono text-[11px] text-[#716E68] block">Log #491 · Unloading chamber 2 after 96-hour wood firing cycle.</span>
                    </div>

                    <div className="border border-[#E7E4DF] p-4 bg-white space-y-3">
                      <div className="aspect-video overflow-hidden">
                        <img
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfpcvJIiJqG-61uu2eZzkd-p7joH3nu1pR4OJJIV9YgWhOwLv0T9bJ_qMFiilDALU0uE2Y8-C-rxDm5JGipt7B7qGYcIPO4N7Z0hExdku7JA3S5PVs3yWnBt6mi7Odbpif0cz_LzIuGf4uh5wlfumfy-HCiZbITrze-heFJtDNuh0u-SkCaKN2_Z-rp4Y5eSxNAz9czuVNVEzKMBbIeVzaHpn1exfY1yH_tyVizctSQFJ0yPB9dSyA7w"
                          alt="Mineral slip"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="font-mono text-[11px] text-[#716E68] block">Log #492 · Ash vitrification layer on unglazed coarse chamotte stoneware.</span>
                    </div>
                  </div>
                </div>
              )}

              {/* 6. FRIEZE TEMPLATE */}
              {template === 'frieze' && (
                <div className={spacingStyles.sectionGap}>
                  <div className="border-b border-[#141413] pb-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[10px] bg-[#A23B3B] text-white px-2 py-0.5 uppercase tracking-wider font-semibold">
                        Frieze Collector Ledger
                      </span>
                      <span className="font-mono text-xs text-[#716E68]">Primary Market Accession</span>
                    </div>
                    <h2 className={`text-4xl sm:text-5xl tracking-tight ${typography === 'serif' ? 'font-serif' : 'font-sans font-bold'}`}>
                      Contemporary Blue-Chip Monograph
                    </h2>
                    <p className="font-sans text-sm text-[#716E68] max-w-2xl leading-relaxed">
                      Museum-grade whitespace, verified provenance chain, acquisition-first storytelling, and curatorial footnotes.
                    </p>
                  </div>
                  <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ${spacingStyles.gridGap}`}>
                    {[
                      { title: 'Lithic Monolith I', tag: 'Acquisition Reserve', price: '$24,000' },
                      { title: 'Tectonic Vessel IV', tag: 'Available', price: '$18,500' },
                      { title: 'Caldera Form 02', tag: 'Institution Held', price: '$32,000' },
                    ].map((item, idx) => (
                      <div key={idx} className="border border-[#E7E4DF] p-4 bg-white space-y-3">
                        <div className="aspect-[3/4] bg-neutral-100 flex items-center justify-center font-mono text-xs text-[#716E68]">
                          Artwork {idx + 1}
                        </div>
                        <div className="flex justify-between items-baseline">
                          <h4 className="font-serif font-bold text-sm">{item.title}</h4>
                          <span className="font-mono text-xs font-semibold text-[#A23B3B]">{item.price}</span>
                        </div>
                        <span className="font-mono text-[10px] px-2 py-0.5 bg-[#FAF8F5] border border-[#E7E4DF] block w-fit">
                          {item.tag}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 7. SOTHEBY'S TEMPLATE */}
              {template === 'sothebys' && (
                <div className={spacingStyles.sectionGap}>
                  <div className="border border-[#002147] p-6 bg-[#FCFCFB] space-y-4">
                    <div className="flex items-center justify-between border-b border-[#002147]/20 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#002147]" />
                        <span className="font-mono text-xs font-bold text-[#002147] uppercase tracking-widest">Sotheby's Auction Registry</span>
                      </div>
                      <span className="font-mono text-[10px] text-[#716E68]">Archival Lot Verification</span>
                    </div>
                    <h2 className="font-serif text-3xl text-[#002147]">Secondary Market Provenance & Historical Lots</h2>
                    <p className="font-sans text-xs text-[#716E68] max-w-xl">
                      Cryptographic authentication, public institutional ledger records, and private acquisition lounge.
                    </p>
                  </div>
                </div>
              )}

              {/* 8. KINFOLK TEMPLATE */}
              {template === 'kinfolk' && (
                <div className={spacingStyles.sectionGap}>
                  <div className="p-8 bg-[#F3EEE7] border border-[#DDD4C7] space-y-4 text-center max-w-2xl mx-auto">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#7D6E5A]">Artisan Studio Catalogue</span>
                    <h2 className="font-serif text-3xl sm:text-4xl text-[#3F3B37]">The Slow Hand & Earth</h2>
                    <p className="font-sans text-xs sm:text-sm text-[#7D6E5A] leading-relaxed">
                      Tactile organic storytelling, kiln logs, and mindful small-batch collections made with regional stoneware.
                    </p>
                  </div>
                </div>
              )}

              {/* 9. MUJI TEMPLATE */}
              {template === 'muji' && (
                <div className={spacingStyles.sectionGap}>
                  <div className="border border-[#1D1D1D] p-5 space-y-3 font-mono text-xs bg-[#F8F5F0]">
                    <div className="flex justify-between items-center border-b border-[#1D1D1D] pb-2">
                      <span className="font-bold text-sm tracking-tight text-[#1D1D1D]">MUJI DESIGN LEDGER</span>
                      <span className="text-[10px] text-[#5C4632]">NO-BRAND QUALITY GOODS</span>
                    </div>
                    <p className="text-[11px] text-[#5C4632]">
                      Pure functional minimalism: dimensions, materials, tolerances, and essential studio artifacts.
                    </p>
                  </div>
                </div>
              )}

              {/* 10. ATELIER TEMPLATE */}
              {template === 'atelier' && (
                <div className={spacingStyles.sectionGap}>
                  <div className="border border-[#8C6239] p-6 bg-[#FFFDF8] space-y-3">
                    <span className="font-mono text-[10px] text-[#8C6239] uppercase tracking-widest block">Atelier Dossier</span>
                    <h2 className="font-serif italic text-3xl text-[#2D2A26]">Bespoke Studio Commission Showcase</h2>
                    <p className="font-sans text-xs text-[#716E68] max-w-xl">
                      Private viewing rooms, direct patron dialogues, and handcrafted monolith architectural commissions.
                    </p>
                  </div>
                </div>
              )}

              {/* 11. OBSIDIAN DARK TEMPLATE */}
              {template === 'obsidian' && (
                <div className={spacingStyles.sectionGap}>
                  <div className="border border-[#262624] p-6 bg-[#0D0D0C] text-[#F3F0EA] space-y-4">
                    <div className="flex items-center justify-between border-b border-[#262624] pb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest font-semibold">Obsidian Monolith Vault</span>
                      </div>
                      <span className="font-mono text-[10px] text-stone-400">#NODE-VAULT-01</span>
                    </div>
                    <h2 className="font-sans font-bold text-3xl text-white">Ultra-Dark Brutalist Catalog & Telemetry</h2>
                    <p className="font-mono text-xs text-stone-400 max-w-xl leading-relaxed">
                      Pitch-black obsidian void, high-contrast luminescent telemetry, cryptographic provenance validation, and severe museum typography.
                    </p>
                  </div>
                </div>
              )}

              {/* 12. NOCTURNE DARK TEMPLATE */}
              {template === 'nocturne' && (
                <div className={spacingStyles.sectionGap}>
                  <div className="border border-[#1E293B] p-6 bg-[#0B111E] text-[#E8EDF5] space-y-4">
                    <div className="flex items-center justify-between border-b border-[#1E293B] pb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]" />
                        <span className="font-mono text-xs text-[#D4AF37] uppercase tracking-widest font-bold">Nocturne Gilded Salon</span>
                      </div>
                      <span className="font-mono text-[10px] text-slate-400">Midnight Private Gallery</span>
                    </div>
                    <h2 className="font-serif text-3xl text-white">Nocturnal Gilded Provenance & Archival Salon</h2>
                    <p className="font-sans text-xs text-slate-400 max-w-xl leading-relaxed">
                      Deep Prussian midnight ground, gilded gold provenance seals, nocturnal atmospheric lighting, and high-prestige private viewing rooms.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PortfolioCustomizer;
