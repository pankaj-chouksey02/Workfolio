'use client';

import React from 'react';
import { Card } from '../../../components/ui/Card';

export function AnalyticsDashboard() {
  const metrics = [
    { label: '30-Day Monograph Views', value: '42,810', change: '+18.4% vs last mo' },
    { label: 'Collector Inquiries', value: '28 Direct', change: '8 Accepted' },
    { label: 'Total Valuation Transacted', value: '$134,200', change: '0% platform take' },
    { label: 'Archival Storage Consumed', value: '18.4 GB', change: 'Lossless TIFF / Cloudinary' },
  ];

  return (
    <div className="w-full px-5 lg:px-12 py-8 max-w-[1440px] mx-auto space-y-6">
      <div className="border-b border-[#E7E4DF] pb-6">
        <span className="font-mono text-[10px] uppercase text-[#C25E3E] tracking-widest font-semibold block">Curatorial Analytics</span>
        <h1 className="font-serif text-3xl md:text-4xl text-[#141413]">Studio Audience & Provenance Insights</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m) => (
          <Card key={m.label} className="space-y-2">
            <span className="font-mono text-[10px] uppercase text-[#716E68] block">{m.label}</span>
            <div className="font-serif text-3xl text-[#141413]">{m.value}</div>
            <span className="font-mono text-[11px] text-[#C25E3E]">{m.change}</span>
          </Card>
        ))}
      </div>

      <Card className="space-y-4">
        <h3 className="font-serif text-xl text-[#141413]">Collector Geography & Institutional Traffic</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 font-mono text-xs text-[#716E68]">
          <div className="p-4 bg-[#FAF8F5] border border-[#E7E4DF]">
            <span className="text-[#141413] font-semibold block text-sm">Zurich & Geneva, CH</span>
            <span>38% of curatorial visits</span>
          </div>
          <div className="p-4 bg-[#FAF8F5] border border-[#E7E4DF]">
            <span className="text-[#141413] font-semibold block text-sm">Kyoto & Tokyo, JP</span>
            <span>26% of curatorial visits</span>
          </div>
          <div className="p-4 bg-[#FAF8F5] border border-[#E7E4DF]">
            <span className="text-[#141413] font-semibold block text-sm">Paris & London, EU</span>
            <span>22% of curatorial visits</span>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default AnalyticsDashboard;
