import React from 'react';

interface ProductsScreenProps {
  onNavigate: (path: string) => void;
}

export default function ProductsScreen({ onNavigate }: ProductsScreenProps) {
  return (
    <div className="flex flex-col w-full pb-20">
      <div className="w-full bg-white px-5 lg:px-12 py-8 flex flex-col gap-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] text-[#716E68] uppercase tracking-widest">Creator Studio</span>
            <span className="text-[#716E68] font-mono text-[10px]">/</span>
            <span className="font-mono text-[10px] text-[#716E68] uppercase tracking-widest">Commerce & Editions</span>
            <span className="text-[#716E68] font-mono text-[10px]">/</span>
            <span className="font-mono text-[10px] text-[#141413] font-semibold uppercase tracking-widest bg-[#FAF8F5] px-2 py-0.5">Products & Multiples</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#FAF8F5] text-[#1b1c1a]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C25E3E] animate-pulse"></span>
              <span className="font-mono text-[10px] uppercase text-[#141413] tracking-wider">Inventory Ledger: Live Synchronized</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pt-1">
          <div className="max-w-3xl space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#C25E3E] bg-[#C25E3E]/10 px-2 py-0.5 mb-2 inline-block">Atelier Multiples Register · Vol. IV</span>
            <h1 className="font-serif text-3xl md:text-4xl text-[#141413] tracking-tight">Products & Multiples</h1>
            <p className="font-sans text-sm text-[#716E68] max-w-2xl">
              Curate limited release multiples, exhibition print monographs, signed foundry editions, and artisanal ceramic runs with verifiable cryptographic provenance certificates.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button onClick={() => alert('Exporting cryptographic authenticity certificates.')} className="bg-[#efeeeb] hover:bg-[#e4e2df] text-[#141413] transition-colors px-4 py-3 font-sans text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              <span>Export Certificates</span>
            </button>
            <button onClick={() => alert('Running ISO 14001 inventory audit.')} className="bg-[#efeeeb] hover:bg-[#e4e2df] text-[#141413] transition-colors px-4 py-3 font-sans text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer">
              <span className="material-symbols-outlined text-[16px]">rule</span>
              <span>Inventory Audit</span>
            </button>
            <button onClick={() => alert('Creating new edition batch.')} className="bg-[#141413] hover:bg-[#C25E3E] text-white transition-colors px-6 py-3 font-sans text-xs uppercase tracking-wider flex items-center gap-2 shadow-sm cursor-pointer">
              <span className="material-symbols-outlined text-[16px]">add</span>
              <span>+ Create New Edition</span>
            </button>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[1440px] mx-auto px-5 lg:px-12 py-10 space-y-10">
        {/* KPI Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-6 flex flex-col justify-between shadow-sm border border-[#E7E4DF]">
            <div className="flex items-start justify-between">
              <span className="font-mono text-[10px] uppercase text-[#716E68] tracking-wider">Active Runs & Batches</span>
              <span className="material-symbols-outlined text-[#716E68] text-[18px]">inventory_2</span>
            </div>
            <div className="my-4">
              <div className="font-serif text-3xl text-[#141413]">6 Editions</div>
              <p className="font-mono text-xs text-[#716E68] mt-1">184 Total Units Minted / Fabricated</p>
            </div>
            <div className="flex items-center gap-2 pt-2 bg-[#FAF8F5] px-3 py-1.5 -mx-6 -mb-6 mt-2 border-t border-[#E7E4DF]">
              <span className="w-1.5 h-1.5 bg-[#141413]"></span>
              <span className="font-mono text-[10px] text-[#141413] uppercase">Allocation: 84.2% Booked</span>
            </div>
          </div>

          <div className="bg-white p-6 flex flex-col justify-between shadow-sm border border-[#E7E4DF]">
            <div className="flex items-start justify-between">
              <span className="font-mono text-[10px] uppercase text-[#716E68] tracking-wider">Sell-Through Rate</span>
              <span className="material-symbols-outlined text-[#C25E3E] text-[18px]">trending_up</span>
            </div>
            <div className="my-4">
              <div className="font-serif text-3xl text-[#141413]">82.4%</div>
              <div className="flex items-center gap-1.5 text-[#C25E3E] font-mono text-xs mt-1">
                <span>+14.0%</span>
                <span className="text-[#716E68]">vs. Previous Quarter</span>
              </div>
            </div>
            <div className="w-full bg-[#efeeeb] h-1 overflow-hidden -mx-6 -mb-6 mt-2 w-[calc(100%+3rem)]">
              <div className="bg-[#C25E3E] h-full" style={{ width: '82.4%' }}></div>
            </div>
          </div>

          <div className="bg-white p-6 flex flex-col justify-between shadow-sm border border-[#E7E4DF]">
            <div className="flex items-start justify-between">
              <span className="font-mono text-[10px] uppercase text-[#716E68] tracking-wider">Gross Editions Revenue</span>
              <span className="material-symbols-outlined text-[#716E68] text-[18px]">account_balance_wallet</span>
            </div>
            <div className="my-4">
              <div className="font-serif text-3xl text-[#141413]">$28,450 USD</div>
              <p className="font-mono text-xs text-[#716E68] mt-1">Average Realized Unit: $340 USD</p>
            </div>
            <div className="flex items-center justify-between pt-2 bg-[#FAF8F5] px-3 py-1.5 -mx-6 -mb-6 mt-2 border-t border-[#E7E4DF]">
              <span className="font-mono text-[10px] text-[#716E68] uppercase">Stripe: $22.1k</span>
              <span className="font-mono text-[10px] text-[#716E68] uppercase">Vault / Eth: $6.3k</span>
            </div>
          </div>

          <div className="bg-white p-6 flex flex-col justify-between shadow-sm border border-[#E7E4DF]">
            <div className="flex items-start justify-between">
              <span className="font-mono text-[10px] uppercase text-[#C25E3E] tracking-wider">Low Stock / Kiln Batches</span>
              <span className="material-symbols-outlined text-[#C25E3E] text-[18px]">warning</span>
            </div>
            <div className="my-4">
              <div className="font-serif text-3xl text-[#C25E3E]">2 Alerts</div>
              <p className="font-mono text-xs text-[#716E68] mt-1">Requires numbered signing or final QA</p>
            </div>
            <div className="flex items-center gap-1.5 pt-2 bg-[#C25E3E]/10 px-3 py-1.5 -mx-6 -mb-6 mt-2">
              <span className="font-mono text-[10px] text-[#C25E3E] uppercase font-medium">Batch 08 Inspection Pending</span>
            </div>
          </div>
        </div>

        {/* Product & Edition Inventory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white flex flex-col justify-between shadow-sm border border-[#E7E4DF]">
            <div>
              <div className="relative w-full aspect-[4/3] bg-[#FAF8F5] overflow-hidden">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYJnzdGd6yJ39ArE2IluBLTQ5iMRNhd13TF7j4w_whQeqBxxwv6A84o5A-yvoqGiq3Zf0ZALQFw3mRdFt79Z5ljWip6uCjRjO6VLRnXHPylkOfwsWwKvVRRi8t-lGptCrmPtdSNpryHK9hqS2lJrs7RDkB4bCryoNW4eAwZNJzmXKzOczyYIac8BfPCYdaIXQvclkZBEQl7MmXgRUkBD6hngZhaWptwp8ThvAd5ewrRRJJrAT5vuM7rw" alt="Shigaraki Chawan" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
                  <span className="font-mono text-[10px] bg-[#C25E3E] text-white px-2 py-0.5 uppercase">EDITION 24 OF 30 AVAILABLE</span>
                  <span className="font-mono text-[10px] bg-[#141413] text-white px-2 py-0.5 uppercase">IN PRODUCTION</span>
                </div>
                <div className="absolute bottom-3 right-3">
                  <span className="font-mono text-xs bg-white/90 text-[#141413] px-2 py-0.5 font-medium">$380 USD</span>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between text-[#716E68] font-mono text-xs">
                  <span>ED-CS-2024-08 · RUN NO. 03</span>
                  <span>Ceramic Multiple</span>
                </div>
                <div>
                  <h3 className="font-serif text-lg text-[#141413]">Shigaraki Black Faceted Chawan (Limited Run of 30)</h3>
                  <p className="font-mono text-xs text-[#716E68] mt-1">Coarse Shigaraki Fireclay, Pine Ash Glaze, 11 × 9 cm</p>
                </div>
                <div className="bg-[#FAF8F5] p-3 space-y-1 border border-[#E7E4DF]">
                  <span className="font-mono text-[10px] uppercase text-[#716E68] block">Archival Inclusions:</span>
                  <p className="font-sans text-xs text-[#141413]">Paulownia Kiribako Wooden Box, Signed Provenance Certificate, Wax Stamp Seal</p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-[#FAF8F5] flex items-center justify-between gap-2 border-t border-[#E7E4DF]">
              <button onClick={() => alert('Managing run ED-CS-2024-08')} className="flex-1 bg-[#141413] hover:bg-[#C25E3E] text-white py-2 px-3 font-sans text-xs uppercase tracking-wider transition-colors text-center cursor-pointer">
                Manage Run
              </button>
              <button onClick={() => alert('Printing labels')} className="bg-white hover:bg-[#efeeeb] text-[#141413] py-2 px-3 font-sans text-xs uppercase tracking-wider border border-[#E7E4DF] cursor-pointer">
                Labels
              </button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white flex flex-col justify-between shadow-sm border border-[#E7E4DF]">
            <div>
              <div className="relative w-full aspect-[4/3] bg-[#FAF8F5] overflow-hidden">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4pAH4AW4NYoMmEhjYIn-6HYg1hfExGIIGXBxn8QRqQTH8KSf_RfDEh_FJ9jgRXVpp7UpTpqdLWL1vmIpXI87ycZ4NDY9l07SWfQdmYu811nLynDuOaPfrs1Yznu32nSUcyfr3P_z1acPA32XwAGe9AtLAZYeSG8A1BnQWtDus_5zY-HK7AX882pouCnD940mUzZegUJEVUwduDkk4-4chFQkVDSIy4wSV8VouKuT-3FTEEdhOAb3RGA" alt="Monograph Folio" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
                  <span className="font-mono text-[10px] bg-[#141413] text-white px-2 py-0.5 uppercase">LIMITED FOLIO · 12 / 50 REMAINING</span>
                </div>
                <div className="absolute bottom-3 right-3">
                  <span className="font-mono text-xs bg-white/90 text-[#141413] px-2 py-0.5 font-medium">$650 USD</span>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between text-[#716E68] font-mono text-xs">
                  <span>ED-PR-2024-02</span>
                  <span>Print Edition</span>
                </div>
                <div>
                  <h3 className="font-serif text-lg text-[#141413]">Lithic Strata Monograph Folio (Set of 4 Prints)</h3>
                  <p className="font-mono text-xs text-[#716E68] mt-1">Hahnemühle Photo Rag 308gsm, 40 × 50 cm</p>
                </div>
                <div className="bg-[#FAF8F5] p-3 space-y-1 border border-[#E7E4DF]">
                  <span className="font-mono text-[10px] uppercase text-[#716E68] block">Archival Inclusions:</span>
                  <p className="font-sans text-xs text-[#141413]">Acid-free linen clamshell box, cotton inspection gloves, signed colophon</p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-[#FAF8F5] flex items-center justify-between gap-2 border-t border-[#E7E4DF]">
              <button onClick={() => alert('Managing run')} className="flex-1 bg-[#141413] hover:bg-[#C25E3E] text-white py-2 px-3 font-sans text-xs uppercase tracking-wider transition-colors text-center cursor-pointer">
                Manage Run
              </button>
              <button onClick={() => alert('Certificate dossier')} className="bg-white hover:bg-[#efeeeb] text-[#141413] py-2 px-3 font-sans text-xs uppercase tracking-wider border border-[#E7E4DF] cursor-pointer">
                Certificate Dossier
              </button>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white flex flex-col justify-between shadow-sm border border-[#E7E4DF]">
            <div>
              <div className="relative w-full aspect-[4/3] bg-[#FAF8F5] overflow-hidden">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwpjc-d03NZ_KnkFWX2YhgBhFp1CEg5seWLD1cx9a7-AkmuPz5GkWN9e02CwcdJ0FD0lkajQsk_W-FqQ3pYC2hiBKhn1vtO1GubP1t4yVLnrxE9m4EO96D9hVGOnWTMJ7iUzqfR1jUrf3R49lp7wdYk2woUNPj6OeNzz-NejRmKZNogEA-oAULAgfkrVULRonhdWpmAivlcyWZWp4RTW4MJsvq4vK0HKQTwmCyLYi4Dcm64H_mTguKBQ" alt="Cast Bronze Talisman" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
                  <span className="font-mono text-[10px] bg-[#C25E3E] text-white px-2 py-0.5 uppercase">FOUNDRY CAST · PRE-ORDER</span>
                </div>
                <div className="absolute bottom-3 right-3">
                  <span className="font-mono text-xs bg-white/90 text-[#141413] px-2 py-0.5 font-medium">$1,200 USD</span>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between text-[#716E68] font-mono text-xs">
                  <span>ED-BR-2024-01 · EDITION OF 15</span>
                  <span>Foundry Bronze</span>
                </div>
                <div>
                  <h3 className="font-serif text-lg text-[#141413]">Tectonic Shard Talisman (Lost-Wax Cast Bronze)</h3>
                  <p className="font-mono text-xs text-[#716E68] mt-1">Hand-patinated silicon bronze, 16 × 8 × 6 cm</p>
                </div>
                <div className="bg-[#FAF8F5] p-3 space-y-1 border border-[#E7E4DF]">
                  <span className="font-mono text-[10px] uppercase text-[#716E68] block">Archival Inclusions:</span>
                  <p className="font-sans text-xs text-[#141413]">Custom milled blackened steel plinth, felt travel pouch, foundry certificate</p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-[#FAF8F5] flex items-center justify-between gap-2 border-t border-[#E7E4DF]">
              <button onClick={() => alert('Casting log')} className="flex-1 bg-[#141413] hover:bg-[#C25E3E] text-white py-2 px-3 font-sans text-xs uppercase tracking-wider transition-colors text-center cursor-pointer">
                View Casting Log
              </button>
              <button onClick={() => alert('Allocate')} className="bg-white hover:bg-[#efeeeb] text-[#141413] py-2 px-3 font-sans text-xs uppercase tracking-wider border border-[#E7E4DF] cursor-pointer">
                Allocate
              </button>
            </div>
          </div>
        </div>

        {/* Cryptographic Certificate of Authenticity & QR Provenance Engine */}
        <div className="bg-white p-8 lg:p-10 shadow-sm relative overflow-hidden border border-[#E7E4DF]">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative z-10">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#C25E3E] text-[22px]">workspace_premium</span>
                <span className="font-mono text-[10px] uppercase text-[#C25E3E] tracking-widest font-semibold">Atelier Cryptographic Verification & Minting</span>
              </div>
              <h2 className="font-serif text-2xl text-[#141413]">Certificate of Authenticity & QR Provenance Engine</h2>
              <p className="font-sans text-sm text-[#716E68]">
                Every physical multiple produced within Atelier can be paired with an immutable cryptographic serial number and laser-etched or printed micro-QR code. Collectors scan the physical seal to verify edition number, kiln temperature log, and secondary royalty ledger.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto shrink-0">
              <button onClick={() => alert('Batch generating QR codes.')} className="bg-[#141413] hover:bg-[#C25E3E] text-white transition-colors px-6 py-3 font-sans text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-sm">
                <span className="material-symbols-outlined text-[16px]">qr_code_2</span>
                <span>Batch Generate QR Codes</span>
              </button>
              <button onClick={() => alert('Downloading signed print templates.')} className="bg-[#FAF8F5] hover:bg-[#efeeeb] text-[#141413] transition-colors px-6 py-3 font-sans text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-[#E7E4DF] cursor-pointer">
                <span className="material-symbols-outlined text-[16px]">picture_as_pdf</span>
                <span>Download Print Templates (PDF)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
