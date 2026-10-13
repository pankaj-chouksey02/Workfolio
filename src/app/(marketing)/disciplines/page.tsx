'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { ARTWORK_CATEGORIES } from '../../../lib/constants';

interface Discipline {
  name: string;
  handle: string;
  medium: string;
  origin: string;
  ateliers: number;
  works: number;
  description: string;
  image: string;
}

const DISCIPLINES: Discipline[] = [
  {
    name: 'Ceramics',
    handle: 'ceramics',
    medium: 'Stoneware · Porcelain · Raku',
    origin: 'Zurich · Kyoto · Stoke-on-Trent',
    ateliers: 214,
    works: 3860,
    description:
      'Wheel-thrown and hand-built vessels exploring reduction firing, ash glazing, and geological fracture.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAvGGogkcLt5eV-ajKx_woPMP6EMUR-AddtGdwdF7dXkIjGYnaBcfJTHX70NL92oBSvpBz9IZ3nh8MEsK8yOa-AV8F6KZXqEuG6p4kotSU4CoxBqZXTCx8VtS-1BsMm1n2A08XwzxdRj1PiJx-VQW2EYI7KYZ_xvv1Ap2JvdEmbaXqVEpddyyDiAvsJN52im_iGm_E_BCGqtuo2r1XPSShbgXigZ7fz0nApThu68KBpEXExIkgYA00j1Q',
  },
  {
    name: 'Sculpture',
    handle: 'sculpture',
    medium: 'Bronze · Cast Iron · Basalt',
    origin: 'Florence · Osaka · Detroit',
    ateliers: 168,
    works: 2410,
    description:
      'Lost-wax casting and direct carving studying equilibrium, weight distribution, and tactile oxidation patinas.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBzt-nlJjKIE6iyQn7OLQjNqenXOl1E_hZ16vTYrDZqWxAee87yLMtc13Mh8RdW-8E2i9k0t-zWyYqjRYSQre9qiVrlNNdqbcYmtePvw4r52ytErZyp1ZeWWvfO1F-Ny5v18058Hxg63ftoWoHRd2Pud9UEks4Zbto2E8-dpAv2Mx2cwnRxD8_0KcJDv0tHidJbJgxBKlZlCYRe2d5QQwaeHgMuYBo0x3Hxvgls14G3Q0GImlVEKkLGMQ',
  },
  {
    name: 'Oil Painting',
    handle: 'oil-painting',
    medium: 'Impasto on Belgian Linen',
    origin: 'Milan · Lisbon · New York',
    ateliers: 302,
    works: 5120,
    description:
      'Meditative chromatic gradients and impasto surfaces probing atmospheric solitude and maritime light.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA8RYtNqL0dR6W8yb7CAlFBNB2wqaFpCj6BPSaYgKSf9tmzmfSVyxha3J0-88T7HT1fZIri1xKbOnGjZpInsgXUqHm95pqtuw8roOdiuKIkq7KHaoR4Lt5mshP_s8tRCUTaLqzuhO7d_S7dfdbE06AO__I8a2v4e1O1r57XSLKYKIxXatjV_W8FPk0daorJux8c0ovDTqu_J-pv60JP5qR4TgXYJw3DOYYtYHrFkUB7AH5R2zhmTnvJpw',
  },
  {
    name: 'Printmaking',
    handle: 'printmaking',
    medium: 'Etching · Lithography · Woodcut',
    origin: 'Vienna · Kyoto · Antwerp',
    ateliers: 121,
    works: 1980,
    description:
      'Intaglio and relief editions where plate wear, registration, and hand-pulled ink become part of the record.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDMleKXqqQAXw99rnEONi9Rejyrm8vV1ATgfO6q1GExwKDlJO9lpSz8WN5mzcnRwimlbi7diVuKNMdQmELNpdV3vy1apiD68Qa7W-R_fMTxqiGwZavvhGmI6nLmDUgvCbVmpQDgfsJmFXTkgtLbq8V0wBSa7L3WXbCDSUjNPhxodL61FJc2AVlR3YbG9v7ILj9aCQX2SJ02HFaikXH3YSNJY7-7SzPYMGGiHo_DiNY8wxJdTNn5MTvVGQ',
  },
  {
    name: 'Textile & Fiber',
    handle: 'textile-fiber',
    medium: 'Wool · Linen · Brass Armature',
    origin: 'Stockholm · Oaxaca · Kyoto',
    ateliers: 96,
    works: 1240,
    description:
      'Monumental architectural hangings and woven monoliths sourced from regenerative heritage fibers.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBKgBDzUGMPDHt9ebnUq6gCfj_lfFr7tTRq-QBx2viwxPnF5IqTvwSdw6j6QWV8wEHkAyoMs4GquGvMd-er5ar_iXpFz_u0zYY7cDlvj1U0kxp4z_m-LkiY9SAWr5v3g-O-Ezcac3WlCz1DZZoUMhiZKvhrNHEBJT9xey6JeCi7UbnN4GZoA7F-bJoBNgIpxdeAAbquD7dNKGzszsuapsAZmk8tPY0iKaBLG1GJyClN2MM49CP--i50fA',
  },
  {
    name: 'Photography',
    handle: 'photography',
    medium: 'Silver Gelatin · Platinum Palladium',
    origin: 'Reykjavík · Marseille · Seoul',
    ateliers: 143,
    works: 2670,
    description:
      'Archival darkroom practices and large-format studies printed to museum permanence standards.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCXvOMhPHtDf7bbP3Bo84Yl70tIEXgXvLCZOWWgMIrFYCKbDdjin_iLTVwJPv16AAZFGmnWtg7VNPz3jhdAImsxronYEHVwzMYygWKIYDz2_ce2ouR-u1oUeX1DfgfQkoUCQapfvhyONxQ5y4O6rb_sJeJk_5uOV7BDc4F8fyzhlisnAoW7YP8pIg8Wd4NSitf_Z2X78RzHM6IR8pZFsEAbcBYGc1pRrMghWyd4_NbagCkc3zo_KILdAQ',
  },
  {
    name: 'Woodwork',
    handle: 'woodwork',
    medium: 'Walnut · Bog Oak · Lime',
    origin: 'Copenhagen · Nagano · Vermont',
    ateliers: 87,
    works: 1090,
    description:
      'Joinery-led sculpture and furniture where grain orientation and oiled surfaces carry the composition.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDENDytz_8-3fUd07V2e0UET_OBLAKwlHhf5HaC7fi7Nh1Zr0lQf4V71C8ETLb8TJFvsYQtoUvrztNa4XN0JKv-Mj1iTf1UAm70DC1u6H0aMw6VsJ3aQhsjXWDU8ww1NN_JC0UV1SdnJhRBFs8Aac_3Heqpq0ffy5efN6E4b2a6itsEhYkNCQeIlHZFvrjvu1WJj0mtcyK6xgXJmf0E-ghhS1wVUGa57eLK3rH3ZcjPgjKOtueZVi7LKg',
  },
  {
    name: 'Mixed Media',
    handle: 'mixed-media',
    medium: 'Pigment · Resin · Found Matter',
    origin: 'Berlin · São Paulo · Melbourne',
    ateliers: 109,
    works: 1530,
    description:
      'Assemblage and material experimentation layering pigment, resin, and salvaged industrial surfaces.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBfpcvJIiJqG-61uu2eZzkd-p7joH3nu1pR4OJJIV9YgWhOwLv0T9bJ_qMFiilDALU0uE2Y8-C-rxDm5JGipt7B7qGYcIPO4N7Z0hExdku7JA3S5PVs3yWnBt6mi7Odbpif0cz_LzIuGf4uh5wlfumfy-HCiZbITrze-heFJtDNuh0u-SkCaKN2_Z-rp4Y5eSxNAz9czuVNVEzKMBbIeVzaHpn1exfY1yH_tyVizctSQFJ0yPB9dSyA7w',
  },
];

const MEDIUM_FAMILIES = [
  { family: 'Silicate', materials: 'Stoneware, Porcelain, Earthenware, Glass', firing: 'Reduction / Raku' },
  { family: 'Metal', materials: 'Bronze, Cast Iron, Brass, Silver', firing: 'Lost-Wax / Forge' },
  { family: 'Pigment', materials: 'Oil, Tempera, Enamel, Resin', firing: 'Impasto / Glaze' },
  { family: 'Fiber', materials: 'Wool, Linen, Silk, Sisal', firing: 'Handloom / Tapestry' },
  { family: 'Cellulose', materials: 'Walnut, Bog Oak, Lime, Cotton Rag', firing: 'Joinery / Relief' },
];

export default function DisciplinesPage() {
  const [active, setActive] = useState<string>('All');

  const visible = useMemo(
    () => (active === 'All' ? DISCIPLINES : DISCIPLINES.filter((d) => d.name === active)),
    [active],
  );

  const totals = useMemo(
    () => ({
      ateliers: DISCIPLINES.reduce((sum, d) => sum + d.ateliers, 0),
      works: DISCIPLINES.reduce((sum, d) => sum + d.works, 0),
    }),
    [],
  );

  return (
    <div className="flex flex-col w-full bg-[#FAF8F5] text-[#1B1C1A]">
      {/* HERO */}
      <section className="relative w-full max-w-[1440px] mx-auto px-5 md:px-12 lg:px-16 pt-12 pb-12 overflow-hidden">
        <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-[#9a4023]/5 blur-3xl pointer-events-none -z-10"></div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8 space-y-5">
            <div className="inline-flex items-center gap-2">
              <span className="w-2 h-2 bg-[#C25E3E]"></span>
              <span className="font-mono text-[10px] uppercase text-[#C25E3E] tracking-widest font-medium">
                Medium Taxonomy
              </span>
              <span className="text-[#716E68] font-mono text-xs">/ DISCIPLINE INDEX 2024</span>
            </div>
            <h1 className="font-serif text-5xl sm:text-6xl text-[#141413] tracking-tight leading-[1.08] max-w-3xl">
              The Disciplines of the Atelier
            </h1>
            <p className="font-sans text-lg text-[#5f5e5d] max-w-2xl leading-relaxed">
              Every practice on Atelier is catalogued by discipline, material family, and firing or
              fabrication method — so curators, collectors, and institutions can navigate physical
              craft with museum precision.
            </p>
          </div>

          <div className="lg:col-span-4 grid grid-cols-2 gap-6 lg:justify-items-end">
            <div>
              <span className="block font-serif text-3xl font-medium text-[#141413]">
                {totals.ateliers.toLocaleString()}
              </span>
              <span className="block font-mono text-[10px] uppercase text-[#716E68]">Indexed Ateliers</span>
            </div>
            <div>
              <span className="block font-serif text-3xl font-medium text-[#141413]">
                {totals.works.toLocaleString()}
              </span>
              <span className="block font-mono text-[10px] uppercase text-[#716E68]">Catalogued Works</span>
            </div>
          </div>
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap items-center gap-2 mt-10 pb-4 border-b border-[#E7E4DF]">
          <button
            onClick={() => setActive('All')}
            className={`px-3 py-1 font-mono text-[10px] uppercase tracking-wider cursor-pointer transition-colors ${
              active === 'All' ? 'bg-[#141413] text-white' : 'bg-white border border-[#E7E4DF] text-[#141413] hover:border-[#C25E3E]'
            }`}
          >
            All Disciplines
          </button>
          {ARTWORK_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-3 py-1 font-mono text-[10px] uppercase tracking-wider cursor-pointer transition-colors ${
                active === cat ? 'bg-[#141413] text-white' : 'bg-white border border-[#E7E4DF] text-[#141413] hover:border-[#C25E3E]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* DISCIPLINE CARDS */}
      <section className="w-full max-w-[1440px] mx-auto px-5 md:px-12 lg:px-16 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {visible.map((d) => (
            <article
              key={d.handle}
              className="bg-white border border-[#E7E4DF] shadow-sm hover:shadow-md transition-shadow flex flex-col group"
            >
              <div className="relative aspect-[4/3] bg-[#efeeeb] overflow-hidden">
                <img
                  src={d.image}
                  alt={d.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-[#141413]/90 text-white px-2 py-1">
                  <span className="font-mono text-[10px] uppercase tracking-wider">DISC-{d.handle.slice(0, 4).toUpperCase()}</span>
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h2 className="font-serif text-xl text-[#141413]">{d.name}</h2>
                <span className="font-mono text-[11px] text-[#C25E3E] block mt-1">{d.medium}</span>
                <p className="font-sans text-xs text-[#5f5e5d] leading-relaxed mt-3 flex-1">{d.description}</p>
                <div className="mt-4 pt-3 border-t border-[#E7E4DF] space-y-1 font-mono text-[11px] text-[#716E68]">
                  <div className="flex justify-between">
                    <span>Ateliers:</span>
                    <span className="text-[#141413] font-medium">{d.ateliers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Catalogued:</span>
                    <span className="text-[#141413] font-medium">{d.works.toLocaleString()} works</span>
                  </div>
                </div>
                <span className="font-mono text-[10px] uppercase text-[#716E68] mt-3">{d.origin}</span>
              </div>
              <Link
                href="/discover"
                className="border-t border-[#E7E4DF] px-5 py-3 font-sans text-xs uppercase tracking-wider text-[#141413] hover:text-[#C25E3E] flex items-center justify-between"
              >
                <span>Browse {d.name}</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
            </article>
          ))}
        </div>

        {visible.length === 0 && (
          <p className="font-mono text-xs text-[#716E68] py-12 text-center">
            No disciplines match this filter yet.
          </p>
        )}
      </section>

      {/* MEDIUM FAMILY INDEX */}
      <section className="w-full bg-[#f5f3f0] py-16 border-y border-[#E7E4DF]">
        <div className="w-full max-w-[1440px] mx-auto px-5 md:px-12 lg:px-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
            <div>
              <span className="font-mono text-[10px] uppercase text-[#C25E3E] font-semibold tracking-widest block mb-1">
                Material Registry
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-[#141413]">Medium Family Index</h2>
            </div>
            <p className="font-sans text-sm text-[#5f5e5d] max-w-md mt-2 md:mt-0">
              Disciplines are grouped by physical material family so acquisition and conservation records
              remain interoperable across institutions.
            </p>
          </div>

          <div className="bg-white border border-[#E7E4DF] overflow-hidden">
            <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 bg-[#efeeeb] border-b border-[#E7E4DF] font-mono text-[10px] uppercase text-[#716E68] tracking-wider">
              <span className="col-span-3">Family</span>
              <span className="col-span-6">Representative Materials</span>
              <span className="col-span-3">Primary Process</span>
            </div>
            {MEDIUM_FAMILIES.map((row, i) => (
              <div
                key={row.family}
                className={`grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 px-6 py-4 ${
                  i !== MEDIUM_FAMILIES.length - 1 ? 'border-b border-[#E7E4DF]' : ''
                } hover:bg-[#FAF8F5] transition-colors`}
              >
                <span className="md:col-span-3 font-serif text-lg text-[#141413]">{row.family}</span>
                <span className="md:col-span-6 font-sans text-xs text-[#5f5e5d]">{row.materials}</span>
                <span className="md:col-span-3 font-mono text-[11px] uppercase text-[#C25E3E]">{row.firing}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full max-w-[1440px] mx-auto px-5 md:px-12 lg:px-16 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-[#141413] text-white p-8 md:p-12">
          <div className="lg:col-span-8 space-y-4">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#ffb59e]">
              Publish Under a Discipline
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-white leading-tight">
              Your practice deserves a precise catalogue entry.
            </h2>
            <p className="font-sans text-sm text-[#e4e2df] max-w-xl font-light">
              Choose your discipline, declare your material family, and your portfolio inherits the
              correct scholarly metadata from the first upload.
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
