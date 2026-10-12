'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';

interface CreatorPortfolioProps {
  slug?: string;
  creatorName?: string;
}

export function CreatorPortfolio({
  slug = 'elenavance',
  creatorName = 'Elena Vance',
}: CreatorPortfolioProps) {
  const [activeTab, setActiveTab] = useState<'artworks' | 'bio' | 'provenance'>('artworks');
  const [commissionOpen, setCommissionOpen] = useState(false);
  const [briefSent, setBriefSent] = useState(false);

  const sampleWorks = [
    {
      id: 'EV-2024-004',
      title: 'Tectonic Vessel No. 04',
      year: 2024,
      material: 'Unglazed Shigaraki Clay',
      dimensions: '48 × 32 × 30 cm',
      status: 'Available',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDha1TzoOkLMLpC_Bs7xc7KfYol24S6Ozc4T_tILVTNXWd1gJMy-YCCGDNR81oSa67kPy8pmJeFcltIIXNq695dXm4t_l1MACK4MtgfbNGK8lh7B-Fuv4EdWZgMpa68X92X6c_Bvg5_CwsotT4UuE-POB_NYuijoPFFC-ILSD-hW_c2sWFqfpHMsb5RxFG3ODsN-VI6GDrd8-xM8geSl8ib4XETj5RSMQ62xAOPKzobR0Ms3cacjNzrUA',
    },
    {
      id: 'EV-2023-089',
      title: 'Strata Monolith IX',
      year: 2023,
      material: 'Coarse Chamotte & Ash',
      dimensions: '64 × 22 × 18 cm',
      status: 'Available',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfpcvJIiJqG-61uu2eZzkd-p7joH3nu1pR4OJJIV9YgWhOwLv0T9bJ_qMFiilDALU0uE2Y8-C-rxDm5JGipt7B7qGYcIPO4N7Z0hExdku7JA3S5PVs3yWnBt6mi7Odbpif0cz_LzIuGf4uh5wlfumfy-HCiZbITrze-heFJtDNuh0u-SkCaKN2_Z-rp4Y5eSxNAz9czuVNVEzKMBbIeVzaHpn1exfY1yH_tyVizctSQFJ0yPB9dSyA7w',
    },
    {
      id: 'EV-2024-002',
      title: 'Caldera Relic 02',
      year: 2024,
      material: 'Volcanic Porous Clay',
      dimensions: '41 × 39 cm',
      status: 'Acquired',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMleKXqqQAXw99rnEONi9Rejyrm8vV1ATgfO6q1GExwKDlJO9lpSz8WN5mzcnRwimlbi7diVuKNMdQmELNpdV3vy1apiD68Qa7W-R_fMTxqiGwZavvhGmI6nLmDUgvCbVmpQDgfsJmFXTkgtLbq8V0wBSa7L3WXbCDSUjNPhxodL61FJc2AVlR3YbG9v7ILj9aCQX2SJ02HFaikXH3YSNJY7-7SzPYMGGiHo_DiNY8wxJdTNn5MTvVGQ',
    },
  ];

  return (
    <div className="w-full bg-[#FAF8F5] pb-24">
      {/* Hero Banner Header */}
      <section className="relative w-full border-b border-[#E7E4DF] bg-white">
        <div className="max-w-[1440px] mx-auto px-5 md:px-12 lg:px-16 pt-12 pb-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex items-start gap-6">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-[#141413] flex-shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
                  alt={creatorName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h1 className="font-serif text-3xl sm:text-4xl text-[#141413] font-normal">{creatorName}</h1>
                  <Badge variant="success">Verified Atelier</Badge>
                </div>
                <p className="font-mono text-xs text-[#716E68]">atelier.art/@{slug} · Zurich, CH & Kyoto, JP</p>
                <p className="font-sans text-sm text-[#56423d] max-w-xl">
                  Ceramicist & architectural sculptress investigating high-iron stoneware reduction, mineral patinas, and geological memory.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                onClick={() => setCommissionOpen(true)}
                variant="primary"
                size="md"
                icon="draw"
              >
                Request Commission
              </Button>
              <Link href="/studio">
                <Button variant="secondary" size="md" icon="dashboard">
                  Enter Studio
                </Button>
              </Link>
            </div>
          </div>

          {/* Navigation Sub-bar */}
          <div className="flex items-center gap-6 mt-8 pt-4 border-t border-[#E7E4DF]">
            <button
              onClick={() => setActiveTab('artworks')}
              className={`font-mono text-xs uppercase tracking-wider pb-2 border-b-2 transition-colors cursor-pointer ${
                activeTab === 'artworks' ? 'border-[#141413] text-[#141413] font-semibold' : 'border-transparent text-[#716E68]'
              }`}
            >
              Master Catalog (34)
            </button>
            <button
              onClick={() => setActiveTab('bio')}
              className={`font-mono text-xs uppercase tracking-wider pb-2 border-b-2 transition-colors cursor-pointer ${
                activeTab === 'bio' ? 'border-[#141413] text-[#141413] font-semibold' : 'border-transparent text-[#716E68]'
              }`}
            >
              Curatorial Bio
            </button>
            <button
              onClick={() => setActiveTab('provenance')}
              className={`font-mono text-xs uppercase tracking-wider pb-2 border-b-2 transition-colors cursor-pointer ${
                activeTab === 'provenance' ? 'border-[#141413] text-[#141413] font-semibold' : 'border-transparent text-[#716E68]'
              }`}
            >
              Provenance & Solo Shows
            </button>
          </div>
        </div>
      </section>

      {/* Main Tab Content */}
      <main className="max-w-[1440px] mx-auto px-5 md:px-12 lg:px-16 pt-10">
        {activeTab === 'artworks' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sampleWorks.map((work) => (
              <Card key={work.id} padding="none" className="group overflow-hidden">
                <div className="relative aspect-[4/5] bg-[#efeeeb] overflow-hidden">
                  <img
                    src={work.image}
                    alt={work.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#141413] text-white px-2 py-0.5 font-mono text-[10px] uppercase">
                    INV #{work.id}
                  </div>
                </div>
                <div className="p-5 space-y-2">
                  <div className="flex items-start justify-between">
                    <h3 className="font-serif text-xl text-[#141413]">{work.title}</h3>
                    <Badge variant={work.status === 'Available' ? 'accent' : 'outline'}>{work.status}</Badge>
                  </div>
                  <p className="font-mono text-xs text-[#716E68]">{work.material} · {work.dimensions}</p>
                  <div className="pt-3 border-t border-[#E7E4DF] flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase text-[#716E68]">Direct Atelier Inquire</span>
                    <Link
                      href={`/work/${work.id.toLowerCase()}`}
                      className="font-sans text-xs uppercase tracking-wider text-[#141413] hover:text-[#C25E3E] font-medium"
                    >
                      View Monograph →
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'bio' && (
          <div className="max-w-2xl bg-white p-8 border border-[#E7E4DF] space-y-4">
            <h3 className="font-serif text-2xl text-[#141413]">Curatorial Biography</h3>
            <p className="font-sans text-sm text-[#56423d] leading-relaxed">
              Elena Vance (b. 1988) works between Zurich and Shigaraki, exploring tectonic transformations through high-iron stoneware reduction. Her work investigates the dialogue between human architectural geometry and ancient mineral crystallization.
            </p>
            <p className="font-sans text-sm text-[#56423d] leading-relaxed">
              Selected in major international biennial exhibitions and permanently acquired by modern craft museums in Basel, Kyoto, and London.
            </p>
          </div>
        )}

        {activeTab === 'provenance' && (
          <div className="max-w-2xl bg-white p-8 border border-[#E7E4DF] space-y-6">
            <h3 className="font-serif text-2xl text-[#141413]">Archival Provenance Ledger</h3>
            <ul className="space-y-4 border-l-2 border-[#141413] pl-4 font-mono text-xs text-[#56423d]">
              <li>
                <span className="text-[#141413] font-semibold block">2024 — Solo Pavilion: Lithic Strata</span>
                Kunsthalle Zurich, Switzerland
              </li>
              <li>
                <span className="text-[#141413] font-semibold block">2023 — International Ceramic Triennial</span>
                Shigaraki Ceramic Cultural Park, Japan
              </li>
              <li>
                <span className="text-[#141413] font-semibold block">2021 — Archaic Minerals & Ash Glazes</span>
                Musée Ariana, Geneva, Switzerland
              </li>
            </ul>
          </div>
        )}
      </main>

      {/* Commission Modal */}
      {commissionOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#FAF8F5] border border-[#E7E4DF] w-full max-w-lg p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#E7E4DF] pb-3">
              <h3 className="font-serif text-xl text-[#141413]">Commission Brief for {creatorName}</h3>
              <button onClick={() => setCommissionOpen(false)} className="text-[#716E68] hover:text-[#141413]">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            {briefSent ? (
              <div className="p-4 bg-emerald-50 text-emerald-800 font-mono text-xs">
                Inquiry logged into Elena’s private studio intake inbox.
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setBriefSent(true); }} className="space-y-4">
                <div>
                  <label className="block font-mono text-[10px] uppercase text-[#716E68] mb-1">Your Name</label>
                  <input required className="w-full bg-white border border-[#E7E4DF] p-2 text-xs font-sans text-[#141413]" placeholder="Dr. Arthur Pendelton" />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase text-[#716E68] mb-1">Email</label>
                  <input type="email" required className="w-full bg-white border border-[#E7E4DF] p-2 text-xs font-sans text-[#141413]" placeholder="curator@gallery.org" />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase text-[#716E68] mb-1">Scale & Vision</label>
                  <textarea rows={3} required className="w-full bg-white border border-[#E7E4DF] p-2 text-xs font-sans text-[#141413]" placeholder="Architectural vessel project..." />
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="font-mono text-xs text-[#716E68]">Base threshold: $2,800 USD</span>
                  <Button type="submit" size="sm">Transmit Brief</Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CreatorPortfolio;
