"use client";

import React, { useState } from 'react';

interface ArtworksScreenProps {
  onNavigate: (path: string) => void;
}

export default function ArtworksScreen({ onNavigate }: ArtworksScreenProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [filterLedger, setFilterLedger] = useState<'all' | 'published' | 'drafts' | 'acquired'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const artworksData = [
    {
      id: 'EV-2024-004',
      title: 'Tectonic Vessel No. 04',
      series: 'Lithic Strata Series',
      status: 'Published',
      material: 'Unglazed Shigaraki Clay',
      dimensions: '48 × 32 × 30 cm',
      weight: '18.4 kg',
      valuation: '$4,200 USD (Inquire Only)',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDha1TzoOkLMLpC_Bs7xc7KfYol24S6Ozc4T_tILVTNXWd1gJMy-YCCGDNR81oSa67kPy8pmJeFcltIIXNq695dXm4t_l1MACK4MtgfbNGK8lh7B-Fuv4EdWZgMpa68X92X6c_Bvg5_CwsotT4UuE-POB_NYuijoPFFC-ILSD-hW_c2sWFqfpHMsb5RxFG3ODsN-VI6GDrd8-xM8geSl8ib4XETj5RSMQ62xAOPKzobR0Ms3cacjNzrUA',
      badge: 'Wood-Fired Anagama (72 Hrs)'
    },
    {
      id: 'EV-2023-089',
      title: 'Strata Monolith IX',
      series: 'Lithic Strata Series',
      status: 'Available',
      material: 'Coarse Chamotte & Ash',
      dimensions: '64 × 22 × 18 cm',
      weight: '21.0 kg',
      valuation: '$4,200 USD (Immediate Acquisition)',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfpcvJIiJqG-61uu2eZzkd-p7joH3nu1pR4OJJIV9YgWhOwLv0T9bJ_qMFiilDALU0uE2Y8-C-rxDm5JGipt7B7qGYcIPO4N7Z0hExdku7JA3S5PVs3yWnBt6mi7Odbpif0cz_LzIuGf4uh5wlfumfy-HCiZbITrze-heFJtDNuh0u-SkCaKN2_Z-rp4Y5eSxNAz9czuVNVEzKMBbIeVzaHpn1exfY1yH_tyVizctSQFJ0yPB9dSyA7w',
      badge: 'Featured Exhibition Pick'
    },
    {
      id: 'EV-2024-012',
      title: 'Erosion Bowl II',
      series: 'Anagama Relics',
      status: 'Draft',
      material: 'Black Mountain Clay',
      dimensions: '34 × 12 cm',
      weight: '9.2 kg',
      valuation: 'Unlisted / Studio Study',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAgSFBOOSLqsikOA5pn9dq_hAJRnoIEXH51BdJ_-1H6KJI3esGSF21l7pS-79vv4zlWZ2upyJVwIRhcL9VDpKKeMOcUsSYlQnQbhdkSVZt8TqTwxDhGRj3IybiCWW__UcUTj9SxXgkIkbXtUxPXyw1YtBE7ZMa2SXe5ARnAHg1rANHLfmb6J0yO7cq2x-eAYYBn4jkc0ZIxIYJbwptL086TW96wENVq-UselI4fajv9HLjkTlXqxuJm7Q',
      badge: 'Needs Hi-Res Macro Photometry'
    },
    {
      id: 'EV-2023-041',
      title: 'Vessel in Ochre & Ash',
      series: 'Lithic Strata Series',
      status: 'Acquired',
      material: 'Wood-Fired Stoneware',
      dimensions: '40 × 28 cm',
      weight: '14.1 kg',
      valuation: '$3,600 USD (Provenance Sealed)',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnqA26Qrl0TAF1fgHaioTZgQ9C1aJV7hCd3WUAinKIfyqTTMF2cRXlbe4MB_XfE9FZODvmTtyfk0MUXSEDX-sQBs3wSQ_Re5Z4gHOVI0jlMJIC0Oa5pkaVQ8p-1qUdsDoWu7HuYo-85b0mCX2exGodIHtSTDio6AbKY03jxMeCimzIPCO43SumkN9_TEFI9FMzmOUc1mfvYRtnKGaI0M_xKlLZSBbnOh2YqXYSYCfZkonV3iFktX3Fpg',
      badge: 'Geneva Private Collection'
    },
    {
      id: 'EV-2023-077',
      title: 'Fracture Column IV',
      series: 'Architectural Vessels',
      status: 'Private Archive',
      material: 'Coarse Chamotte Body',
      dimensions: '52 × 18 cm',
      weight: '24.5 kg',
      valuation: '$5,800 USD (Private Placement)',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtbRtqiIwj_7gW7_R2Dfcv-Ajybri2Wzww23lFMSPT2D2qv36SPptttwuK13Ow8aQHKZFmU7K9YZBb3O0jiLTePLEd6PgePbcxIddAuLMel87nozygj1_RnjYFG0QHx5pSFFrvG1ht-vwmWFjj70S0OHaBCOeBNa_ML0JQxYuL8RmiHJT2lF_Uv6fhFj21Q93VKp_wIMOOJ0wgydcLU3HS6qxwGpfY38XAtv1t6ZcQAk7JY2DBSqkoTg',
      badge: '1320°C Reduction Firing'
    },
    {
      id: 'EV-2024-002',
      title: 'Caldera Relic 02',
      series: 'Anagama Relics',
      status: 'Available',
      material: 'Volcanic Porous Clay',
      dimensions: '41 × 39 cm',
      weight: '16.0 kg',
      valuation: '$3,800 USD (Immediate Acquisition)',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMleKXqqQAXw99rnEONi9Rejyrm8vV1ATgfO6q1GExwKDlJO9lpSz8WN5mzcnRwimlbi7diVuKNMdQmELNpdV3vy1apiD68Qa7W-R_fMTxqiGwZavvhGmI6nLmDUgvCbVmpQDgfsJmFXTkgtLbq8V0wBSa7L3WXbCDSUjNPhxodL61FJc2AVlR3YbG9v7ILj9aCQX2SJ02HFaikXH3YSNJY7-7SzPYMGGiHo_DiNY8wxJdTNn5MTvVGQ',
      badge: 'High Iron Slip'
    },
    {
      id: 'EV-2024-015',
      title: 'Solstice Urn IV',
      series: 'Architectural Vessels',
      status: 'Allocated',
      material: 'Coarse Stoneware & Ash',
      dimensions: '55 × 34 cm',
      weight: '31.2 kg',
      valuation: '$6,500 USD (Dispatched Post-Cooling)',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGGZkTPGHcGB4-v9e4XT9hbifCYNSkihL52Aeraq7uphyWzcv1nZhc_g_lzlBw3P9HjkWw_aa58DSRL4Gi5dAIYasc8LCSVDN2Z7gfok5Q95LU5GShp6SXiVdBtFX00NmrTnB87nh1SvXoyFo6Hz8O7Z3wnVtEQrMD_LN3aZt2-QAon_88L6cjkqF6I9VlJkY5GpiAWWdbjvHDO438OECVYyjDz6peMF2jME428MR0mPON6z-H28YzbA',
      badge: 'Kiln Cooling (In Fulfillment Pipeline)'
    },
    {
      id: 'EV-2024-018',
      title: 'Mineral Sieve Study I',
      series: 'Unassigned Series',
      status: 'Draft',
      material: 'Raw Shigaraki Inclusions',
      dimensions: '22 × 16 cm',
      weight: '4.8 kg',
      valuation: 'Unlisted Studio Study',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFMNdxqFdWt8go6eZ8eGRQ_1I3J5GPBWZlVKiUnqE1lojCx5d-qze-sXkN6lu08PQx5vYTZh47oCMQBTfUxlO5MgPnuBSHUGVFB_c6KFTAfPmv6cQBbpg3OYqg0KhO9G7Ud1G-U4in-FJOdaM-XLYtehZussJebvZh7cX3hPw86mifOqQ9g9VzUHPCovhNnda_A3ozEFP14LNsDxEX6SNtszinO34uXGka-5lQUaG60G16ep1pu2qlSQ',
      badge: 'Studio Kiln Study (Unassigned)'
    }
  ];

  const toggleSelectAll = () => {
    if (selectedIds.length === artworksData.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(artworksData.map(a => a.id));
    }
  };

  const toggleSelectOne = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const filteredArtworks = artworksData.filter(art => {
    const matchesSearch = art.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          art.material.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          art.id.toLowerCase().includes(searchTerm.toLowerCase());
    if (filterLedger === 'published') return matchesSearch && art.status === 'Published';
    if (filterLedger === 'drafts') return matchesSearch && (art.status === 'Draft' || art.status === 'Available');
    if (filterLedger === 'acquired') return matchesSearch && (art.status === 'Acquired' || art.status === 'Private Archive');
    return matchesSearch;
  });

  return (
    <div className="flex flex-col w-full pb-20">
      {/* Archival Context Banner & Studio Breadcrumbs */}
      <section className="w-full bg-[#FAF8F5] border-b border-[#E7E4DF] px-5 lg:px-12 py-8">
        <div className="max-w-[1440px] mx-auto flex flex-col gap-6">
          <div className="flex flex-wrap items-center justify-between gap-y-2">
            <div className="flex items-center gap-2 text-[#716E68]">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#716E68]">Creator Studio</span>
              <span className="font-mono text-[10px] text-[#E7E4DF]">/</span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#716E68]">Physical Archive</span>
              <span className="font-mono text-[10px] text-[#E7E4DF]">/</span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#141413] font-semibold">Artworks Registry</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-white border border-[#E7E4DF] px-3 py-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-700"></span>
                <span className="font-mono text-[10px] text-[#141413] uppercase tracking-wider">Sync: Live Ledger</span>
              </div>
              <span className="font-mono text-xs text-[#716E68] hidden sm:inline">Storage: 18.4 / 50 GB (Lossless TIFF & RAW)</span>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pt-1">
            <div className="space-y-1">
              <h1 className="font-serif text-3xl md:text-4xl text-[#141413] tracking-tight">Artworks Archive</h1>
              <p className="font-sans text-sm text-[#716E68] max-w-2xl">
                34 catalogued physical works across stoneware, kiln extractions, and architectural monoliths. Curatorial provenance updated 4 hours ago.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button className="flex items-center gap-2 bg-white border border-[#141413] px-4 py-2.5 font-sans text-xs uppercase tracking-wider text-[#141413] hover:bg-[#141413] hover:text-white transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-[16px]">rule</span>
                <span>Batch Actions</span>
              </button>
              <button 
                onClick={() => alert('New Masterwork uploader ready. Drop raw 16-bit TIFF/RAW captures.')}
                className="flex items-center gap-2 bg-[#C25E3E] text-white px-5 py-2.5 font-sans text-xs uppercase tracking-wider hover:bg-[#141413] transition-colors shadow-sm cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">add_circle</span>
                <span>+ New Masterwork</span>
              </button>
            </div>
          </div>

          {/* Quick Status Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#E7E4DF]">
            <span className="font-mono text-[10px] text-[#716E68] uppercase tracking-widest mr-2">Curation Ledger:</span>
            <button 
              onClick={() => setFilterLedger('all')}
              className={`px-3 py-1 font-mono text-[10px] uppercase tracking-wider flex items-center gap-1.5 cursor-pointer ${filterLedger === 'all' ? 'bg-[#141413] text-white' : 'bg-white border border-[#E7E4DF] text-[#141413]'}`}
            >
              <span>All Registry</span>
              <span className="font-mono text-[10px] opacity-80">(34)</span>
            </button>
            <button 
              onClick={() => setFilterLedger('published')}
              className={`px-3 py-1 font-mono text-[10px] uppercase tracking-wider flex items-center gap-1.5 cursor-pointer ${filterLedger === 'published' ? 'bg-[#141413] text-white' : 'bg-white border border-[#E7E4DF] text-[#141413]'}`}
            >
              <span>Published</span>
              <span className="font-mono text-[10px] text-[#716E68]">(22)</span>
            </button>
            <button 
              onClick={() => setFilterLedger('drafts')}
              className={`px-3 py-1 font-mono text-[10px] uppercase tracking-wider flex items-center gap-1.5 cursor-pointer ${filterLedger === 'drafts' ? 'bg-[#141413] text-white' : 'bg-white border border-[#E7E4DF] text-[#141413]'}`}
            >
              <span>In Kiln / Drafts</span>
              <span className="font-mono text-[10px] text-[#716E68]">(8)</span>
            </button>
            <button 
              onClick={() => setFilterLedger('acquired')}
              className={`px-3 py-1 font-mono text-[10px] uppercase tracking-wider flex items-center gap-1.5 cursor-pointer ${filterLedger === 'acquired' ? 'bg-[#141413] text-white' : 'bg-white border border-[#E7E4DF] text-[#141413]'}`}
            >
              <span>Acquired & Private Provenance</span>
              <span className="font-mono text-[10px] text-[#716E68]">(4)</span>
            </button>
          </div>
        </div>
      </section>

      {/* Filter Controls & Search Ribbon */}
      <section className="w-full bg-white border-b border-[#E7E4DF] sticky top-16 z-20 px-5 lg:px-12 py-3 shadow-sm">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-lg">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#716E68] text-[18px]">search</span>
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter by title, medium, catalog accession #, or year..." 
              className="w-full pl-10 pr-4 py-2 bg-[#FAF8F5] border border-[#E7E4DF] font-sans text-xs text-[#141413] placeholder:text-[#716E68] focus:outline-none focus:border-[#C25E3E]"
            />
            <span className="font-mono text-[10px] absolute right-3 top-1/2 -translate-y-1/2 text-[#716E68] uppercase tracking-widest hidden sm:inline">ESC to clear</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select className="bg-[#FAF8F5] border border-[#E7E4DF] px-3 py-2 font-mono text-xs text-[#141413] cursor-pointer">
              <option>All Media (Stoneware, Chamotte, Ash)</option>
              <option>Unglazed Shigaraki Clay</option>
            </select>
            <select className="bg-[#FAF8F5] border border-[#E7E4DF] px-3 py-2 font-mono text-xs text-[#141413] cursor-pointer hidden xl:block">
              <option>All Collections (3 Series)</option>
              <option>Lithic Strata Series</option>
            </select>
            <select className="bg-[#FAF8F5] border border-[#E7E4DF] px-3 py-2 font-mono text-xs text-[#141413] cursor-pointer">
              <option>Sort: Latest Firing (Desc)</option>
              <option>Sort: Accession ID (Asc)</option>
            </select>
          </div>
        </div>
      </section>

      {/* Curatorial Archival Grid */}
      <main className="w-full px-5 lg:px-12 py-8 max-w-[1440px] mx-auto flex-1">
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#E7E4DF]">
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={selectedIds.length === artworksData.length && artworksData.length > 0}
                onChange={toggleSelectAll}
                className="w-3.5 h-3.5 border border-[#141413] rounded-none accent-[#141413] cursor-pointer" 
              />
              <span className="font-mono text-[10px] text-[#716E68] uppercase tracking-widest">Select All (34 Archival Works)</span>
            </label>
            <span className="font-mono text-xs text-[#C25E3E]" id="selected-counter">{selectedIds.length} selected</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] text-[#716E68] uppercase tracking-wider">Curatorial Standard: ISO 14001 Archival</span>
            <button onClick={() => alert('Registry re-indexed successfully.')} className="text-[#716E68] hover:text-[#141413] transition-colors flex items-center gap-1 font-mono text-[10px] uppercase cursor-pointer">
              <span className="material-symbols-outlined text-[14px]">refresh</span>
              <span>Re-index</span>
            </button>
          </div>
        </div>

        {/* Bento Artwork Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredArtworks.map(art => {
            const isChecked = selectedIds.includes(art.id);
            return (
              <article key={art.id} className="group bg-white border border-[#E7E4DF] flex flex-col justify-between hover:border-[#141413] transition-colors">
                <div className="relative bg-[#FAF8F5] overflow-hidden border-b border-[#E7E4DF] aspect-[4/5] flex items-center justify-center p-4">
                  <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      checked={isChecked}
                      onChange={() => toggleSelectOne(art.id)}
                      className="w-3.5 h-3.5 border border-[#141413] rounded-none accent-[#141413] cursor-pointer" 
                    />
                    <span className="bg-[#141413] text-white px-2 py-0.5 font-mono text-[10px] tracking-widest uppercase">INV #{art.id}</span>
                  </div>
                  <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => alert(`Opening high-res zoom for ${art.title}`)} className="p-2 bg-white border border-[#E7E4DF] hover:bg-[#141413] hover:text-white transition-colors cursor-pointer" title="Zoom Inspector">
                      <span className="material-symbols-outlined text-[16px]">zoom_in</span>
                    </button>
                    <button onClick={() => alert(`Generating placard PDF for ${art.title}`)} className="p-2 bg-white border border-[#E7E4DF] hover:bg-[#141413] hover:text-white transition-colors cursor-pointer" title="Print Placard">
                      <span className="material-symbols-outlined text-[16px]">print</span>
                    </button>
                  </div>
                  <img src={art.image} alt={art.title} className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-500" referrerPolicy="no-referrer" />
                  <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center pointer-events-none">
                    <span className="bg-white/90 backdrop-blur-sm border border-[#E7E4DF] px-2 py-0.5 font-mono text-[10px] text-[#141413] uppercase tracking-wider">
                      {art.badge}
                    </span>
                  </div>
                </div>

                <div className="p-4 flex flex-col flex-1 justify-between bg-white">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="font-mono text-[10px] text-[#C25E3E] uppercase tracking-wider block">{art.series}</span>
                        <h3 className="font-serif text-lg text-[#141413] tracking-tight pt-0.5">{art.title}</h3>
                      </div>
                      <span className="bg-[#f5f3f0] text-[#141413] border border-[#E7E4DF] px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider whitespace-nowrap">
                        {art.status}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-[#E7E4DF]/60 space-y-1 font-mono text-[11px] text-[#716E68]">
                      <div className="flex justify-between">
                        <span>Material:</span>
                        <span className="text-[#141413] font-medium">{art.material}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Dimensions:</span>
                        <span className="text-[#141413] font-medium">{art.dimensions}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Weight:</span>
                        <span className="text-[#141413] font-medium">{art.weight}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#E7E4DF] flex items-center justify-between">
                    <div>
                      <span className="font-mono text-[9px] text-[#716E68] uppercase tracking-widest block">Valuation</span>
                      <span className="font-sans text-xs font-semibold text-[#141413]">{art.valuation}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button onClick={() => alert(`Editing master record ${art.id}`)} className="px-3 py-1.5 border border-[#E7E4DF] hover:border-[#141413] font-sans text-xs uppercase tracking-wider text-[#141413] hover:bg-[#FAF8F5] transition-colors cursor-pointer">
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </main>

      {/* Floating Museum Ledger Status Pill & Batch Bar */}
      {selectedIds.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-[#141413] text-white shadow-2xl px-6 py-3 border border-white/20 flex items-center gap-6 max-w-xl w-[90%] sm:w-auto transition-transform duration-300">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#C25E3E] animate-ping"></span>
            <span className="font-mono text-xs tracking-widest uppercase font-semibold">{selectedIds.length} Works Selected</span>
          </div>
          <div className="h-4 w-px bg-white/20"></div>
          <div className="flex items-center gap-2">
            <button onClick={() => alert(`Exporting placards for ${selectedIds.length} works.`)} className="font-sans text-xs uppercase tracking-wider text-white hover:text-[#C25E3E] transition-colors flex items-center gap-1 cursor-pointer">
              <span className="material-symbols-outlined text-[16px]">picture_as_pdf</span>
              <span className="hidden sm:inline">Export Placards</span>
            </button>
            <span className="text-white/40 hidden sm:inline">·</span>
            <button onClick={() => alert(`Assigning series for ${selectedIds.length} works.`)} className="font-sans text-xs uppercase tracking-wider text-white hover:text-[#C25E3E] transition-colors flex items-center gap-1 cursor-pointer">
              <span className="material-symbols-outlined text-[16px]">drive_file_move</span>
              <span className="hidden sm:inline">Assign Series</span>
            </button>
          </div>
          <button onClick={() => setSelectedIds([])} className="text-white/60 hover:text-white transition-colors ml-auto cursor-pointer" title="Clear Selection">
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>
      )}
    </div>
  );
}
