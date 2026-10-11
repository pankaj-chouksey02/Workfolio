"use client";

import React, { useState } from 'react';

interface StudioOverviewScreenProps {
  onNavigate: (path: string) => void;
}

export default function StudioOverviewScreen({ onNavigate }: StudioOverviewScreenProps) {
  const [queueAccepted, setQueueAccepted] = useState<string[]>([]);

  const acceptAllocation = (name: string) => {
    if (!queueAccepted.includes(name)) {
      setQueueAccepted([...queueAccepted, name]);
    }
  };

  return (
    <div className="px-5 lg:px-12 py-8 space-y-10 max-w-[1440px] mx-auto w-full">
      {/* 1. Welcome & Sovereign Studio Header */}
      <header className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] uppercase text-[#716E68] tracking-widest">Workspace ID // EV-8820</span>
              <span className="text-[#716E68]">/</span>
              <span className="font-mono text-[10px] uppercase text-[#C25E3E] font-semibold">Studio Command</span>
            </div>
            <h1 className="font-serif text-4xl text-[#141413] tracking-tight">Good morning, Elena.</h1>
            <p className="font-sans text-sm text-[#56423d] max-w-2xl">
              Here is what requires your artistic attention today across your studio and archival registry.
            </p>
          </div>

          {/* Action Bar */}
          <div className="flex flex-wrap items-center gap-3">
            <button 
              onClick={() => onNavigate('artworks')}
              className="bg-[#141413] text-white hover:bg-[#C25E3E] transition-colors py-3 px-4 font-sans text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              <span>Upload Artwork</span>
            </button>
            <button 
              onClick={() => onNavigate('artworks')}
              className="bg-[#efeeeb] hover:bg-[#e4e2df] transition-colors text-[#141413] py-3 px-4 font-sans text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">inbox</span>
              <span>Inquiries (3)</span>
            </button>
            <button 
              onClick={() => navigator.clipboard.writeText('atelier.art/@elenavance')}
              className="bg-[#efeeeb] hover:bg-[#e4e2df] transition-colors text-[#141413] py-3 px-4 font-sans text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">link</span>
              <span>atelier.art/@elenavance</span>
            </button>
          </div>
        </div>

        {/* Studio Status Banner */}
        <div className="bg-white p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-[#E7E4DF]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-[#C25E3E]"></span>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
              <span className="font-serif text-base font-semibold text-[#141413]">Studio Status: Open for Curatorial Commissions</span>
              <span className="font-mono text-[10px] text-[#716E68] uppercase tracking-wider bg-[#efeeeb] px-2 py-0.5">Next Slot: Nov 2024</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] uppercase text-[#716E68] tracking-wider">Public Availability</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-9 h-5 bg-[#e4e2df] peer-focus:outline-none peer-checked:bg-[#141413] peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:h-4 after:w-4 after:transition-all"></div>
            </label>
          </div>
        </div>
      </header>

      {/* 2. Metric Telemetry Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 flex flex-col justify-between shadow-sm border border-[#E7E4DF]">
          <div className="space-y-1">
            <div className="flex justify-between items-center text-[#716E68]">
              <span className="font-mono text-[10px] uppercase tracking-wider">Commissions In Flight</span>
              <span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
            </div>
            <p className="font-serif text-3xl text-[#141413]">$14,800</p>
          </div>
          <div className="mt-4 pt-3 bg-[#f5f3f0] px-3 py-2 flex items-center justify-between border border-[#E7E4DF]">
            <span className="font-mono text-xs text-[#716E68]">4 active projects</span>
            <span className="font-mono text-[10px] text-[#C25E3E] font-medium">+22% MoM</span>
          </div>
        </div>

        <div className="bg-white p-5 flex flex-col justify-between shadow-sm border border-[#E7E4DF]">
          <div className="space-y-1">
            <div className="flex justify-between items-center text-[#716E68]">
              <span className="font-mono text-[10px] uppercase tracking-wider">Client Inquiries</span>
              <span className="material-symbols-outlined text-[18px]">rate_review</span>
            </div>
            <p className="font-serif text-3xl text-[#141413]">3 Pending</p>
          </div>
          <div className="mt-4 pt-3 bg-[#f5f3f0] px-3 py-2 flex items-center justify-between border border-[#E7E4DF]">
            <span className="font-mono text-xs text-[#716E68]">Avg. $3,500 ticket</span>
            <span className="font-mono text-[10px] text-[#ba1a1a] font-medium">&lt; 48h Response SLA</span>
          </div>
        </div>

        <div className="bg-white p-5 flex flex-col justify-between shadow-sm border border-[#E7E4DF]">
          <div className="space-y-1">
            <div className="flex justify-between items-center text-[#716E68]">
              <span className="font-mono text-[10px] uppercase tracking-wider">Registry Traversal</span>
              <span className="material-symbols-outlined text-[18px]">query_stats</span>
            </div>
            <p className="font-serif text-3xl text-[#141413]">4,210</p>
          </div>
          <div className="mt-4 pt-3 bg-[#f5f3f0] px-3 py-2 flex items-center justify-between border border-[#E7E4DF]">
            <span className="font-mono text-xs text-[#716E68]">84% direct URI</span>
            <span className="font-mono text-[10px] text-[#C25E3E] font-medium">+38% Biennale</span>
          </div>
        </div>

        <div className="bg-white p-5 flex flex-col justify-between shadow-sm border border-[#E7E4DF]">
          <div className="space-y-1">
            <div className="flex justify-between items-center text-[#716E68]">
              <span className="font-mono text-[10px] uppercase tracking-wider">Catalogued Works</span>
              <span className="material-symbols-outlined text-[18px]">inventory_2</span>
            </div>
            <p className="font-serif text-3xl text-[#141413]">34 Works</p>
          </div>
          <div className="mt-4 pt-3 bg-[#f5f3f0] px-3 py-2 flex items-center justify-between border border-[#E7E4DF]">
            <span className="font-mono text-xs text-[#716E68]">8 unlisted drafts</span>
            <span className="font-mono text-[10px] text-[#141413] font-medium">4 Private Links</span>
          </div>
        </div>
      </section>

      {/* 3. Urgent Action Needed / Commission Intake Priority Drawer */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-xl text-[#141413]">Curatorial Intake Queue</h2>
            <span className="bg-[#C25E3E] text-white font-mono text-[10px] px-2 py-0.5">3 Critical</span>
          </div>
          <span className="font-mono text-[10px] uppercase text-[#716E68] tracking-wider">SLA Threshold: 48 Hours</span>
        </div>

        <div className="bg-white shadow-sm divide-y divide-[#efeeeb] border border-[#E7E4DF]">
          {/* Row 1 */}
          <div className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-[#f5f3f0] transition-colors">
            <div className="space-y-1.5 max-w-xl">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-serif text-lg text-[#141413]">Dr. Christine Moreau</span>
                <span className="font-mono text-[10px] text-[#716E68] uppercase bg-[#efeeeb] px-2 py-0.5">Palais des Arts</span>
                <span className="font-mono text-[10px] text-white bg-[#141413] px-2 py-0.5">New Brief</span>
                {queueAccepted.includes('Christine Moreau') && (
                  <span className="font-mono text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5">Accepted</span>
                )}
              </div>
              <p className="font-sans text-sm text-[#1b1c1a]">Monumental Stoneware Installation for South Atrium, high thermal variance area.</p>
              <div className="flex items-center gap-4 text-[#716E68] flex-wrap font-mono text-xs">
                <span>Allocated: $6,500 USD</span>
                <span>Delivery Target: Dec 15, 2024</span>
                <span>Location: Lyon, France</span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button className="bg-[#efeeeb] hover:bg-[#e4e2df] text-[#141413] px-4 py-2.5 font-sans text-xs uppercase tracking-wider transition-colors cursor-pointer">
                Inspect Brief
              </button>
              <button 
                onClick={() => acceptAllocation('Christine Moreau')}
                className="bg-[#141413] hover:bg-[#C25E3E] text-white px-4 py-2.5 font-sans text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                {queueAccepted.includes('Christine Moreau') ? 'Allocation Confirmed' : 'Accept Allocation'}
              </button>
            </div>
          </div>

          {/* Row 2 */}
          <div className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-[#f5f3f0] transition-colors">
            <div className="space-y-1.5 max-w-xl">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-serif text-lg text-[#141413]">Soren Kjaer</span>
                <span className="font-mono text-[10px] text-[#716E68] uppercase bg-[#efeeeb] px-2 py-0.5">Kjaer Architecture</span>
                <span className="font-mono text-[10px] text-[#141413] bg-[#e4e2df] px-2 py-0.5">Specs Validated</span>
              </div>
              <p className="font-sans text-sm text-[#1b1c1a]">Series of 3 Ribbed Terracotta Vessels for acoustic absorption niche.</p>
              <div className="flex items-center gap-4 text-[#716E68] flex-wrap font-mono text-xs">
                <span>Allocated: $4,200 USD</span>
                <span>Delivery Target: Jan 10, 2025</span>
                <span>Location: Copenhagen</span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button className="bg-[#efeeeb] hover:bg-[#e4e2df] text-[#141413] px-4 py-2.5 font-sans text-xs uppercase tracking-wider transition-colors cursor-pointer">
                Inspect Brief
              </button>
              <button className="bg-[#141413] hover:bg-[#C25E3E] text-white px-4 py-2.5 font-sans text-xs uppercase tracking-wider transition-colors cursor-pointer">
                Proceed to Deposit
              </button>
            </div>
          </div>

          {/* Row 3 */}
          <div className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-[#f5f3f0] transition-colors">
            <div className="space-y-1.5 max-w-xl">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-serif text-lg text-[#141413]">Camille Laurent</span>
                <span className="font-mono text-[10px] text-[#716E68] uppercase bg-[#efeeeb] px-2 py-0.5">Private Collector</span>
                <span className="font-mono text-[10px] text-[#716E68] bg-[#efeeeb] px-2 py-0.5">Under Review</span>
              </div>
              <p className="font-sans text-sm text-[#1b1c1a]">Iron Reduction Teaware Set with coarse grog exterior and celadon interior glaze.</p>
              <div className="flex items-center gap-4 text-[#716E68] flex-wrap font-mono text-xs">
                <span>Allocated: $1,800 USD</span>
                <span>Delivery Target: Flexible (Spring)</span>
                <span>Location: Kyoto, JP</span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button className="bg-[#efeeeb] hover:bg-[#e4e2df] text-[#141413] px-4 py-2.5 font-sans text-xs uppercase tracking-wider transition-colors cursor-pointer">
                Inspect Brief
              </button>
              <button className="bg-[#e4e2df] hover:bg-[#141413] hover:text-white text-[#141413] px-4 py-2.5 font-sans text-xs uppercase tracking-wider transition-colors cursor-pointer">
                Request Calibrations
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Quick Artwork Catalog & Recent Archival Activity */}
      <section className="space-y-4">
        <div className="flex items-end justify-between">
          <div>
            <span className="font-mono text-[10px] uppercase text-[#716E68] tracking-wider block">Physical Archives</span>
            <h2 className="font-serif text-2xl text-[#141413]">Recent Works & Master Records</h2>
          </div>
          <button 
            onClick={() => onNavigate('artworks')}
            className="font-sans text-xs uppercase tracking-wider text-[#141413] hover:text-[#C25E3E] flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>View All Artworks (34)</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>

        {/* Catalog Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white flex flex-col justify-between shadow-sm group border border-[#E7E4DF]">
            <div className="relative overflow-hidden aspect-[4/5] bg-[#eae8e5]">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAN4tXwxWVFzmMtWICqSquqjfdX2yMTAVaCozfMVoI-ExLUFhSe2g2i-u-v8eHiLU077v8PyB2uJZswvEVGCX95MJCZaQNwW1O6KhmwmkGDmc54u250sJBYHmDT8ry1CWJmV8KVe2EYks-E3KYxRCXPR1rIPWFlbo_kN_q5Eb9nN89Igcd3pOjlmf8k5oDSleMdWz4iOpIeRY-C64Ha1buga9NBCmtELOEeKUMcu9coB-FJnwmQaCYFIA" alt="Tectonic Vessel No. 04" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              <div className="absolute top-2 left-2 bg-[#141413] text-white font-mono text-[10px] px-2 py-0.5">Acquired // Locked</div>
            </div>
            <div className="p-4 space-y-1">
              <h3 className="font-serif text-base text-[#141413]">Tectonic Vessel No. 04</h3>
              <p className="font-mono text-xs text-[#716E68]">Unglazed Stoneware / 48 × 32 cm</p>
              <p className="font-mono text-[10px] text-[#C25E3E] pt-1">PROVENANCE CONFIRMED</p>
            </div>
          </div>

          <div className="bg-white flex flex-col justify-between shadow-sm group border border-[#E7E4DF]">
            <div className="relative overflow-hidden aspect-[4/5] bg-[#eae8e5]">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzt-nlJjKIE6iyQn7OLQjNqenXOl1E_hZ16vTYrDZqWxAee87yLMtc13Mh8RdW-8E2i9k0t-zWyYqjRYSQre9qiVrlNNdqbcYmtePvw4r52ytErZyp1ZeWWvfO1F-Ny5v18058Hxg63ftoWoHRd2Pud9UEks4Zbto2E8-dpAv2Mx2cwnRxD8_0KcJDv0tHidJbJgxBKlZlCYRe2d5QQwaeHgMuYBo0x3Hxvgls14G3Q0GImlVEKkLGMQ" alt="Strata Monolith IX" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              <div className="absolute top-2 left-2 bg-[#C25E3E] text-white font-mono text-[10px] px-2 py-0.5">Inquire Only</div>
            </div>
            <div className="p-4 space-y-1">
              <h3 className="font-serif text-base text-[#141413]">Strata Monolith IX</h3>
              <p className="font-mono text-xs text-[#716E68]">Iron-Reduction Clay / 62 × 24 cm</p>
              <p className="font-mono text-[10px] text-[#141413] pt-1">PUBLISHED TO SOVEREIGN REGISTRY</p>
            </div>
          </div>

          <div className="bg-white flex flex-col justify-between shadow-sm group border border-[#E7E4DF]">
            <div className="relative overflow-hidden aspect-[4/5] bg-[#eae8e5]">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDENDytz_8-3fUd07V2e0UET_OBLAKwlHhf5HaC7fi7Nh1Zr0lQf4V71C8ETLb8TJFvsYQtoUvrztNa4XN0JKv-Mj1iTf1UAm70DC1u6H0aMw6VsJ3aQhsjXWDU8ww1NN_JC0UV1SdnJhRBFs8Aac_3Heqpq0ffy5efN6E4b2a6itsEhYkNCQeIlHZFvrjvu1WJj0mtcyK6xgXJmf0E-ghhS1wVUGa57eLK3rH3ZcjPgjKOtueZVi7LKg" alt="Erosion Bowl II" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              <div className="absolute top-2 left-2 bg-[#716E68] text-white font-mono text-[10px] px-2 py-0.5">Draft Pending</div>
            </div>
            <div className="p-4 space-y-1">
              <h3 className="font-serif text-base text-[#141413]">Erosion Bowl II</h3>
              <p className="font-mono text-xs text-[#716E68]">Black Mountain Clay / 34 × 12 cm</p>
              <p className="font-mono text-[10px] text-[#ba1a1a] pt-1">NEEDS HI-RES ZOOM MACRO</p>
            </div>
          </div>

          <div className="bg-white flex flex-col justify-between shadow-sm group border border-[#E7E4DF]">
            <div className="relative overflow-hidden aspect-[4/5] bg-[#eae8e5]">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuB49nUiDv2zUQEgLj6HPPnxUtGoN0HqcQmKvPEIsaRjA2sl0XvIUYHqFGPJdLlf_xYzNhsQrWZ75IBCM0AXjskuYGCnU0cB856fy5kO2EER-t5wT3SKbkChdvIldC1u1uOjyvKL4S4zLoeSFjWl4rbRNgw4wxI86Q65lwquuQkNXyhVP2W9UvDSbbYb981jyvjQOj-b-X06q0EV8fqREtDwyB5oon9Uej8Hl-KrxQDGsvouSiX5QVU5MA" alt="Vessel in Ochre & Ash" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              <div className="absolute top-2 left-2 bg-[#141413] text-white font-mono text-[10px] px-2 py-0.5">Published</div>
            </div>
            <div className="p-4 space-y-1">
              <h3 className="font-serif text-base text-[#141413]">Vessel in Ochre & Ash</h3>
              <p className="font-mono text-xs text-[#716E68]">Wood-fired Stoneware / 40 × 28 cm</p>
              <p className="font-mono text-[10px] text-[#716E68] pt-1">ACTIVE IN PUBLIC PORTFOLIO</p>
            </div>
          </div>
        </div>

        {/* Drag & Drop Instant Upload Strip */}
        <div 
          onClick={() => onNavigate('artworks')}
          className="bg-[#efeeeb] p-4 flex flex-col sm:flex-row items-center justify-between gap-4 cursor-pointer hover:bg-[#eae8e5] transition-colors border border-[#E7E4DF]"
        >
          <div className="flex items-center gap-3 text-[#141413]">
            <span className="material-symbols-outlined text-[24px] text-[#C25E3E]">cloud_upload</span>
            <div>
              <p className="font-sans text-xs font-semibold">Drop high-res 16-bit TIFF or RAW studio captures here</p>
              <p className="font-mono text-[11px] text-[#716E68]">Instant cryptographic checksumming and automatic curatorial zoom tiling</p>
            </div>
          </div>
          <button className="bg-[#141413] hover:bg-[#C25E3E] text-white px-4 py-2 font-sans text-xs uppercase tracking-wider shrink-0 transition-colors cursor-pointer">
            Browse Files
          </button>
        </div>
      </section>

      {/* 5. Studio Health & Portfolio Performance Snapshot */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 pb-8">
        <div className="bg-white p-5 shadow-sm space-y-4 border border-[#E7E4DF]">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg text-[#141413]">Provenance Traversal</h3>
            <span className="font-mono text-[10px] uppercase text-[#716E68]">Last 30 Days</span>
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between font-mono text-xs mb-1">
                <span className="text-[#141413]">Sovereign URI (@elenavance)</span>
                <span className="text-[#716E68]">62%</span>
              </div>
              <div className="w-full h-1.5 bg-[#efeeeb]">
                <div className="h-full bg-[#141413]" style={{ width: '62%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between font-mono text-xs mb-1">
                <span className="text-[#141413]">Curated Explore / Biennale Registry</span>
                <span className="text-[#716E68]">24%</span>
              </div>
              <div className="w-full h-1.5 bg-[#efeeeb]">
                <div className="h-full bg-[#C25E3E]" style={{ width: '24%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between font-mono text-xs mb-1">
                <span className="text-[#141413]">Private Exhibition Links</span>
                <span className="text-[#716E68]">14%</span>
              </div>
              <div className="w-full h-1.5 bg-[#efeeeb]">
                <div className="h-full bg-[#716E68]" style={{ width: '14%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 shadow-sm space-y-4 border border-[#E7E4DF]">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg text-[#141413]">Fulfillment Pipeline</h3>
            <span className="font-mono text-[10px] uppercase text-[#716E68]">Active: 4</span>
          </div>
          <div className="space-y-2">
            <div className="grid grid-cols-5 text-center gap-1 font-mono text-[10px] text-[#716E68] uppercase">
              <span className="text-[#C25E3E] font-bold">Brief</span>
              <span className="text-[#141413] font-bold">Scope</span>
              <span className="text-[#141413] font-bold">Deposit</span>
              <span className="text-[#716E68]">Kiln</span>
              <span className="text-[#716E68]">Delivery</span>
            </div>
            <div className="grid grid-cols-5 gap-1 h-2">
              <div className="bg-[#C25E3E]"></div>
              <div className="bg-[#141413]"></div>
              <div className="bg-[#141413]"></div>
              <div className="bg-[#efeeeb]"></div>
              <div className="bg-[#efeeeb]"></div>
            </div>
          </div>
          <div className="bg-[#f5f3f0] p-3 space-y-1 border border-[#E7E4DF]">
            <span className="font-mono text-[10px] uppercase text-[#716E68] block">Current In Kiln</span>
            <p className="font-sans text-xs font-semibold text-[#141413]">Solstice Urn IV (Final High Fire)</p>
            <p className="font-mono text-[11px] text-[#716E68]">Cooling schedule: 18h remaining</p>
          </div>
        </div>

        <div className="bg-[#efeeeb] p-5 shadow-sm flex flex-col justify-between border border-[#E7E4DF]">
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-[#C25E3E]">
              <span className="material-symbols-outlined text-[18px]">lightbulb</span>
              <span className="font-mono text-[10px] uppercase font-bold tracking-wider">Curatorial Recommendation</span>
            </div>
            <p className="font-sans text-sm text-[#141413] leading-relaxed">
              Adding a 360° rotational detail or high-zoom crop to <strong className="font-semibold text-[#141413]">Strata Monolith IX</strong> increases private collector inquiries by an estimated 45%.
            </p>
          </div>
          <div className="pt-4 flex items-center justify-between">
            <button onClick={() => onNavigate('artworks')} className="font-sans text-xs uppercase tracking-wider text-[#141413] hover:text-[#C25E3E] flex items-center gap-1 transition-colors cursor-pointer">
              <span>Calibrate Imagery</span>
              <span className="material-symbols-outlined text-[16px]">tune</span>
            </button>
            <span className="font-mono text-[11px] text-[#716E68]">Algorithmic Insight #402</span>
          </div>
        </div>
      </section>
    </div>
  );
}
