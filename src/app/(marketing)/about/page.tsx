'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const STATS = [
  { value: '1,840+', label: 'Master Artisans' },
  { value: '48', label: 'Countries Represented' },
  { value: '19,900', label: 'Catalogued Works' },
  { value: '0.00%', label: 'Direct Sales Take' },
];

const PRINCIPLES = [
  {
    key: 'stillness',
    label: 'Stillness',
    title: 'Museum-grade stillness over app clutter',
    body: 'Every hairline, caption margin, and negative space coordinate is tuned to honour the artwork rather than decorate the interface. We remove before we add.',
  },
  {
    key: 'provenance',
    label: 'Provenance',
    title: 'A permanent record for every work',
    body: 'Physical craft deserves a documented lineage. Each catalogue entry carries medium, dimensions, process, and ownership history in a portable archival format.',
  },
  {
    key: 'autonomy',
    label: 'Autonomy',
    title: 'Artists keep their economics',
    body: 'No commission take on direct sales, no rented audience. Artists own their sovereign handle and their collector relationships outright.',
  },
  {
    key: 'access',
    label: 'Access',
    title: 'Craft legible to institutions',
    body: 'Scholarly metadata and interoperable material taxonomies make independent studio work readable to curators, registrars, and conservation desks.',
  },
];

const TIMELINE = [
  {
    year: '2019',
    title: 'A thesis in a ceramics kiln',
    body: 'Founded by a ceramicist and an archivist frustrated that serious physical work was being presented on e-commerce templates.',
  },
  {
    year: '2021',
    title: 'The Monograph Protocol',
    body: 'Atelier published its first open catalogue schema for artwork provenance, adopted by a handful of independent European galleries.',
  },
  {
    year: '2023',
    title: 'Structured Commission Intake',
    body: 'Formal briefs replaced scattered direct messages, giving collectors scope, budget brackets, and milestone visibility.',
  },
  {
    year: '2024',
    title: 'Global curatorial index',
    body: 'Eight disciplines and forty-eight countries are now catalogued under a single sovereign handle system.',
  },
];

const BOARD = [
  {
    name: 'Elena Vance',
    role: 'Founding Ceramist',
    detail: 'Zurich · Ceramics & Stoneware',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA_OZIHxQiVSi69bOnzUzDxaxc402g4IZXX16FUV2fc2s1Y-9ZfOS-EZwhXbX4BEPslXV7Q4RUT4KhIwC5I4uSG6fu6KBwRl2KkkoOfQ3bbJg-r_mc6n_ARg_E7nPUC2K6VWtCHJcBQFq3VpkEPBGXihmDamMguIThsYlY3DpnoTQdQLhMuCEXyO0-XolAuhrbbqsaU4vYqjFokHhI-OFQ6NWAa0j7GWJV03OArpe4SlJRGbRAcmTRFCA',
  },
  {
    name: 'Dr. Christine Moreau',
    role: 'Curatorial Advisor',
    detail: 'Palais des Arts Contemporains',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCDQ7QH4io-6NiDdPEFV0rjeSyzpCq29OBf750r-KMCIAXB6LsaJdVMLhCdxzuFclkXCrw0cEbmWioHblTQfOqIhFz-JkExxP6FQay9bsFio_CUGN0vU4LGox0MIz1uxvbGPkL5iux9-GwIsygmxGzsu8RXuF72VpWRAdIXYAEcnKoQZ_7XfeaYYxDoeAOgbWYhuf3ttp9Z3qVWAG-YSnLivXaGZ2Ylomfa85CRrfntc1pBK3wkqXx10w',
  },
  {
    name: 'Kenzo Takahashi',
    role: 'Discipline Steward',
    detail: 'Osaka · Sculpture & Bronze',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBAd26-G-ttNwsnAj2hEre4rnFje45GedTMR6yQIH3abiAtWVNMmGmfr6iUMNWM5bses2qNHUjOF9-PqQ_e_tbqwQmndurBkgy3A31uoVbZjqLr_TGBDw-VUqCigpFlupSpmA6B-CUW-8tvo2DteSX1vF_T1mJIqE8464OBjk1IXNmSS_vHnY6jMrQ3gnFJ7xVyKbamzdsG4Qm6pd-d-ck4nKR41f-4WvdlJtQtYYa4-87pF2hS4N7Edg',
  },
  {
    name: 'Mateo Rossi',
    role: 'Platform Standards',
    detail: 'Milan · Oil on Belgian Linen',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCOhCh0Gzb4gbzcHpC7bF0OynU3pZd6xR8e5rvrmEIqVgK053uqQ-OvRao8LRRkzypc4E4yR2vx3fh_eY6JfYlQWgdJdcDn6yFBR_FfVPsS2lM0IHQAviYO8ZqjFy-UjkC1LYFaYrRWkymavJtA-nytOv2RFKoF4kEc0O8I07CvOPo8JWAha70vCTIN6wq60jnl2TyZ2cpJgWTKxxJY7rht9KGwwWf2YQ0D2bHtU3VqYjpAsOjzwc1QZw',
  },
];

export default function AboutPage() {
  const [activePrinciple, setActivePrinciple] = useState(PRINCIPLES[0].key);
  const principle = PRINCIPLES.find((p) => p.key === activePrinciple) ?? PRINCIPLES[0];

  return (
    <div className="flex flex-col w-full bg-[#FAF8F5] text-[#1B1C1A]">
      {/* HERO — editorial charter composition */}
      <section className="relative w-full max-w-[1440px] mx-auto px-5 md:px-12 lg:px-16 pt-10 lg:pt-14 pb-16 overflow-hidden">
        {/* Architectural backdrop glows */}
        <div className="absolute -top-32 right-8 w-96 h-96 rounded-full bg-[#9a4023]/5 blur-3xl pointer-events-none -z-10"></div>
        <div className="absolute top-1/3 -left-24 w-80 h-80 rounded-full bg-[#C25E3E]/5 blur-3xl pointer-events-none -z-10"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-10 items-center">
          {/* Left column: the statement */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex flex-wrap items-center gap-2">
              <span className="w-2 h-2 bg-[#C25E3E]"></span>
              <span className="font-mono text-[10px] uppercase text-[#C25E3E] tracking-widest font-medium">
                The Atelier Charter
              </span>
              <span className="text-[#716E68] font-mono text-xs">/ EST. 2019 · REG. AT-2019-001</span>
            </div>

            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-[#141413] tracking-tight leading-[1.02]">
              A quiet home for{' '}
              <span className="italic font-normal text-[#56423d]">serious physical</span> craft.
            </h1>

            <p className="font-sans text-lg text-[#5f5e5d] max-w-xl leading-relaxed">
              Atelier is an archival portfolio and commission platform built with ceramicists,
              sculptors, painters, and printmakers — not for them. We exist to give museum-grade
              stillness to work made by hand.
            </p>

            <div className="flex flex-wrap items-center gap-5 pt-1">
              <Link
                href="/disciplines"
                className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-wider bg-[#141413] text-white px-6 py-3.5 hover:bg-[#C25E3E] transition-colors shadow-sm"
              >
                <span>Explore Disciplines</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
              <a
                href="#principles"
                className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-wider text-[#56423d] hover:text-[#141413] transition-colors"
              >
                <span>Our Four Principles</span>
                <span className="material-symbols-outlined text-[16px]">south</span>
              </a>
            </div>

            {/* Founding signature */}
            <div className="flex items-center gap-3 pt-4">
              <span className="w-9 h-9 rounded-full overflow-hidden border border-[#E7E4DF] shrink-0">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_OZIHxQiVSi69bOnzUzDxaxc402g4IZXX16FUV2fc2s1Y-9ZfOS-EZwhXbX4BEPslXV7Q4RUT4KhIwC5I4uSG6fu6KBwRl2KkkoOfQ3bbJg-r_mc6n_ARg_E7nPUC2K6VWtCHJcBQFq3VpkEPBGXihmDamMguIThsYlY3DpnoTQdQLhMuCEXyO0-XolAuhrbbqsaU4vYqjFokHhI-OFQ6NWAa0j7GWJV03OArpe4SlJRGbRAcmTRFCA"
                  alt="Elena Vance"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </span>
              <div>
                <span className="block font-serif italic text-sm text-[#56423d]">
                  “We built the room we wished existed.”
                </span>
                <span className="font-mono text-[10px] uppercase text-[#716E68] tracking-wider">
                  Elena Vance · Founding Ceramist
                </span>
              </div>
            </div>
          </div>

          {/* Right column: registry plate composition */}
          <div className="lg:col-span-5 relative">
            <div className="hidden xl:block absolute -left-9 top-28 [writing-mode:vertical-rl] rotate-180 font-mono text-[10px] uppercase text-[#716E68] tracking-widest select-none">
              Artisanal Registry — Vol. VI
            </div>

            {/* Primary plate */}
            <div className="relative bg-white p-4 border border-[#E7E4DF] shadow-md">
              <div className="flex items-center justify-between pb-3">
                <span className="font-serif text-sm text-[#141413]">Woven Monolith II</span>
                <span className="font-mono text-[11px] text-[#716E68]">Anya Lindqvist</span>
              </div>
              <div className="relative aspect-[4/5] bg-[#efeeeb] overflow-hidden">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKgBDzUGMPDHt9ebnUq6gCfj_lfFr7tTRq-QBx2viwxPnF5IqTvwSdw6j6QWV8wEHkAyoMs4GquGvMd-er5ar_iXpFz_u0zYY7cDlvj1U0kxp4z_m-LkiY9SAWr5v3g-O-Ezcac3WlCz1DZZoUMhiZKvhrNHEBJT9xey6JeCi7UbnN4GZoA7F-bJoBNgIpxdeAAbquD7dNKGzszsuapsAZmk8tPY0iKaBLG1GJyClN2MM49CP--i50fA"
                  alt="Woven Monolith II"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-[#141413]/90 text-white px-2 py-1">
                  <span className="font-mono text-[10px] uppercase tracking-wider">Plate I · Charter Ed.</span>
                </div>
              </div>
            </div>

            {/* Inset detail plate */}
            <div className="hidden sm:block absolute -bottom-5 -right-5 bg-white p-2 border border-[#E7E4DF] shadow-lg w-24 lg:w-28">
              <div className="aspect-square bg-[#efeeeb] overflow-hidden">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfpcvJIiJqG-61uu2eZzkd-p7joH3nu1pR4OJJIV9YgWhOwLv0T9bJ_qMFiilDALU0uE2Y8-C-rxDm5JGipt7B7qGYcIPO4N7Z0hExdku7JA3S5PVs3yWnBt6mi7Odbpif0cz_LzIuGf4uh5wlfumfy-HCiZbITrze-heFJtDNuh0u-SkCaKN2_Z-rp4Y5eSxNAz9czuVNVEzKMBbIeVzaHpn1exfY1yH_tyVizctSQFJ0yPB9dSyA7w"
                  alt="Basalt Urn IV"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Founding registry card */}
            <div className="absolute -bottom-6 left-2 sm:-left-0 lg:-left-10 bg-[#141413] text-white p-5 shadow-2xl w-60 border border-white/10">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
                <span className="font-mono text-[10px] uppercase text-[#ffb59e] tracking-widest">Founding Registry</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              </div>
              <div className="space-y-1.5 font-mono text-[11px]">
                <div className="flex justify-between"><span className="text-[#a9a6a3]">Established</span><span>MMXIX</span></div>
                <div className="flex justify-between"><span className="text-[#a9a6a3]">Disciplines</span><span>8</span></div>
                <div className="flex justify-between"><span className="text-[#a9a6a3]">Master Artisans</span><span>1,840+</span></div>
                <div className="flex justify-between"><span className="text-[#a9a6a3]">Take on Sales</span><span className="text-[#ffb59e]">0.00%</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Registry ledger (stats) */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 divide-[#E7E4DF] md:divide-x border-t border-b border-[#E7E4DF]">
          {STATS.map((s) => (
            <div key={s.label} className="px-4 sm:px-6 py-7">
              <span className="block font-serif text-3xl text-[#141413]">{s.value}</span>
              <span className="block font-mono text-[10px] uppercase text-[#716E68] mt-1 tracking-wider">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* MISSION + IMAGE */}
      <section className="w-full bg-[#f5f3f0] py-16 border-y border-[#E7E4DF]">
        <div className="w-full max-w-[1440px] mx-auto px-5 md:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 bg-white p-4 border border-[#E7E4DF] shadow-md">
            <div className="aspect-[4/5] bg-[#efeeeb] overflow-hidden">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvGGogkcLt5eV-ajKx_woPMP6EMUR-AddtGdwdF7dXkIjGYnaBcfJTHX70NL92oBSvpBz9IZ3nh8MEsK8yOa-AV8F6KZXqEuG6p4kotSU4CoxBqZXTCx8VtS-1BsMm1n2A08XwzxdRj1PiJx-VQW2EYI7KYZ_xvv1Ap2JvdEmbaXqVEpddyyDiAvsJN52im_iGm_E_BCGqtuo2r1XPSShbgXigZ7fz0nApThu68KBpEXExIkgYA00j1Q"
                alt="Tectonic Vessel No. 04"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <div className="lg:col-span-7 space-y-5">
            <span className="font-mono text-[10px] uppercase text-[#C25E3E] font-semibold tracking-widest block">
              Our Mission
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#141413] leading-tight">
              Generic builders flatten craft. We give it room to breathe.
            </h2>
            <p className="font-sans text-base text-[#5f5e5d] leading-relaxed">
              The web has no shortage of storefronts. What it lacks is a considered place for
              one-of-one work — where an unglazed stoneware vessel is presented with the same rigour as
              a gallery monograph, and where a collector can commission a piece without a dozen
              half-documented messages.
            </p>
            <p className="font-sans text-base text-[#5f5e5d] leading-relaxed">
              Atelier pairs a scholarly portfolio protocol with a structured commission workflow, so
              artists can stay in the studio and institutions can read the record with confidence.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/disciplines"
                className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-wider bg-[#141413] text-white px-6 py-3.5 hover:bg-[#C25E3E] transition-colors shadow-sm"
              >
                <span>Our Disciplines</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
              <Link
                href="/commissions"
                className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-wider border border-[#141413] text-[#141413] px-6 py-3.5 hover:bg-[#141413] hover:text-white transition-colors"
              >
                <span>Commission Protocol</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PRINCIPLES — interactive tabs */}
      <section id="principles" className="scroll-mt-24 w-full max-w-[1440px] mx-auto px-5 md:px-12 lg:px-16 py-16">
        <div className="max-w-2xl mb-10">
          <span className="font-mono text-[10px] uppercase text-[#C25E3E] font-semibold tracking-widest block mb-1">
            Four Principles
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-[#141413]">What We Hold To</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 flex flex-col divide-y divide-[#E7E4DF] border-y border-[#E7E4DF]">
            {PRINCIPLES.map((p) => (
              <button
                key={p.key}
                onClick={() => setActivePrinciple(p.key)}
                className={`flex items-center justify-between gap-4 px-2 py-5 text-left cursor-pointer transition-colors ${
                  activePrinciple === p.key ? 'text-[#141413]' : 'text-[#716E68] hover:text-[#141413]'
                }`}
              >
                <span className="font-serif text-2xl">{p.label}</span>
                <span
                  className={`font-mono text-[10px] uppercase tracking-wider px-2 py-1 ${
                    activePrinciple === p.key ? 'bg-[#141413] text-white' : 'bg-[#efeeeb] text-[#716E68]'
                  }`}
                >
                  {activePrinciple === p.key ? 'Active' : 'Read'}
                </span>
              </button>
            ))}
          </div>

          <div className="lg:col-span-8 bg-white border border-[#E7E4DF] p-8 md:p-10 flex flex-col justify-center min-h-[240px]">
            <span className="font-mono text-[10px] uppercase text-[#C25E3E] tracking-widest block mb-3">
              Principle · {principle.label}
            </span>
            <h3 className="font-serif text-2xl md:text-3xl text-[#141413] mb-4">{principle.title}</h3>
            <p className="font-sans text-sm text-[#5f5e5d] leading-relaxed max-w-2xl">{principle.body}</p>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="w-full bg-[#f5f3f0] py-16 border-y border-[#E7E4DF]">
        <div className="w-full max-w-[1440px] mx-auto px-5 md:px-12 lg:px-16">
          <div className="max-w-2xl mb-10">
            <span className="font-mono text-[10px] uppercase text-[#C25E3E] font-semibold tracking-widest block mb-1">
              Provenance of the Platform
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#141413]">A Short Institutional History</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TIMELINE.map((t) => (
              <div key={t.year} className="border-t-2 border-[#141413] pt-5">
                <span className="font-serif text-3xl text-[#C25E3E]">{t.year}</span>
                <h3 className="font-serif text-lg text-[#141413] mt-2">{t.title}</h3>
                <p className="font-sans text-xs text-[#5f5e5d] leading-relaxed mt-2">{t.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOARD */}
      <section className="w-full max-w-[1440px] mx-auto px-5 md:px-12 lg:px-16 py-16">
        <div className="max-w-2xl mb-10">
          <span className="font-mono text-[10px] uppercase text-[#C25E3E] font-semibold tracking-widest block mb-1">
            Curatorial Board
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-[#141413]">Practitioners, Not Marketers</h2>
          <p className="font-sans text-base text-[#5f5e5d] mt-2">
            Atelier is stewarded by the people who make, curate, and catalogue the work itself.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BOARD.map((m) => (
            <div key={m.name} className="bg-white border border-[#E7E4DF] shadow-sm group">
              <div className="aspect-square bg-[#efeeeb] overflow-hidden">
                <img
                  src={m.image}
                  alt={m.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-5">
                <h3 className="font-serif text-lg text-[#141413]">{m.name}</h3>
                <span className="font-mono text-xs text-[#C25E3E] block mt-1">{m.role}</span>
                <span className="font-mono text-[11px] text-[#716E68] block mt-2">{m.detail}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="w-full max-w-[1440px] mx-auto px-5 md:px-12 lg:px-16 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-[#141413] text-white p-8 md:p-12">
          <div className="lg:col-span-8 space-y-4">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#ffb59e]">
              Join the Registry
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-white leading-tight">
              Your work deserves a scholarly record.
            </h2>
            <p className="font-sans text-sm text-[#e4e2df] max-w-xl font-light">
              Claim a sovereign handle, catalogue your first collection, and let your practice be read
              the way it was meant to be.
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end">
            <Link
              href="/studio"
              className="bg-[#C25E3E] text-white font-sans text-xs uppercase tracking-wider px-7 py-3.5 hover:bg-white hover:text-[#141413] transition-colors text-center"
            >
              Start Your Atelier
            </Link>
            <Link
              href="/discover"
              className="border border-white/30 text-white font-sans text-xs uppercase tracking-wider px-7 py-3.5 hover:bg-white/10 transition-colors text-center"
            >
              Explore Creators
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
