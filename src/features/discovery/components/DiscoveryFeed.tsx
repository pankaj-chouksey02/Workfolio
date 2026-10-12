'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { ARTWORK_CATEGORIES } from '../../../lib/constants';

export function DiscoveryFeed() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const creators = [
    {
      name: 'Elena Vance',
      slug: 'elenavance',
      discipline: 'Ceramics & Stoneware',
      location: 'Zurich & Kyoto',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      cover: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDha1TzoOkLMLpC_Bs7xc7KfYol24S6Ozc4T_tILVTNXWd1gJMy-YCCGDNR81oSa67kPy8pmJeFcltIIXNq695dXm4t_l1MACK4MtgfbNGK8lh7B-Fuv4EdWZgMpa68X92X6c_Bvg5_CwsotT4UuE-POB_NYuijoPFFC-ILSD-hW_c2sWFqfpHMsb5RxFG3ODsN-VI6GDrd8-xM8geSl8ib4XETj5RSMQ62xAOPKzobR0Ms3cacjNzrUA',
      worksCount: 34,
      status: 'Open Commission',
    },
    {
      name: 'Mateo Rossi',
      slug: 'mateorossi',
      discipline: 'Oil & Belgian Linen',
      location: 'Milan, IT',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOhCh0Gzb4gbzcHpC7bF0OynU3pZd6xR8e5rvrmEIqVgK053uqQ-OvRao8LRRkzypc4E4yR2vx3fh_eY6JfYlQWgdJdcDn6yFBR_FfVPsS2lM0IHQAviYO8ZqjFy-UjkC1LYFaYrRWkymavJtA-nytOv2RFKoF4kEc0O8I07CvOPo8JWAha70vCTIN6wq60jnl2TyZ2cpJgWTKxxJY7rht9KGwwWf2YQ0D2bHtU3VqYjpAsOjzwc1QZw',
      cover: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA8RYtNqL0dR6W8yb7CAlFBNB2wqaFpCj6BPSaYgKSf9tmzmfSVyxha3J0-88T7HT1fZIri1xKbOnGjZpInsgXUqHm95pqtuw8roOdiuKIkq7KHaoR4Lt5mshP_s8tRCUTaLqzuhO7d_S7dfdbE06AO__I8a2v4e1O1r57XSLKYKIxXatjV_W8FPk0daorJux8c0ovDTqu_J-pv60JP5qR4TgXYJw3DOYYtYHrFkUB7AH5R2zhmTnvJpw',
      worksCount: 19,
      status: 'Waitlist Only',
    },
    {
      name: 'Anya Lindqvist',
      slug: 'lindqvist',
      discipline: 'Textile & Fiber',
      location: 'Stockholm, SE',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCDQ7QH4io-6NiDdPEFV0rjeSyzpCq29OBf750r-KMCIAXB6LsaJdVMLhCdxzuFclkXCrw0cEbmWioHblTQfOqIhFz-JkExxP6FQay9bsFio_CUGN0vU4LGox0MIz1uxvbGPkL5iux9-GwIsygmxGzsu8RXuF72VpWRAdIXYAEcnKoQZ_7XfeaYYxDoeAOgbWYhuf3ttp9Z3qVWAG-YSnLivXaGZ2Ylomfa85CRrfntc1pBK3wkqXx10w',
      cover: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKgBDzUGMPDHt9ebnUq6gCfj_lfFr7tTRq-QBx2viwxPnF5IqTvwSdw6j6QWV8wEHkAyoMs4GquGvMd-er5ar_iXpFz_u0zYY7cDlvj1U0kxp4z_m-LkiY9SAWr5v3g-O-Ezcac3WlCz1DZZoUMhiZKvhrNHEBJT9xey6JeCi7UbnN4GZoA7F-bJoBNgIpxdeAAbquD7dNKGzszsuapsAZmk8tPY0iKaBLG1GJyClN2MM49CP--i50fA',
      worksCount: 12,
      status: 'Open Commission',
    },
  ];

  return (
    <div className="w-full max-w-[1440px] mx-auto px-5 md:px-12 lg:px-16 py-12">
      <div className="space-y-2 mb-8">
        <span className="font-mono text-[10px] uppercase text-[#C25E3E] tracking-widest font-semibold">Global Curatorial Index</span>
        <h1 className="font-serif text-4xl text-[#141413]">Explore Sovereign Ateliers</h1>
        <p className="font-sans text-sm text-[#716E68] max-w-xl">
          Discover museum-represented fine artists, contemporary ceramicists, and sculptors worldwide.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-[#E7E4DF]">
        <button
          onClick={() => setSelectedCategory('All')}
          className={`px-3 py-1 font-mono text-[10px] uppercase tracking-wider cursor-pointer ${
            selectedCategory === 'All' ? 'bg-[#141413] text-white' : 'bg-white border border-[#E7E4DF] text-[#141413]'
          }`}
        >
          All Disciplines
        </button>
        {ARTWORK_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 font-mono text-[10px] uppercase tracking-wider cursor-pointer ${
              selectedCategory === cat ? 'bg-[#141413] text-white' : 'bg-white border border-[#E7E4DF] text-[#141413]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Creators Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {creators.map((creator) => (
          <Card key={creator.slug} padding="none" className="group overflow-hidden">
            <div className="relative aspect-[16/10] bg-[#efeeeb] overflow-hidden">
              <img
                src={creator.cover}
                alt={creator.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-3 left-3 flex items-center gap-2">
                <span className="bg-white/90 backdrop-blur-sm border border-[#E7E4DF] px-2 py-0.5 font-mono text-[10px] text-[#141413] uppercase">
                  {creator.discipline}
                </span>
              </div>
            </div>
            <div className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-xl text-[#141413]">{creator.name}</h3>
                  <span className="font-mono text-xs text-[#C25E3E]">@{creator.slug}</span>
                </div>
                <Badge variant="accent">{creator.status}</Badge>
              </div>
              <p className="font-mono text-xs text-[#716E68]">{creator.location} · {creator.worksCount} Catalogued Works</p>
              <div className="pt-3 border-t border-[#E7E4DF] flex items-center justify-between">
                <Link
                  href={`/u/${creator.slug}`}
                  className="font-sans text-xs uppercase tracking-wider text-[#141413] hover:text-[#C25E3E] font-medium"
                >
                  Visit Atelier →
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default DiscoveryFeed;
