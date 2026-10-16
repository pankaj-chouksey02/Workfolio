"use client";

import React, { useState } from 'react';

interface LandingScreenProps {
  onNavigate: (path: string) => void;
}

export default function LandingScreen({ onNavigate }: LandingScreenProps) {
  const [handle, setHandle] = useState('');
  const [claimed, setClaimed] = useState(false);
  const [activeLayout, setActiveLayout] = useState<'editorial' | 'gallery' | 'masonry'>('editorial');
  const [commissionOpen, setCommissionOpen] = useState(false);
  const [briefSubmitted, setBriefSubmitted] = useState(false);

  const handleClaimSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (handle.trim()) {
      setClaimed(true);
    }
  };

  return (
    <div className="flex flex-col w-full bg-[#FAF8F5] text-[#1B1C1A]">
      {/* SECTION 1: EDITORIAL HERO & HANDLE RESERVATION */}
      <section className="relative w-full max-w-[1440px] mx-auto px-5 md:px-12 lg:px-16 pt-6 lg:pt-12 pb-16 overflow-hidden">
        {/* Architectural subtle backdrop glow */}
        <div className="absolute -top-32 right-12 w-96 h-96 rounded-full bg-[#9a4023]/5 blur-3xl pointer-events-none -z-10"></div>
        <div className="absolute top-1/2 -left-20 w-80 h-80 rounded-full bg-[#C25E3E]/5 blur-3xl pointer-events-none -z-10"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Typography & Action */}
          <div className="lg:col-span-7 flex flex-col justify-start space-y-6">
            {/* Eyebrow Tag */}
            <div className="inline-flex items-center gap-2">
              <span className="w-2 h-2 bg-[#C25E3E]"></span>
              <span className="font-mono text-[10px] uppercase text-[#C25E3E] tracking-widest font-medium">The Editorial Portfolio Platform</span>
              <span className="text-[#716E68] font-mono text-xs">/ MONOGRAPH PROTOCOL 2024</span>
            </div>

            {/* Main Display Headline */}
            <h1 className="font-serif text-5xl sm:text-6xl text-[#141413] tracking-tight leading-[1.08] max-w-2xl">
              Your talent<br />
              <span className="italic font-normal text-[#56423d]">deserves</span> its own space.
            </h1>

            {/* Subheadline */}
            <p className="font-sans text-lg text-[#5f5e5d] max-w-xl font-normal leading-relaxed pt-1">
              Build a beautiful portfolio that showcases your work, tells your story, and helps people discover what you do — all through one shareable link.
            </p>

            {/* Inline Handle Claim Widget */}
            <div className="pt-2 pb-1">
              <div className="bg-white p-4 sm:p-6 shadow-md max-w-xl border border-[#E7E4DF]">
                <span className="block font-mono text-[10px] uppercase text-[#716E68] tracking-wider mb-2">Claim your sovereign archival url</span>
                <form onSubmit={handleClaimSubmit} className="flex flex-col sm:flex-row items-stretch gap-2 sm:gap-0">
                  <div className="flex items-center bg-[#f5f3f0] px-4 py-3 flex-1 border border-[#E7E4DF]">
                    <span className="font-mono text-xs text-[#716E68] select-none pr-1">atelier.art/@</span>
                    <input
                      type="text"
                      value={handle}
                      onChange={(e) => setHandle(e.target.value)}
                      placeholder="yourname"
                      required
                      className="w-full bg-transparent font-mono text-xs text-[#141413] placeholder:text-[#c9c6c4] focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-[#141413] text-white font-sans text-xs uppercase tracking-wider px-6 py-3 hover:bg-[#C25E3E] transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Claim</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </form>

                {claimed && (
                  <div className="mt-3 pt-2 flex items-center gap-2 text-[#C25E3E] font-mono text-xs">
                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                    <span>Handle atelier.art/@{handle} verified. Reservation slot held for 20 minutes in session cache.</span>
                  </div>
                )}
              </div>
            </div>

            {/* Action CTAs & Metadata stats */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#demo-preview"
                className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-wider bg-[#C25E3E] text-white px-6 py-3.5 hover:bg-[#141413] transition-colors duration-200 shadow-sm"
              >
                <span>Explore Live Ateliers</span>
                <span className="material-symbols-outlined text-[16px]">north_east</span>
              </a>
              <button
                onClick={() => onNavigate('studio-overview')}
                className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-wider bg-[#141413] text-white px-6 py-3.5 hover:bg-[#C25E3E] transition-colors duration-200 shadow-sm"
              >
                <span>Create your portfolio</span>
                <span className="material-symbols-outlined text-[16px]">dashboard</span>
              </button>
            </div>

            {/* Micro stats counter strip */}
            <div className="pt-6 grid grid-cols-3 gap-6 max-w-lg">
              <div>
                <span className="block font-serif text-2xl font-medium text-[#141413]">1,840+</span>
                <span className="block font-mono text-[10px] uppercase text-[#716E68]">Master Artisans</span>
              </div>
              <div>
                <span className="block font-serif text-2xl font-medium text-[#141413]">$3.4M</span>
                <span className="block font-mono text-[10px] uppercase text-[#716E68]">Direct Inquiries</span>
              </div>
              <div>
                <span className="block font-serif text-2xl font-medium text-[#141413]">0.00%</span>
                <span className="block font-mono text-[10px] uppercase text-[#716E68]">Commission Take</span>
              </div>
            </div>
          </div>

          {/* Right Column: Asymmetric Luxury Editorial Showcase */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            <div className="hidden xl:block absolute -left-10 top-20 [writing-mode:vertical-rl] rotate-180 font-mono text-[10px] uppercase text-[#716E68] tracking-widest select-none">
              Permanent Archival Index — Vol. IV
            </div>

            {/* Showcase Stack */}
            <div className="flex flex-col gap-6">
              {/* Artwork 1: Tectonic Vessel */}
              <div className="bg-white p-4 shadow-md group border border-[#E7E4DF]">
                <div className="relative overflow-hidden aspect-[4/3] bg-[#efeeeb]">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvGGogkcLt5eV-ajKx_woPMP6EMUR-AddtGdwdF7dXkIjGYnaBcfJTHX70NL92oBSvpBz9IZ3nh8MEsK8yOa-AV8F6KZXqEuG6p4kotSU4CoxBqZXTCx8VtS-1BsMm1n2A08XwzxdRj1PiJx-VQW2EYI7KYZ_xvv1Ap2JvdEmbaXqVEpddyyDiAvsJN52im_iGm_E_BCGqtuo2r1XPSShbgXigZ7fz0nApThu68KBpEXExIkgYA00j1Q"
                    alt="Tectonic Vessel No. 04"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-[#141413]/90 text-white px-2 py-1">
                    <span className="font-mono text-[10px] uppercase tracking-wider">Atelier Registry: AT-094</span>
                  </div>
                </div>
                <div className="pt-4 flex items-start justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-[#141413]">Tectonic Vessel No. 04</h3>
                    <p className="font-sans text-xs text-[#5f5e5d]">Elena Vance — Zurich, CH</p>
                    <p className="font-mono text-xs text-[#716E68] pt-1">Unglazed Stoneware, Iron Reduction · 48 × 32 cm · 2024</p>
                  </div>
                  <span className="font-mono text-[10px] uppercase px-2 py-1 bg-[#eae8e5] text-[#56423d] font-medium">Acquired</span>
                </div>
              </div>

              {/* Secondary Grid: 2 smaller asymmetric artworks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 -mt-2">
                <div className="bg-white p-3 shadow-md group border border-[#E7E4DF]">
                  <div className="aspect-[3/4] bg-[#efeeeb] overflow-hidden">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8RYtNqL0dR6W8yb7CAlFBNB2wqaFpCj6BPSaYgKSf9tmzmfSVyxha3J0-88T7HT1fZIri1xKbOnGjZpInsgXUqHm95pqtuw8roOdiuKIkq7KHaoR4Lt5mshP_s8tRCUTaLqzuhO7d_S7dfdbE06AO__I8a2v4e1O1r57XSLKYKIxXatjV_W8FPk0daorJux8c0ovDTqu_J-pv60JP5qR4TgXYJw3DOYYtYHrFkUB7AH5R2zhmTnvJpw"
                      alt="Solitude at Dawn"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="pt-3">
                    <h4 className="font-serif text-base text-[#141413] leading-snug">Solitude at Dawn</h4>
                    <p className="font-sans text-xs text-[#5f5e5d]">Mateo Rossi · @mateorossi</p>
                    <p className="font-mono text-[11px] text-[#716E68]">Oil on Belgian Linen</p>
                  </div>
                </div>

                <div className="bg-white p-3 shadow-md group sm:translate-y-6 border border-[#E7E4DF]">
                  <div className="aspect-[3/4] bg-[#efeeeb] overflow-hidden">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKgBDzUGMPDHt9ebnUq6gCfj_lfFr7tTRq-QBx2viwxPnF5IqTvwSdw6j6QWV8wEHkAyoMs4GquGvMd-er5ar_iXpFz_u0zYY7cDlvj1U0kxp4z_m-LkiY9SAWr5v3g-O-Ezcac3WlCz1DZZoUMhiZKvhrNHEBJT9xey6JeCi7UbnN4GZoA7F-bJoBNgIpxdeAAbquD7dNKGzszsuapsAZmk8tPY0iKaBLG1GJyClN2MM49CP--i50fA"
                      alt="Woven Monolith II"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="pt-3">
                    <h4 className="font-serif text-base text-[#141413] leading-snug">Woven Monolith II</h4>
                    <p className="font-sans text-xs text-[#5f5e5d]">Anya Lindqvist · @lindqvist</p>
                    <p className="font-mono text-[11px] text-[#716E68]">Icelandic Wool, Brass</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: LIVE CURATED CREATOR SPOTLIGHT REEL */}
      <section className="w-full bg-[#f5f3f0] py-16 border-y border-[#E7E4DF]">
        <div className="w-full max-w-[1440px] mx-auto px-5 md:px-12 lg:px-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <div className="flex items-center gap-2 text-[#C25E3E] mb-2">
                <span className="w-2 h-2 rounded-full bg-[#C25E3E] animate-pulse"></span>
                <span className="font-mono text-[10px] uppercase tracking-widest font-semibold">Active Studio Dispatch</span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl text-[#141413]">Curated Creators on Atelier</h2>
            </div>
            <p className="font-sans text-sm text-[#5f5e5d] max-w-md mt-2 md:mt-0">
              Independent masters receiving curatorial commissions and collector acquisitions globally with custom sovereign handles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Creator 1 */}
            <div className="bg-white p-5 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow border border-[#E7E4DF]">
              <div>
                <div className="aspect-square bg-[#efeeeb] mb-4 overflow-hidden relative">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_OZIHxQiVSi69bOnzUzDxaxc402g4IZXX16FUV2fc2s1Y-9ZfOS-EZwhXbX4BEPslXV7Q4RUT4KhIwC5I4uSG6fu6KBwRl2KkkoOfQ3bbJg-r_mc6n_ARg_E7nPUC2K6VWtCHJcBQFq3VpkEPBGXihmDamMguIThsYlY3DpnoTQdQLhMuCEXyO0-XolAuhrbbqsaU4vYqjFokHhI-OFQ6NWAa0j7GWJV03OArpe4SlJRGbRAcmTRFCA" alt="Elena Vance" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute bottom-2 left-2 bg-[#141413]/80 text-white px-2 py-0.5 font-mono text-[10px] uppercase">Ceramics · Stoneware</div>
                </div>
                <h3 className="font-serif text-lg font-semibold text-[#141413]">Elena Vance</h3>
                <span className="font-mono text-xs text-[#C25E3E] block">atelier.art/@elenavance</span>
                <p className="font-sans text-xs text-[#5f5e5d] mt-2">Architectural ceramic vessels and wood-fired porous earthenware exploring tectonic fragmentation.</p>
              </div>
              <div className="mt-6 pt-3 border-t border-[#E7E4DF] flex items-center justify-between">
                <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase text-emerald-800 bg-[#eae8e5] px-2 py-1">
                  <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full"></span> Open Commission
                </span>
                <span className="font-mono text-xs text-[#716E68]">34 Works</span>
              </div>
            </div>

            {/* Creator 2 */}
            <div className="bg-white p-5 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow border border-[#E7E4DF]">
              <div>
                <div className="aspect-square bg-[#efeeeb] mb-4 overflow-hidden relative">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOhCh0Gzb4gbzcHpC7bF0OynU3pZd6xR8e5rvrmEIqVgK053uqQ-OvRao8LRRkzypc4E4yR2vx3fh_eY6JfYlQWgdJdcDn6yFBR_FfVPsS2lM0IHQAviYO8ZqjFy-UjkC1LYFaYrRWkymavJtA-nytOv2RFKoF4kEc0O8I07CvOPo8JWAha70vCTIN6wq60jnl2TyZ2cpJgWTKxxJY7rht9KGwwWf2YQ0D2bHtU3VqYjpAsOjzwc1QZw" alt="Mateo Rossi" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute bottom-2 left-2 bg-[#141413]/80 text-white px-2 py-0.5 font-mono text-[10px] uppercase">Oil · Belgian Linen</div>
                </div>
                <h3 className="font-serif text-lg font-semibold text-[#141413]">Mateo Rossi</h3>
                <span className="font-mono text-xs text-[#C25E3E] block">atelier.art/@mateorossi</span>
                <p className="font-sans text-xs text-[#5f5e5d] mt-2">Meditative impasto and chromatic gradients probing atmospheric solitude in maritime landscapes.</p>
              </div>
              <div className="mt-6 pt-3 border-t border-[#E7E4DF] flex items-center justify-between">
                <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase text-amber-800 bg-[#eae8e5] px-2 py-1">
                  <span className="w-1.5 h-1.5 bg-amber-600 rounded-full"></span> Waitlist Only
                </span>
                <span className="font-mono text-xs text-[#716E68]">19 Works</span>
              </div>
            </div>

            {/* Creator 3 */}
            <div className="bg-white p-5 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow border border-[#E7E4DF]">
              <div>
                <div className="aspect-square bg-[#efeeeb] mb-4 overflow-hidden relative">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDQ7QH4io-6NiDdPEFV0rjeSyzpCq29OBf750r-KMCIAXB6LsaJdVMLhCdxzuFclkXCrw0cEbmWioHblTQfOqIhFz-JkExxP6FQay9bsFio_CUGN0vU4LGox0MIz1uxvbGPkL5iux9-GwIsygmxGzsu8RXuF72VpWRAdIXYAEcnKoQZ_7XfeaYYxDoeAOgbWYhuf3ttp9Z3qVWAG-YSnLivXaGZ2Ylomfa85CRrfntc1pBK3wkqXx10w" alt="Anya Lindqvist" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute bottom-2 left-2 bg-[#141413]/80 text-white px-2 py-0.5 font-mono text-[10px] uppercase">Tapestry · Fiber</div>
                </div>
                <h3 className="font-serif text-lg font-semibold text-[#141413]">Anya Lindqvist</h3>
                <span className="font-mono text-xs text-[#C25E3E] block">atelier.art/@lindqvist</span>
                <p className="font-sans text-xs text-[#5f5e5d] mt-2">Monumental architectural fiber hangings sourced from regenerative Scandinavian heritage sheep breeds.</p>
              </div>
              <div className="mt-6 pt-3 border-t border-[#E7E4DF] flex items-center justify-between">
                <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase text-emerald-800 bg-[#eae8e5] px-2 py-1">
                  <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full"></span> Open Commission
                </span>
                <span className="font-mono text-xs text-[#716E68]">12 Works</span>
              </div>
            </div>

            {/* Creator 4 */}
            <div className="bg-white p-5 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow border border-[#E7E4DF]">
              <div>
                <div className="aspect-square bg-[#efeeeb] mb-4 overflow-hidden relative">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAd26-G-ttNwsnAj2hEre4rnFje45GedTMR6yQIH3abiAtWVNMmGmfr6iUMNWM5bses2qNHUjOF9-PqQ_e_tbqwQmndurBkgy3A31uoVbZjqLr_TGBDw-VUqCigpFlupSpmA6B-CUW-8tvo2DteSX1vF_T1mJIqE8464OBjk1IXNmSS_vHnY6jMrQ3gnFJ7xVyKbamzdsG4Qm6pd-d-ck4nKR41f-4WvdlJtQtYYa4-87pF2hS4N7Edg" alt="Kenzo Takahashi" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute bottom-2 left-2 bg-[#141413]/80 text-white px-2 py-0.5 font-mono text-[10px] uppercase">Bronze · Cast Iron</div>
                </div>
                <h3 className="font-serif text-lg font-semibold text-[#141413]">Kenzo Takahashi</h3>
                <span className="font-mono text-xs text-[#C25E3E] block">atelier.art/@takahashi</span>
                <p className="font-sans text-xs text-[#5f5e5d] mt-2">Lost-wax bronze casting studying equilibrium, weight distribution, and tactile oxidation patinas.</p>
              </div>
              <div className="mt-6 pt-3 border-t border-[#E7E4DF] flex items-center justify-between">
                <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase text-emerald-800 bg-[#eae8e5] px-2 py-1">
                  <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full"></span> Open Commission
                </span>
                <span className="font-mono text-xs text-[#716E68]">41 Works</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: VALUE PROPOSITION GRID */}
      <section className="w-full max-w-[1440px] mx-auto px-5 md:px-12 lg:px-16 py-16" id="value-matrix">
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="font-mono text-[10px] uppercase text-[#716E68] tracking-widest font-medium">Product Specification</span>
            <span className="text-[#C25E3E] font-mono text-xs">// ARCHIVAL COMPARISON</span>
          </div>
          <h2 className="font-serif text-4xl text-[#141413] mb-3">
            Built for the Studio.<br />Designed for Curators.
          </h2>
          <p className="font-sans text-lg text-[#5f5e5d]">
            Generic website builders produce cluttered, slow interfaces that demean serious physical craft. Atelier strips away synthetic chrome in favor of museum-grade stillness.
          </p>
        </div>

        {/* 4-Feature Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {/* Feature 1 */}
          <div className="lg:col-span-7 bg-white p-8 shadow-sm flex flex-col justify-between relative overflow-hidden border border-[#E7E4DF]">
            <div className="space-y-3 max-w-lg z-10">
              <span className="font-mono text-[10px] uppercase text-[#C25E3E] font-semibold tracking-wider">Provenance 01</span>
              <h3 className="font-serif text-2xl text-[#141413]">Museum-Grade Typography & Aesthetics</h3>
              <p className="font-sans text-sm text-[#5f5e5d]">
                Zero template bloat. Every serif hairline, caption margin, and negative space coordinate is mathematically tuned to honor fine artwork rather than digital app scaffolding.
              </p>
              <ul className="pt-2 space-y-2 font-sans text-xs text-[#56423d]">
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-[16px] text-[#C25E3E]">check</span> Scholarly Playfair Display & JetBrains Mono pairing</li>
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-[16px] text-[#C25E3E]">check</span> Uncompressed high-dpi zoom inspection rendering</li>
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-[16px] text-[#C25E3E]">check</span> Neutral gallery-bone (#FAF8F5) light-responsive background</li>
              </ul>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="lg:col-span-5 bg-[#efeeeb] p-8 shadow-sm flex flex-col justify-between border border-[#E7E4DF]">
            <div className="space-y-3">
              <span className="font-mono text-[10px] uppercase text-[#C25E3E] font-semibold tracking-wider">Provenance 02</span>
              <h3 className="font-serif text-2xl text-[#141413]">atelier.art/@handle Sovereign Identity</h3>
              <p className="font-sans text-sm text-[#5f5e5d]">
                A permanent distinguished address engineered for gallery representation proposals, museum acquisitions, and printed exhibition catalogs.
              </p>
            </div>
            <div className="bg-white p-4 mt-6 shadow-sm border border-[#E7E4DF]">
              <div className="flex items-center justify-between pb-2">
                <span className="font-mono text-[10px] uppercase text-[#716E68]">Canonical Archival URI</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              </div>
              <span className="font-mono text-xs text-[#141413] font-medium block truncate">https://atelier.art/@vance</span>
              <p className="font-mono text-[11px] text-[#716E68] mt-1">Status: Registered / DNS-SEC Verified</p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="lg:col-span-5 bg-white p-8 shadow-sm flex flex-col justify-between border border-[#E7E4DF]">
            <div className="space-y-3">
              <span className="font-mono text-[10px] uppercase text-[#C25E3E] font-semibold tracking-wider">Provenance 03</span>
              <h3 className="font-serif text-2xl text-[#141413]">Structured Commission Intake</h3>
              <p className="font-sans text-sm text-[#5f5e5d]">
                End chaotic Instagram DMs and scattered WhatsApp threads. Secure formal briefs containing dimensions, architectural room attachments, budget brackets, and strict delivery deadlines.
              </p>
            </div>
            <div className="mt-6 space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between bg-[#f5f3f0] px-3 py-2 border border-[#E7E4DF]">
                <span className="text-[#5f5e5d]">Stage 01: Client Brief & Dimensions</span>
                <span className="text-[#141413] font-semibold">Accepted</span>
              </div>
              <div className="flex items-center justify-between bg-[#f5f3f0] px-3 py-2 border border-[#E7E4DF]">
                <span className="text-[#5f5e5d]">Stage 02: Budget Threshold</span>
                <span className="text-[#C25E3E] font-semibold">&gt; $2,500</span>
              </div>
              <div className="flex items-center justify-between bg-[#f5f3f0] px-3 py-2 border border-[#E7E4DF]">
                <span className="text-[#5f5e5d]">Stage 03: Direct Studio Inbox</span>
                <span className="text-[#141413] font-semibold">Active</span>
              </div>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="lg:col-span-7 bg-[#efeeeb] p-8 shadow-sm flex flex-col justify-between border border-[#E7E4DF]">
            <div className="space-y-3">
              <span className="font-mono text-[10px] uppercase text-[#C25E3E] font-semibold tracking-wider">Provenance 04</span>
              <h3 className="font-serif text-2xl text-[#141413]">Zero Code, Instant Archival Publishing</h3>
              <p className="font-sans text-sm text-[#5f5e5d]">
                Drag-and-drop website builder fatigue is dead. Upload your raw master TIFF or JPEG, enter physical medium dimensions, and Atelier calculates responsive negative space and focal balance automatically.
              </p>
            </div>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-white p-3 border border-[#E7E4DF]">
                <span className="font-mono text-[10px] uppercase text-[#716E68] block">Upload Speed</span>
                <span className="font-mono text-xs text-[#141413] font-semibold">Sub-800ms</span>
              </div>
              <div className="bg-white p-3 border border-[#E7E4DF]">
                <span className="font-mono text-[10px] uppercase text-[#716E68] block">Image Detail</span>
                <span className="font-mono text-xs text-[#141413] font-semibold">100MP Deep Zoom</span>
              </div>
              <div className="bg-white p-3 border border-[#E7E4DF]">
                <span className="font-mono text-[10px] uppercase text-[#716E68] block">SEO Indexing</span>
                <span className="font-mono text-xs text-[#141413] font-semibold">Schema.org/Artwork</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: INTERACTIVE PORTFOLIO PREVIEW / DEMO COMPONENT */}
      <section className="w-full bg-[#f5f3f0] py-16 border-y border-[#E7E4DF]" id="demo-preview">
        <div className="w-full max-w-[1440px] mx-auto px-5 md:px-12 lg:px-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
            <div>
              <span className="font-mono text-[10px] uppercase text-[#C25E3E] font-semibold tracking-widest block mb-1">Interactive Studio Viewport</span>
              <h2 className="font-serif text-3xl md:text-4xl text-[#141413]">The Public Monograph Experience</h2>
            </div>
            {/* Layout Switcher Tabs */}
            <div className="flex items-center bg-white p-1 shadow-sm mt-4 md:mt-0 border border-[#E7E4DF]">
              <button
                onClick={() => setActiveLayout('editorial')}
                className={`px-4 py-2 font-sans text-xs uppercase transition-colors cursor-pointer ${activeLayout === 'editorial' ? 'bg-[#141413] text-white font-semibold' : 'text-[#56423d] hover:text-[#141413]'}`}
              >
                Editorial Monolith
              </button>
              <button
                onClick={() => setActiveLayout('gallery')}
                className={`px-4 py-2 font-sans text-xs uppercase transition-colors cursor-pointer ${activeLayout === 'gallery' ? 'bg-[#141413] text-white font-semibold' : 'text-[#56423d] hover:text-[#141413]'}`}
              >
                Clean Gallery
              </button>
              <button
                onClick={() => setActiveLayout('masonry')}
                className={`px-4 py-2 font-sans text-xs uppercase transition-colors cursor-pointer ${activeLayout === 'masonry' ? 'bg-[#141413] text-white font-semibold' : 'text-[#56423d] hover:text-[#141413]'}`}
              >
                Minimal Masonry
              </button>
            </div>
          </div>

          {/* Simulated Browser Frame */}
          <div className="bg-white shadow-xl overflow-hidden border border-[#E7E4DF]">
            {/* Browser Chrome Bar */}
            <div className="bg-[#efeeeb] px-6 py-3 flex items-center justify-between border-b border-[#E7E4DF]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#E7E4DF]"></span>
                <span className="w-3 h-3 rounded-full bg-[#E7E4DF]"></span>
                <span className="w-3 h-3 rounded-full bg-[#E7E4DF]"></span>
              </div>
              <div className="bg-[#FAF8F5] px-6 py-1 max-w-md w-full mx-4 flex items-center justify-center text-center border border-[#E7E4DF]">
                <span className="font-mono text-xs text-[#716E68]">https://atelier.art/@elenavance</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] uppercase text-[#C25E3E] font-semibold">Live Mode</span>
              </div>
            </div>

            {/* Simulated Artist Portfolio Body */}
            <div className="p-6 md:p-12 bg-[#FAF8F5] min-h-[550px]">
              <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-8 border-b border-[#E7E4DF]">
                <div className="space-y-2 max-w-xl">
                  <span className="font-mono text-[10px] uppercase text-[#716E68] tracking-widest">Master Ceramist · Zurich Studio</span>
                  <h3 className="font-serif text-3xl font-medium text-[#141413]">Elena Vance</h3>
                  <p className="font-sans text-sm text-[#5f5e5d]">
                    Investigating geological fractures through high-iron stoneware reduction and unglazed architectural vessels.
                  </p>
                </div>
                <div className="mt-4 md:mt-0 flex items-center gap-3">
                  <button
                    onClick={() => setCommissionOpen(!commissionOpen)}
                    className="bg-[#C25E3E] text-white font-sans text-xs uppercase px-6 py-3 hover:bg-[#141413] transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">edit_note</span>
                    <span>Request Commission</span>
                  </button>
                </div>
              </div>

              {/* Dynamic Layout Content */}
              {activeLayout === 'editorial' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-8 bg-white p-4 shadow-sm group border border-[#E7E4DF]">
                    <div className="aspect-[16/10] bg-[#efeeeb] overflow-hidden relative">
                      <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXvOMhPHtDf7bbP3Bo84Yl70tIEXgXvLCZOWWgMIrFYCKbDdjin_iLTVwJPv16AAZFGmnWtg7VNPz3jhdAImsxronYEHVwzMYygWKIYDz2_ce2ouR-u1oUeX1DfgfQkoUCQapfvhyONxQ5y4O6rb_sJeJk_5uOV7BDc4F8fyzhlisnAoW7YP8pIg8Wd4NSitf_Z2X78RzHM6IR8pZFsEAbcBYGc1pRrMghWyd4_NbagCkc3zo_KILdAQ"
                        alt="Tectonic Vessel No. 04"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute bottom-3 right-3 bg-[#141413] text-white px-3 py-1 font-mono text-xs">
                        100% Zoom Available
                      </div>
                    </div>
                  </div>
                  <div className="lg:col-span-4 space-y-3">
                    <span className="font-mono text-[10px] uppercase text-[#716E68]">Catalog Reference // V-04</span>
                    <h4 className="font-serif text-2xl text-[#141413]">Tectonic Vessel No. 04</h4>
                    <p className="font-sans text-xs text-[#5f5e5d] leading-relaxed">
                      Thrown from blended Swiss alpine clays, bisqued and subjected to multi-day pit reduction firing with coarse silica inclusions.
                    </p>
                    <div className="pt-2 font-mono text-xs text-[#716E68] space-y-1">
                      <p>Dimensions: 48 × 32 × 30 cm</p>
                      <p>Weight: 14.2 kg</p>
                      <p>Provenance: Vance Atelier Private Collection</p>
                    </div>
                    <div className="pt-3">
                      <span className="inline-block px-3 py-1 bg-[#efeeeb] text-[#141413] font-mono text-[10px] uppercase">Available via Studio</span>
                    </div>
                  </div>
                </div>
              )}

              {activeLayout === 'gallery' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-4 shadow-sm border border-[#E7E4DF]">
                    <div className="aspect-square bg-[#efeeeb] overflow-hidden mb-3">
                      <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDha1TzoOkLMLpC_Bs7xc7KfYol24S6Ozc4T_tILVTNXWd1gJMy-YCCGDNR81oSa67kPy8pmJeFcltIIXNq695dXm4t_l1MACK4MtgfbNGK8lh7B-Fuv4EdWZgMpa68X92X6c_Bvg5_CwsotT4UuE-POB_NYuijoPFFC-ILSD-hW_c2sWFqfpHMsb5RxFG3ODsN-VI6GDrd8-xM8geSl8ib4XETj5RSMQ62xAOPKzobR0Ms3cacjNzrUA" alt="Fracture Study I" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <h4 className="font-serif text-lg text-[#141413]">Fracture Study I</h4>
                    <p className="font-mono text-xs text-[#716E68]">Stoneware · 2024</p>
                  </div>
                  <div className="bg-white p-4 shadow-sm border border-[#E7E4DF]">
                    <div className="aspect-square bg-[#efeeeb] overflow-hidden mb-3">
                      <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfpcvJIiJqG-61uu2eZzkd-p7joH3nu1pR4OJJIV9YgWhOwLv0T9bJ_qMFiilDALU0uE2Y8-C-rxDm5JGipt7B7qGYcIPO4N7Z0hExdku7JA3S5PVs3yWnBt6mi7Odbpif0cz_LzIuGf4uh5wlfumfy-HCiZbITrze-heFJtDNuh0u-SkCaKN2_Z-rp4Y5eSxNAz9czuVNVEzKMBbIeVzaHpn1exfY1yH_tyVizctSQFJ0yPB9dSyA7w" alt="Basalt Urn IV" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <h4 className="font-serif text-lg text-[#141413]">Basalt Urn IV</h4>
                    <p className="font-mono text-xs text-[#716E68]">Iron Clay · 2023</p>
                  </div>
                  <div className="bg-white p-4 shadow-sm border border-[#E7E4DF]">
                    <div className="aspect-square bg-[#efeeeb] overflow-hidden mb-3">
                      <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMleKXqqQAXw99rnEONi9Rejyrm8vV1ATgfO6q1GExwKDlJO9lpSz8WN5mzcnRwimlbi7diVuKNMdQmELNpdV3vy1apiD68Qa7W-R_fMTxqiGwZavvhGmI6nLmDUgvCbVmpQDgfsJmFXTkgtLbq8V0wBSa7L3WXbCDSUjNPhxodL61FJc2AVlR3YbG9v7ILj9aCQX2SJ02HFaikXH3YSNJY7-7SzPYMGGiHo_DiNY8wxJdTNn5MTvVGQ" alt="Sediment Basin" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <h4 className="font-serif text-lg text-[#141413]">Sediment Basin</h4>
                    <p className="font-mono text-xs text-[#716E68]">Porcelain · 2024</p>
                  </div>
                </div>
              )}

              {activeLayout === 'masonry' && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  <div className="md:col-span-7 bg-white p-4 shadow-sm border border-[#E7E4DF]">
                    <div className="aspect-[4/5] bg-[#efeeeb] overflow-hidden mb-3">
                      <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzt-nlJjKIE6iyQn7OLQjNqenXOl1E_hZ16vTYrDZqWxAee87yLMtc13Mh8RdW-8E2i9k0t-zWyYqjRYSQre9qiVrlNNdqbcYmtePvw4r52ytErZyp1ZeWWvfO1F-Ny5v18058Hxg63ftoWoHRd2Pud9UEks4Zbto2E8-dpAv2Mx2cwnRxD8_0KcJDv0tHidJbJgxBKlZlCYRe2d5QQwaeHgMuYBo0x3Hxvgls14G3Q0GImlVEKkLGMQ" alt="Monolith in Grey" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <h4 className="font-serif text-lg text-[#141413]">Monolith in Grey</h4>
                    <p className="font-mono text-xs text-[#716E68]">Unglazed Sandstone · 65cm</p>
                  </div>
                  <div className="md:col-span-5 flex flex-col gap-6">
                    <div className="bg-white p-4 shadow-sm border border-[#E7E4DF]">
                      <div className="aspect-square bg-[#efeeeb] overflow-hidden mb-3">
                        <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDENDytz_8-3fUd07V2e0UET_OBLAKwlHhf5HaC7fi7Nh1Zr0lQf4V71C8ETLb8TJFvsYQtoUvrztNa4XN0JKv-Mj1iTf1UAm70DC1u6H0aMw6VsJ3aQhsjXWDU8ww1NN_JC0UV1SdnJhRBFs8Aac_3Heqpq0ffy5efN6E4b2a6itsEhYkNCQeIlHZFvrjvu1WJj0mtcyK6xgXJmf0E-ghhS1wVUGa57eLK3rH3ZcjPgjKOtueZVi7LKg" alt="Pore Fragment 02" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <h4 className="font-serif text-base text-[#141413]">Pore Fragment 02</h4>
                      <p className="font-mono text-xs text-[#716E68]">Reduction Glaze</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Slide-out commission mockup drawer */}
              {commissionOpen && (
                <div className="mt-8 bg-white p-8 shadow-xl max-w-2xl mx-auto border border-[#E7E4DF]">
                  <div className="flex items-center justify-between pb-4 border-b border-[#E7E4DF]">
                    <h4 className="font-serif text-xl text-[#141413]">Initiate Commission Brief for Elena Vance</h4>
                    <button onClick={() => setCommissionOpen(false)} className="text-[#716E68] hover:text-[#141413] cursor-pointer">
                      <span className="material-symbols-outlined">close</span>
                    </button>
                  </div>
                  <p className="font-sans text-xs text-[#5f5e5d] my-4">
                    Your inquiry will be logged directly to Elena’s private studio inbox with provenance records.
                  </p>
                  {briefSubmitted ? (
                    <div className="p-4 bg-emerald-50 text-emerald-800 font-mono text-xs flex items-center gap-2">
                      <span className="material-symbols-outlined">check_circle</span>
                      Commission brief transmitted to artist studio successfully.
                    </div>
                  ) : (
                    <form onSubmit={(e) => { e.preventDefault(); setBriefSubmitted(true); }} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-mono text-[10px] uppercase text-[#716E68] mb-1">Your Full Name</label>
                          <input type="text" placeholder="Dr. Arthur Pendelton" required className="w-full bg-[#f5f3f0] px-3 py-2 font-sans text-xs text-[#141413] focus:outline-none border border-[#E7E4DF]" />
                        </div>
                        <div>
                          <label className="block font-mono text-[10px] uppercase text-[#716E68] mb-1">Collector / Institutional Email</label>
                          <input type="email" placeholder="arthur@curatorial.org" required className="w-full bg-[#f5f3f0] px-3 py-2 font-sans text-xs text-[#141413] focus:outline-none border border-[#E7E4DF]" />
                        </div>
                      </div>
                      <div>
                        <label className="block font-mono text-[10px] uppercase text-[#716E68] mb-1">Medium & Scale Vision</label>
                        <textarea rows={3} placeholder="Commissioning a standalone monumental vessel..." className="w-full bg-[#f5f3f0] px-3 py-2 font-sans text-xs text-[#141413] focus:outline-none border border-[#E7E4DF]"></textarea>
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <span className="font-mono text-xs text-[#716E68]">Base threshold: $2,800 USD</span>
                        <button type="submit" className="bg-[#141413] text-white font-sans text-xs uppercase px-6 py-2.5 hover:bg-[#C25E3E] transition-colors cursor-pointer">
                          Transmit Brief
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: CURATORIAL ACCOLADES & TESTIMONIALS */}
      <section className="w-full max-w-[1440px] mx-auto px-5 md:px-12 lg:px-16 py-16">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-12">
          <span className="font-mono text-[10px] uppercase text-[#C25E3E] tracking-widest font-semibold block mb-1">Curatorial Testimonials</span>
          <h2 className="font-serif text-3xl md:text-4xl text-[#141413]">Voices from the Atelier</h2>
          <p className="font-sans text-base text-[#5f5e5d] mt-2">
            Trusted by studio sculptors, representational painters, and gallery directors globally.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-8 shadow-sm flex flex-col justify-between border border-[#E7E4DF]">
            <div className="space-y-4">
              <span className="font-serif text-4xl text-[#C25E3E]">“</span>
              <p className="font-sans text-sm text-[#141413] leading-relaxed">
                Prior to Atelier, sending my portfolio meant sending a cluttered website link that looked like an e-commerce shoe store. Atelier gave my stoneware the monastic silence of an actual Kunsthalle.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-[#E7E4DF]">
              <h4 className="font-serif text-base font-semibold text-[#141413]">Elena Vance</h4>
              <span className="font-mono text-xs text-[#716E68] block">Ceramist · @elenavance · Zurich</span>
            </div>
          </div>

          <div className="bg-white p-8 shadow-sm flex flex-col justify-between border border-[#E7E4DF]">
            <div className="space-y-4">
              <span className="font-serif text-4xl text-[#C25E3E]">“</span>
              <p className="font-sans text-sm text-[#141413] leading-relaxed">
                The commission intake workflow stopped the endless back-and-forth email negotiations. Serious collectors fill out the dimensions and budget upfront. I accepted three monumental commissions in two months.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-[#E7E4DF]">
              <h4 className="font-serif text-base font-semibold text-[#141413]">Mateo Rossi</h4>
              <span className="font-mono text-xs text-[#716E68] block">Oil Painter · @mateorossi · Milan</span>
            </div>
          </div>

          <div className="bg-white p-8 shadow-sm flex flex-col justify-between border border-[#E7E4DF]">
            <div className="space-y-4">
              <span className="font-serif text-4xl text-[#C25E3E]">“</span>
              <p className="font-sans text-sm text-[#141413] leading-relaxed">
                As a guest curator for European biennials, reviewing artist portfolios on Atelier is an absolute relief. The artwork metadata is exact, zoom clarity is flawless, and the provenance is documented.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-[#E7E4DF]">
              <h4 className="font-serif text-base font-semibold text-[#141413]">Dr. Christine Moreau</h4>
              <span className="font-mono text-xs text-[#716E68] block">Senior Curator · Palais des Arts Contemporains</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: HIGH-IMPACT FINAL CTA BANNER */}
      <section className="w-full bg-[#141413] text-white py-16 my-8">
        <div className="w-full max-w-[1440px] mx-auto px-5 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-[#ffb59e]">
                <span className="w-2 h-2 bg-[#C25E3E]"></span>
                <span className="font-mono text-[10px] uppercase tracking-widest">Reserve Your Studio Atelier</span>
              </div>
              <h2 className="font-serif text-4xl sm:text-5xl text-white tracking-tight leading-tight">
                Your work deserves more than a generic template.
              </h2>
              <p className="font-sans text-base text-[#e4e2df] max-w-xl font-light">
                Claim your sovereign handle, upload your first portfolio collection in under five minutes, and begin accepting formal curatorial commissions.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onNavigate('studio-overview')}
                  className="bg-[#C25E3E] text-white font-sans text-xs uppercase tracking-wider px-8 py-3.5 hover:bg-white hover:text-[#141413] transition-colors duration-200 cursor-pointer shadow-sm"
                >
                  Start Your Studio Atelier
                </button>
                <button
                  onClick={() => onNavigate('portfolio-customizer')}
                  className="text-white font-sans text-xs uppercase tracking-wider py-3.5 px-4 hover:text-[#ffb59e] transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>Explore Portfolio Customizer</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#30312f] p-8 shadow-2xl space-y-4 border border-white/10">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="font-mono text-[10px] uppercase text-[#716E68]">Atelier Member Certificate</span>
                <span className="font-mono text-xs text-[#ffb59e]">PROV-2024</span>
              </div>
              <div className="space-y-1">
                <span className="block font-mono text-xs text-[#e4e2df]">Artist Member Handle:</span>
                <span className="block font-serif text-2xl text-white">atelier.art/@yourcraft</span>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-2 font-mono text-xs text-[#716E68]">
                <div>
                  <span className="block text-[#e4e2df]">Platform Fee:</span>
                  <span className="text-white">0% Direct</span>
                </div>
                <div>
                  <span className="block text-[#e4e2df]">Storage:</span>
                  <span className="text-white">Lossless TIFF / RAW</span>
                </div>
              </div>
              <div className="pt-2">
                <div className="bg-[#141413] p-3 flex items-center justify-between border border-white/10">
                  <span className="font-mono text-[10px] uppercase text-[#e4e2df]">Curatorial Verification</span>
                  <span className="font-mono text-[10px] uppercase text-emerald-400 font-semibold">Guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
