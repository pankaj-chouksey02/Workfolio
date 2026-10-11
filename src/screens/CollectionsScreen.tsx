"use client";

import React, { useState } from 'react';

interface CollectionsScreenProps {
  onNavigate: (path: string) => void;
}

export default function CollectionsScreen({ onNavigate }: CollectionsScreenProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [reorderActive, setReorderActive] = useState(false);

  return (
    <div className="flex flex-col w-full pb-20">
      <div className="relative w-full px-5 lg:px-12 py-8 space-y-8 max-w-[1440px] mx-auto">
        {/* Breadcrumb & Top Bar */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-y-2">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] text-[#716E68] uppercase tracking-widest">Creator Studio</span>
              <span className="font-mono text-[10px] text-[#716E68]">/</span>
              <span className="font-mono text-[10px] text-[#716E68] uppercase tracking-widest">Curation & Works</span>
              <span className="font-mono text-[10px] text-[#716E68]">/</span>
              <span className="font-mono text-[10px] text-[#C25E3E] font-semibold uppercase tracking-widest">Collections</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-[#716E68]">Archive Synchronized: 09:42 JST</span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C25E3E]"></span>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pt-1">
            <div className="max-w-3xl space-y-2">
              <h1 className="font-serif text-3xl md:text-4xl text-[#141413] tracking-tight">Collections & Series</h1>
              <p className="font-sans text-sm text-[#56423d] max-w-2xl leading-relaxed">
                Curate bodies of work into cohesive thematic narratives, exhibition groupings, and monographs. Formulated for museum-grade provenance, critical monograph printouts, and digital collector acquisition.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 self-start lg:self-end">
              <button 
                onClick={() => setReorderActive(!reorderActive)}
                className={`px-4 py-2.5 transition-colors flex items-center gap-2 font-sans text-xs uppercase tracking-wider cursor-pointer ${reorderActive ? 'bg-[#C25E3E] text-white' : 'bg-[#efeeeb] hover:bg-[#e4e2df] text-[#141413]'}`}
              >
                <span className="material-symbols-outlined text-[18px]">drag_indicator</span>
                <span>{reorderActive ? 'Reorder Active (Done)' : 'Reorder Mode'}</span>
              </button>
              <button onClick={() => alert('Exporting catalogue PDFs...')} className="px-4 py-2.5 bg-white hover:bg-[#efeeeb] transition-colors flex items-center gap-2 text-[#141413] font-sans text-xs uppercase tracking-wider border border-[#E7E4DF] cursor-pointer">
                <span className="material-symbols-outlined text-[18px]">file_download</span>
                <span>Export Catalogues</span>
              </button>
              <button 
                onClick={() => setModalOpen(true)}
                className="px-5 py-2.5 bg-[#C25E3E] hover:bg-[#141413] text-white transition-colors flex items-center gap-2 font-sans text-xs uppercase tracking-wider shadow-sm cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">add</span>
                <span>Create New Collection</span>
              </button>
            </div>
          </div>
        </div>

        {/* Curatorial Index Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 shadow-sm flex flex-col justify-between border border-[#E7E4DF]">
            <div className="flex items-center justify-between pb-3">
              <span className="font-mono text-[10px] text-[#716E68] uppercase tracking-widest">Active Public Series</span>
              <span className="font-mono text-[10px] bg-[#efeeeb] px-1.5 py-0.5 text-[#141413]">PUB.03</span>
            </div>
            <div className="space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-3xl font-medium text-[#141413]">3</span>
                <span className="font-sans text-xs text-[#56423d]">Collections</span>
              </div>
              <p className="font-mono text-xs text-[#716E68]">30 Archival Works Online</p>
            </div>
          </div>

          <div className="bg-white p-5 shadow-sm flex flex-col justify-between border border-[#E7E4DF]">
            <div className="flex items-center justify-between pb-3">
              <span className="font-mono text-[10px] text-[#716E68] uppercase tracking-widest">Curatorial Texts</span>
              <span className="material-symbols-outlined text-emerald-800 text-[18px]">verified</span>
            </div>
            <div className="space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-3xl font-medium text-[#141413]">100%</span>
                <span className="font-sans text-xs text-[#56423d]">Documented</span>
              </div>
              <p className="font-mono text-xs text-[#716E68]">Monograph Statements Verified</p>
            </div>
          </div>

          <div className="bg-white p-5 shadow-sm flex flex-col justify-between border border-[#E7E4DF]">
            <div className="flex items-center justify-between pb-3">
              <span className="font-mono text-[10px] text-[#716E68] uppercase tracking-widest">Collector Acquisition Inquiries</span>
              <span className="font-mono text-[10px] bg-[#efeeeb] px-1.5 py-0.5 text-[#C25E3E]">+14.2%</span>
            </div>
            <div className="space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-3xl font-medium text-[#141413]">68%</span>
                <span className="font-sans text-xs text-[#56423d]">Via Series Portals</span>
              </div>
              <p className="font-mono text-xs text-[#716E68]">Total Commission Pipeline</p>
            </div>
          </div>

          <div className="bg-white p-5 shadow-sm flex flex-col justify-between border border-[#E7E4DF]">
            <div className="flex items-center justify-between pb-3">
              <span className="font-mono text-[10px] text-[#716E68] uppercase tracking-widest">Unassigned Pieces</span>
              <span className="w-2 h-2 rounded-full bg-[#C25E3E] animate-pulse"></span>
            </div>
            <div className="space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-3xl font-medium text-[#C25E3E]">4</span>
                <span className="font-sans text-xs text-[#56423d]">Studio Artworks</span>
              </div>
              <p className="font-mono text-xs text-[#716E68]">Requires Curatorial Assignment</p>
            </div>
          </div>
        </div>

        {/* Filter & Sorting Bar */}
        <div className="bg-white p-4 flex flex-wrap items-center justify-between gap-4 border border-[#E7E4DF]">
          <div className="flex items-center gap-2 overflow-x-auto py-1">
            <button className="px-3 py-1.5 bg-[#141413] text-white font-mono text-[10px] uppercase tracking-wider">All Collections (4)</button>
            <button className="px-3 py-1.5 bg-[#efeeeb] hover:bg-[#e4e2df] text-[#1b1c1a] font-mono text-[10px] uppercase tracking-wider">Public Exhibition (3)</button>
            <button className="px-3 py-1.5 bg-[#efeeeb] hover:bg-[#e4e2df] text-[#1b1c1a] font-mono text-[10px] uppercase tracking-wider">Studio Drafts (1)</button>
          </div>
          <div className="flex items-center gap-4 font-mono text-xs">
            <span className="text-[#716E68]">Sequence: <strong className="text-[#141413]">Editorial Hero First</strong></span>
          </div>
        </div>

        {/* COLLECTIONS LIST */}
        <div className="space-y-8">
          {/* Collection 1: Lithic Strata Series */}
          <article className="bg-white shadow-sm p-6 lg:p-8 border border-[#E7E4DF]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="font-mono text-[10px] bg-[#141413] text-white px-2 py-0.5 tracking-widest">SEQ. 01</span>
                <span className="font-mono text-[10px] bg-[#C25E3E]/15 text-[#C25E3E] px-2 py-0.5 tracking-wider uppercase font-semibold">
                  Featured Series · Public Monograph Hero
                </span>
                <span className="font-mono text-xs text-[#716E68]">COL-LS-2024</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-[#FAF8F5] px-3 py-1 border border-[#E7E4DF]">
                  <span className="w-2 h-2 rounded-full bg-emerald-700"></span>
                  <span className="font-mono text-[10px] text-[#141413] uppercase tracking-wider">Visibility: Public</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2 pb-6">
              <div className="lg:col-span-4 flex flex-col space-y-2">
                <div className="relative aspect-[4/5] bg-[#efeeeb] overflow-hidden">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7YXFhij7pCRzhoUbVw8NMYuLRXm6okWCEH1Pi_zSI05IvglEgCfyO7al4hLyHCmQElzYmN7IFb80Z6M0KNyEz2Tudi0gNaKEt-GTV6JCAWxjbSzIYU6aN4nhpWI1q9fPy7S8nad03K1P3MDhoRBYgiOVs5amTmA6aHDNWJUUZqYFHnRYOBc97MMWV-E1w6os7eiXjHV8BN52PmC2LyK-ul-rxn8x4Qik_BPjWpQqvoz95zNMG6imgiA" alt="Tectonic Vessel" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute top-3 left-3 bg-[#141413]/80 text-white px-2 py-0.5 font-mono text-[10px] uppercase">Hero Piece</div>
                </div>
              </div>

              <div className="lg:col-span-8 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="font-serif text-2xl text-[#141413]">Lithic Strata Series (2023–2024)</h2>
                      <p className="font-mono text-xs text-[#716E68] mt-1">14 Catalogued Works · 9 Available for Acquisition · In Permanent Archive: 5</p>
                    </div>
                    <button onClick={() => onNavigate('home')} className="px-3 py-1.5 bg-[#efeeeb] hover:bg-[#e4e2df] font-sans text-xs text-[#141413] flex items-center gap-1.5 uppercase tracking-wider cursor-pointer">
                      <span>View Public Monograph</span>
                      <span className="material-symbols-outlined text-[14px]">north_east</span>
                    </button>
                  </div>

                  <div className="bg-[#FAF8F5] p-4 space-y-2 border border-[#E7E4DF]">
                    <span className="font-mono text-[10px] text-[#716E68] uppercase tracking-widest block">Curatorial Statement</span>
                    <p className="font-serif italic text-sm text-[#141413] leading-relaxed">
                      “An ongoing investigation into geological fractures, high-temperature wood kiln vitrification, and unglazed volcanic stoneware. Fired in continuous 96-hour cycles in the Tamba and Kyoto kilns, each monolithic form explores thermal stress thresholds where tectonic collapse and structural equilibrium meet.”
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#E7E4DF]">
                  <div className="flex items-center gap-2">
                    <button onClick={() => alert('Editing Statement & Order')} className="px-4 py-2 bg-[#141413] text-white hover:bg-[#C25E3E] transition-colors font-sans text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer">
                      <span className="material-symbols-outlined text-[16px]">edit_note</span>
                      <span>Edit Statement & Order</span>
                    </button>
                    <button onClick={() => onNavigate('artworks')} className="px-3 py-2 bg-[#efeeeb] hover:bg-[#e4e2df] transition-colors font-sans text-xs text-[#141413] flex items-center gap-1.5 uppercase tracking-wider cursor-pointer">
                      <span className="material-symbols-outlined text-[16px]">add_photo_alternate</span>
                      <span>Append Artworks</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Collection 2: Anagama Relics */}
          <article className="bg-white shadow-sm p-6 lg:p-8 border border-[#E7E4DF]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="font-mono text-[10px] bg-[#141413] text-white px-2 py-0.5 tracking-widest">SEQ. 02</span>
                <span className="font-mono text-[10px] bg-[#efeeeb] text-[#141413] px-2 py-0.5 tracking-wider uppercase font-semibold">
                  Historical Monograph Series
                </span>
                <span className="font-mono text-xs text-[#716E68]">COL-AR-2023</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-[#FAF8F5] px-3 py-1 border border-[#E7E4DF]">
                  <span className="w-2 h-2 rounded-full bg-emerald-700"></span>
                  <span className="font-mono text-[10px] text-[#141413] uppercase tracking-wider">Visibility: Public</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2 pb-6">
              <div className="lg:col-span-4 flex flex-col space-y-2">
                <div className="relative aspect-[4/5] bg-[#efeeeb] overflow-hidden">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtbItENgp3JHx2UNeqmCnt4rtae1iBPgL9U3ZPVy_faYhywEJOqCw3CIur_u4JhdneT3_5k8OS5PcBHWVyJL5ENwi8gHJjEDo8fpqN_kEyYYT0MyYw7j0PfDoCGkboq75GXQ_qMDS5Euldqpoue9OL4C40YStYnCfvHtb5QTmnQ85Z-3gt3Mqhe7Pw2t2Mb3soL5KJMJh9MW44LWihDobFDogEw50SYix8OSFjptIeDa73tXz4UmjcvQ" alt="Anagama Slag Jar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute top-3 left-3 bg-[#141413]/80 text-white px-2 py-0.5 font-mono text-[10px] uppercase">Catalog Cover</div>
                </div>
              </div>

              <div className="lg:col-span-8 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div>
                    <h2 className="font-serif text-2xl text-[#141413]">Anagama Relics & Kiln Slag (2022–2023)</h2>
                    <p className="font-mono text-xs text-[#716E68] mt-1">11 Catalogued Works · 4 Available · In Museum Collections: 6</p>
                  </div>
                  <div className="bg-[#FAF8F5] p-4 space-y-2 border border-[#E7E4DF]">
                    <span className="font-mono text-[10px] text-[#716E68] uppercase tracking-widest block">Curatorial Statement</span>
                    <p className="font-serif italic text-sm text-[#141413] leading-relaxed">
                      “Formative stoneware exploring thermal shock, wood ash accumulation, and scorched silica inclusions from single-chamber anagama firings in Shigaraki.”
                    </p>
                  </div>
                </div>
                <div className="pt-4 border-t border-[#E7E4DF]">
                  <button onClick={() => alert('Editing Anagama Relics')} className="px-4 py-2 bg-[#141413] text-white hover:bg-[#C25E3E] transition-colors font-sans text-xs uppercase tracking-wider cursor-pointer">
                    Edit Statement & Order
                  </button>
                </div>
              </div>
            </div>
          </article>
        </div>

        {/* STUDIO HOLDING TRAY: UNASSIGNED WORKS */}
        <section className="bg-white shadow-sm p-6 lg:p-8 space-y-4 border border-[#E7E4DF]" id="unassigned-drawer">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C25E3E]"></span>
                <h3 className="font-serif text-xl text-[#141413]">Studio Holding Tray: Unassigned Physical Works (4 Pieces)</h3>
              </div>
              <p className="font-sans text-xs text-[#716E68] mt-0.5">
                Archival works currently not assigned to any public exhibition series or monograph grouping. Drag directly into any series above.
              </p>
            </div>
            <button onClick={() => alert('Batch assigning unassigned works.')} className="px-3 py-1.5 bg-[#efeeeb] hover:bg-[#e4e2df] font-sans text-xs text-[#141413] uppercase tracking-wider cursor-pointer">
              Batch Assign
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            <div className="bg-[#FAF8F5] p-3 flex flex-col justify-between group hover:bg-[#efeeeb] transition-all border border-[#E7E4DF]">
              <div className="relative aspect-square bg-[#efeeeb] overflow-hidden mb-3">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDR1rVbALIudFaa9Er_GSAMQUZ7qqCDU0Z3xS83z0pNoMWKiVltQNO_6NH781Ipw0b-H81GR_d8pnIxEzXlGElFBXXmvYg4Z5DYS6ZpzV4xeVdmQVUvpR93uW_C-ZHjyp5u79SSmJi9_w8qCh6bVTb6PHjUFYN1X5GHke1a-kyYT8rEAxirnQCbDzD2fu6Zd02ViwF7ljt8GQaER-f_ppnOeCrm-2SSEwkGE0issYZy-wtsLvfiVvFPyQ" alt="Mineral Sieve Study I" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div>
                <span className="font-serif text-sm font-semibold text-[#141413] block">Mineral Sieve Study I</span>
                <span className="font-mono text-[11px] text-[#716E68] block">32 × 32 cm · Shigaraki Clay</span>
                <button onClick={() => alert('Assigned to Lithic Strata Series.')} className="mt-3 text-xs text-[#C25E3E] font-semibold hover:underline cursor-pointer">
                  + Assign to Series
                </button>
              </div>
            </div>

            <div className="bg-[#FAF8F5] p-3 flex flex-col justify-between group hover:bg-[#efeeeb] transition-all border border-[#E7E4DF]">
              <div className="relative aspect-square bg-[#efeeeb] overflow-hidden mb-3">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4Hk0Th5YMrv0VZ8HS2fs4xQ3C0QI4Khswj7tRokD_cDeW6W3YEfGr6TMfiAWJWwv8Ok3boXOgAAzHxLC9LUZbsmSIXPsu4yKFjy7QPA-KMOZ6hD9KLzibZsvLlPTuCJoRsnpizSN6g87dLlgjdfBqy8435Po7hKHUcTirYM5MLbxvOrWNfL9fL2xnNUH5N1xzqROpimUiXHkrYSMmQsZda3n6nBW9rlthgYEAWGP8XcX2_WKh0ypZ4A" alt="Terracotta Crucible" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div>
                <span className="font-serif text-sm font-semibold text-[#141413] block">Terracotta Crucible #02</span>
                <span className="font-mono text-[11px] text-[#716E68] block">24 × 18 cm · Terracotta</span>
                <button onClick={() => alert('Assigned to Anagama Relics.')} className="mt-3 text-xs text-[#C25E3E] font-semibold hover:underline cursor-pointer">
                  + Assign to Series
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* CREATE NEW COLLECTION MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-[#141413]/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-2xl w-full shadow-2xl p-6 lg:p-8 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#E7E4DF]">
              <h2 className="font-serif text-xl text-[#141413]">Create Thematic Series or Collection</h2>
              <button onClick={() => setModalOpen(false)} className="text-[#716E68] hover:text-[#141413] cursor-pointer">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block font-mono text-[10px] uppercase text-[#716E68] mb-1">Collection Title</label>
                <input type="text" placeholder="e.g. Vitrified Basalt Monoliths (2024–2025)" className="w-full bg-[#FAF8F5] p-3 text-xs font-sans border border-[#E7E4DF] focus:outline-none" />
              </div>
              <div>
                <label className="block font-mono text-[10px] uppercase text-[#716E68] mb-1">Curatorial Statement & Material Discourse</label>
                <textarea rows={3} placeholder="Articulate material investigation..." className="w-full bg-[#FAF8F5] p-3 text-xs font-sans border border-[#E7E4DF] focus:outline-none"></textarea>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 pt-3">
              <button onClick={() => setModalOpen(false)} className="px-5 py-2.5 bg-[#efeeeb] text-[#141413] font-sans text-xs uppercase cursor-pointer">Cancel</button>
              <button onClick={() => { setModalOpen(false); alert('Collection created successfully.'); }} className="px-6 py-2.5 bg-[#141413] text-white font-sans text-xs uppercase cursor-pointer">Initialize Collection</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
