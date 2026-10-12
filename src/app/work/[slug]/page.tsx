'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';

export default function ArtworkDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = (params?.slug as string) || 'ev-2024-004';

  return (
    <div className="w-full max-w-[1440px] mx-auto px-5 md:px-12 lg:px-16 py-12">
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="font-mono text-xs uppercase tracking-wider text-[#716E68] hover:text-[#141413] flex items-center gap-1 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          <span>Back to Catalog</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-7 bg-white p-4 border border-[#E7E4DF]">
          <div className="aspect-[4/5] bg-[#efeeeb] overflow-hidden">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDha1TzoOkLMLpC_Bs7xc7KfYol24S6Ozc4T_tILVTNXWd1gJMy-YCCGDNR81oSa67kPy8pmJeFcltIIXNq695dXm4t_l1MACK4MtgfbNGK8lh7B-Fuv4EdWZgMpa68X92X6c_Bvg5_CwsotT4UuE-POB_NYuijoPFFC-ILSD-hW_c2sWFqfpHMsb5RxFG3ODsN-VI6GDrd8-xM8geSl8ib4XETj5RSMQ62xAOPKzobR0Ms3cacjNzrUA"
              alt="Artwork"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-[#C25E3E] uppercase tracking-wider">Lithic Strata Series</span>
              <Badge variant="success">Available</Badge>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#141413]">Tectonic Vessel No. 04</h1>
            <Link href="/u/elenavance" className="font-mono text-xs text-[#716E68] hover:text-[#C25E3E] block">
              Elena Vance (@elenavance)
            </Link>
          </div>

          <div className="p-4 bg-white border border-[#E7E4DF] space-y-2 font-mono text-xs text-[#716E68]">
            <div className="flex justify-between">
              <span>Medium:</span>
              <span className="text-[#141413] font-medium">Unglazed Shigaraki Clay</span>
            </div>
            <div className="flex justify-between">
              <span>Dimensions:</span>
              <span className="text-[#141413] font-medium">48 × 32 × 30 cm</span>
            </div>
            <div className="flex justify-between">
              <span>Weight:</span>
              <span className="text-[#141413] font-medium">18.4 kg</span>
            </div>
            <div className="flex justify-between">
              <span>Accession Ref:</span>
              <span className="text-[#141413] font-medium uppercase">{slug}</span>
            </div>
          </div>

          <p className="font-sans text-sm text-[#56423d] leading-relaxed">
            Thrown from blended Swiss alpine clays, bisqued and subjected to multi-day pit reduction firing with coarse silica inclusions.
          </p>

          <div className="space-y-3 pt-4 border-t border-[#E7E4DF]">
            <div className="flex justify-between items-center">
              <span className="font-mono text-xs text-[#716E68]">Valuation:</span>
              <span className="font-serif text-2xl text-[#141413]">$4,200 USD</span>
            </div>
            <Button size="md" className="w-full" icon="mail">
              Inquire to Acquire
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
