'use client';

import React, { useState } from 'react';
import { Card } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';

export function CommissionsView() {
  const [filter, setFilter] = useState<'all' | 'new' | 'active'>('all');

  const commissions = [
    {
      id: 'COM-2024-001',
      client: 'Dr. Arthur Pendelton',
      email: 'arthur@curatorial.org',
      institution: 'Palais des Arts Contemporains',
      scale: 'Monumental Vessel (90cm+)',
      budget: '$6,500 USD',
      deadline: 'Oct 2024',
      status: 'New Inquiry',
      date: '2 hours ago',
    },
    {
      id: 'COM-2024-002',
      client: 'Klara Solheim',
      email: 'klara@nordicspace.no',
      institution: 'Solheim Private Architecture',
      scale: 'Pair of Columnar Wall Relics',
      budget: '$4,200 USD',
      deadline: 'Dec 2024',
      status: 'Proposal Sent',
      date: 'Yesterday',
    },
    {
      id: 'COM-2024-003',
      client: 'Masanori Sato',
      email: 'sato@kyotocraft.jp',
      institution: 'Kyoto Tea Pavilion Commission',
      scale: 'Set of 4 Wood-fired Ash Bowls',
      budget: '$3,800 USD',
      deadline: 'Nov 2024',
      status: 'In Progress',
      date: '3 days ago',
    },
  ];

  return (
    <div className="w-full px-5 lg:px-12 py-8 max-w-[1440px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E7E4DF] pb-6">
        <div>
          <span className="font-mono text-[10px] uppercase text-[#C25E3E] tracking-widest font-semibold block">Intake Pipeline</span>
          <h1 className="font-serif text-3xl md:text-4xl text-[#141413]">Curatorial Commissions</h1>
          <p className="font-sans text-xs text-[#716E68] mt-1">
            Structured formal briefs transmitted by institutional curators and private collectors.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" icon="tune">Filter</Button>
          <Button variant="primary" size="sm" icon="download">Export Ledger</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {commissions.map((c) => (
          <Card key={c.id} className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-[#716E68] uppercase">{c.id}</span>
              <Badge variant={c.status === 'New Inquiry' ? 'accent' : 'outline'}>{c.status}</Badge>
            </div>
            <div>
              <h3 className="font-serif text-lg text-[#141413]">{c.client}</h3>
              <p className="font-mono text-xs text-[#C25E3E]">{c.institution}</p>
            </div>
            <div className="space-y-1 font-mono text-[11px] text-[#716E68] bg-[#FAF8F5] p-3 border border-[#E7E4DF]">
              <div className="flex justify-between">
                <span>Scope:</span>
                <span className="text-[#141413] font-medium">{c.scale}</span>
              </div>
              <div className="flex justify-between">
                <span>Budget:</span>
                <span className="text-[#141413] font-medium">{c.budget}</span>
              </div>
              <div className="flex justify-between">
                <span>Target:</span>
                <span className="text-[#141413] font-medium">{c.deadline}</span>
              </div>
            </div>
            <div className="flex items-center justify-between pt-2">
              <span className="font-mono text-[10px] text-[#716E68]">{c.date}</span>
              <Button size="sm" variant="outline">Review Brief</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default CommissionsView;
