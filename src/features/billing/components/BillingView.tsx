'use client';

import React from 'react';
import { Card } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';

export function BillingView() {
  const tiers = [
    {
      name: 'Studio Apprentice',
      price: '$0 / mo',
      description: 'Standard portfolio with up to 10 catalogued works.',
      current: false,
    },
    {
      name: 'Master Atelier',
      price: '$29 / mo',
      description: 'Unlimited lossless archival media, custom domain, and structured commission briefs.',
      current: true,
    },
    {
      name: 'Institutional Fellowship',
      price: '$89 / mo',
      description: 'Multi-artist residency collective, provenance PDF certificate automation, and priority curatorial index.',
      current: false,
    },
  ];

  return (
    <div className="w-full px-5 lg:px-12 py-8 max-w-[1440px] mx-auto space-y-6">
      <div className="border-b border-[#E7E4DF] pb-6">
        <span className="font-mono text-[10px] uppercase text-[#C25E3E] tracking-widest font-semibold block">Membership Tiers</span>
        <h1 className="font-serif text-3xl md:text-4xl text-[#141413]">Atelier Membership & Upgrades</h1>
        <p className="font-sans text-xs text-[#716E68] mt-1">
          0% commission taken on transactions. Flat transparent membership for independent master creators.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tiers.map((t) => (
          <Card key={t.name} className={`space-y-4 ${t.current ? 'border-2 border-[#141413]' : ''}`}>
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl text-[#141413]">{t.name}</h3>
              {t.current && <Badge variant="accent">Current Plan</Badge>}
            </div>
            <div className="font-serif text-3xl text-[#141413]">{t.price}</div>
            <p className="font-sans text-xs text-[#56423d]">{t.description}</p>
            <div className="pt-4 border-t border-[#E7E4DF]">
              <Button variant={t.current ? 'secondary' : 'primary'} size="sm" className="w-full">
                {t.current ? 'Manage Subscription' : 'Upgrade Plan'}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default BillingView;
