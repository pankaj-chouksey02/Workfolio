'use client';

import React, { useMemo, useState } from 'react';

type Cycle = 'monthly' | 'annual';
type PlanKey = 'apprentice' | 'master' | 'fellowship' | 'collective';

interface Plan {
  key: PlanKey;
  name: string;
  tagline: string;
  monthly: number;
  annual: number; // effective monthly price when billed annually
  seats: string;
  storage: string;
  features: string[];
  featured?: boolean;
}

const PLANS: Plan[] = [
  {
    key: 'apprentice',
    name: 'Studio Apprentice',
    tagline: 'For emerging makers finding their first collectors.',
    monthly: 0,
    annual: 0,
    seats: '1 artist',
    storage: '5 GB',
    features: [
      'Up to 10 catalogued works',
      'Sovereign handle (atelier.art/@you)',
      'Basic provenance records',
      'Community curatorial index',
    ],
  },
  {
    key: 'master',
    name: 'Master Atelier',
    tagline: 'For working artists running a full commission practice.',
    monthly: 29,
    annual: 23,
    seats: '1 artist',
    storage: '50 GB',
    features: [
      'Unlimited catalogued works',
      'Unlimited lossless TIFF / RAW media',
      'Custom domain + sovereign URI',
      'Structured commission brief intake',
      'Provenance certificate (manual)',
    ],
    featured: true,
  },
  {
    key: 'fellowship',
    name: 'Institutional Fellowship',
    tagline: 'For residency collectives and gallery-represented rosters.',
    monthly: 89,
    annual: 71,
    seats: 'Up to 5 artists',
    storage: '500 GB',
    features: [
      'Everything in Master Atelier',
      'Multi-artist residency collective',
      'Automated provenance PDF certificates',
      'Priority curatorial index placement',
      'Conservation liaison + 24h support SLA',
    ],
  },
  {
    key: 'collective',
    name: 'Atelier Collective',
    tagline: 'For foundations and multi-site studios at institutional scale.',
    monthly: 149,
    annual: 119,
    seats: 'Unlimited artists',
    storage: '2 TB',
    features: [
      'Everything in Institutional Fellowship',
      'Unlimited artists & unlimited seats',
      'Dedicated registrar workspace',
      'API + collection export tooling',
      'Named account curator',
    ],
  },
];

const CURRENT_PLAN: PlanKey = 'master';

const ADDONS = [
  { key: 'storage', label: 'Extra archival storage', detail: '+50 GB lossless Cloudinary', price: 6, icon: 'cloud' },
  { key: 'provenance', label: 'Provenance PDF automation', detail: 'Signed certificates per acquisition', price: 4, icon: 'verified' },
  { key: 'index', label: 'Priority curatorial index', detail: 'Featured placement in Explore', price: 9, icon: 'trending_up' },
  { key: 'intake', label: 'Dedicated intake desk', detail: 'Commission triage + deposit handling', price: 12, icon: 'support_agent' },
] as const;

const COMPARISON: { label: string; values: Record<PlanKey, string> }[] = [
  {
    label: 'Catalogued works',
    values: { apprentice: '10', master: 'Unlimited', fellowship: 'Unlimited', collective: 'Unlimited' },
  },
  {
    label: 'Lossless archival storage',
    values: { apprentice: '5 GB', master: '50 GB', fellowship: '500 GB', collective: '2 TB' },
  },
  {
    label: 'Included artists / seats',
    values: { apprentice: '1', master: '1', fellowship: '5', collective: 'Unlimited' },
  },
  {
    label: 'Custom domain & sovereign URI',
    values: { apprentice: '—', master: 'Included', fellowship: 'Included', collective: 'Included' },
  },
  {
    label: 'Structured commission briefs',
    values: { apprentice: '—', master: 'Included', fellowship: 'Included', collective: 'Included' },
  },
  {
    label: 'Automated provenance PDF',
    values: { apprentice: '—', master: '—', fellowship: 'Included', collective: 'Included' },
  },
  {
    label: 'Priority curatorial index',
    values: { apprentice: '—', master: '—', fellowship: 'Included', collective: 'Included' },
  },
  {
    label: 'Support SLA',
    values: { apprentice: 'Community', master: '72h email', fellowship: '24h priority', collective: 'Named curator' },
  },
  {
    label: 'Platform take on sales',
    values: { apprentice: '0%', master: '0%', fellowship: '0%', collective: '0%' },
  },
];

const FAQS = [
  {
    q: 'Do you take a commission on my sales?',
    a: 'Never. Atelier charges a flat membership and takes 0% on direct sales, commissions, and editions — regardless of plan.',
  },
  {
    q: 'What happens to my work if I downgrade?',
    a: 'Your registry stays intact and read-only beyond the new plan limits. Your sovereign handle and public portfolio URL are always preserved.',
  },
  {
    q: 'Can I switch billing cycle later?',
    a: 'Yes. Switching to annual applies the discounted rate immediately; switching back prorates the remaining balance onto your next invoice.',
  },
  {
    q: 'Is there an institutional invoice option?',
    a: 'Institutional Fellowship and Atelier Collective support purchase orders, invoicing, and multi-year agreements. Contact the curatorial desk to arrange terms.',
  },
];

export function BillingView() {
  const [cycle, setCycle] = useState<Cycle>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<PlanKey>(CURRENT_PLAN);
  const [addons, setAddons] = useState<Record<string, boolean>>({ provenance: true });
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const priceFor = (plan: Plan) => (cycle === 'annual' ? plan.annual : plan.monthly);

  const estimate = useMemo(() => {
    const plan = PLANS.find((p) => p.key === selectedPlan)!;
    const base = cycle === 'annual' ? plan.annual : plan.monthly;
    const addonTotal = ADDONS.reduce((sum, a) => sum + (addons[a.key] ? a.price : 0), 0);
    return { base, addonTotal, total: base + addonTotal };
  }, [selectedPlan, addons, cycle]);

  const savings = useMemo(
    () => PLANS.reduce((max, p) => (p.monthly > 0 ? Math.max(max, Math.round(((p.monthly - p.annual) / p.monthly) * 100)) : max), 0),
    [],
  );

  const ctaLabel = (key: PlanKey) => {
    if (key === CURRENT_PLAN) return 'Manage Subscription';
    if (key === selectedPlan) return `Switch to ${PLANS.find((p) => p.key === key)!.name}`;
    return 'Select This Plan';
  };

  return (
    <div className="w-full px-5 lg:px-12 py-8 max-w-[1440px] mx-auto space-y-8">
      {/* HEADER */}
      <header className="space-y-5 border-b border-[#E7E4DF] pb-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] uppercase text-[#716E68] tracking-widest">Membership // EV-8820</span>
              <span className="text-[#716E68]">/</span>
              <span className="font-mono text-[10px] uppercase text-[#C25E3E] font-semibold">Plan & Billing</span>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl text-[#141413]">Atelier Membership & Upgrades</h1>
            <p className="font-sans text-sm text-[#56423d] max-w-2xl">
              Flat, transparent membership. 0% commission taken on every transaction, on every plan.
            </p>
          </div>

          {/* Billing cycle toggle */}
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-white border border-[#E7E4DF] shadow-sm">
              {(['monthly', 'annual'] as Cycle[]).map((c) => (
                <button
                  key={c}
                  onClick={() => setCycle(c)}
                  className={`px-4 py-2.5 font-mono text-[10px] uppercase tracking-wider transition-colors cursor-pointer ${
                    cycle === c ? 'bg-[#141413] text-white' : 'text-[#56423d] hover:bg-[#f5f3f0]'
                  }`}
                >
                  {c === 'monthly' ? 'Monthly' : 'Annual'}
                </button>
              ))}
            </div>
            <span className="font-mono text-[10px] uppercase text-[#C25E3E] font-semibold whitespace-nowrap">
              Save {savings}%
            </span>
          </div>
        </div>
      </header>

      {/* CURRENT PLAN SUMMARY */}
      <section className="bg-white shadow-sm border border-[#E7E4DF]">
        <div className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#E7E4DF]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-[#C25E3E]"></span>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-serif text-lg text-[#141413]">
                  {PLANS.find((p) => p.key === CURRENT_PLAN)!.name}
                </span>
                <span className="font-mono text-[10px] uppercase text-[#141413] bg-[#e4e2df] px-2 py-0.5">Current Plan</span>
              </div>
              <span className="font-mono text-[11px] text-[#716E68]">
                Renews Nov 14, 2024 · Visa ending 4242
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-serif text-2xl text-[#141413]">
              ${PLANS.find((p) => p.key === CURRENT_PLAN)!.monthly}
              <span className="font-mono text-xs text-[#716E68]"> / mo</span>
            </span>
            <button className="bg-[#efeeeb] hover:bg-[#e4e2df] text-[#141413] px-4 py-2.5 font-sans text-xs uppercase tracking-wider transition-colors cursor-pointer">
              Manage Billing
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#E7E4DF]">
          {[
            { label: 'Lossless Storage', value: '18.4 / 50 GB', pct: 36.8, tone: 'bg-[#C25E3E]' },
            { label: 'Catalogued Works', value: '34 / Unlimited', pct: 34, tone: 'bg-[#141413]' },
            { label: 'Active Commissions', value: '4 in flight', pct: 40, tone: 'bg-[#141413]' },
            { label: 'Provenance Certificates', value: '12 issued', pct: 24, tone: 'bg-[#716E68]' },
          ].map((m) => (
            <div key={m.label} className="p-5 space-y-2 border-[#E7E4DF]">
              <span className="font-mono text-[10px] uppercase text-[#716E68] tracking-wider block">{m.label}</span>
              <span className="font-mono text-xs text-[#141413] font-medium block">{m.value}</span>
              <div className="w-full h-1 bg-[#efeeeb]">
                <div className={`h-full ${m.tone}`} style={{ width: `${m.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PLAN TIERS */}
      <section className="space-y-4">
        <div className="flex items-end justify-between">
          <div>
            <span className="font-mono text-[10px] uppercase text-[#716E68] tracking-wider block">Membership Tiers</span>
            <h2 className="font-serif text-2xl text-[#141413]">Choose the room your practice needs</h2>
          </div>
          <span className="font-mono text-[10px] uppercase text-[#716E68] hidden sm:block">
            Billed {cycle === 'annual' ? 'annually' : 'monthly'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {PLANS.map((plan) => {
            const isCurrent = plan.key === CURRENT_PLAN;
            const isSelected = plan.key === selectedPlan;
            return (
              <div
                key={plan.key}
                className={`relative flex flex-col bg-white border shadow-sm transition-all ${
                  isSelected ? 'border-2 border-[#141413]' : 'border-[#E7E4DF] hover:border-[#c9c6c4]'
                }`}
              >
                {plan.featured && (
                  <span className="absolute -top-3 left-5 bg-[#C25E3E] text-white font-mono text-[10px] uppercase tracking-wider px-2 py-0.5">
                    Most Requested
                  </span>
                )}
                <div className="p-5 flex-1 space-y-4 border-b border-[#E7E4DF]">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-serif text-xl text-[#141413]">{plan.name}</h3>
                    {isCurrent && (
                      <span className="font-mono text-[9px] uppercase text-white bg-[#141413] px-2 py-0.5 shrink-0">
                        Current
                      </span>
                    )}
                  </div>
                  <div className="flex items-end gap-2">
                    <span className="font-serif text-3xl text-[#141413]">${priceFor(plan)}</span>
                    <span className="font-mono text-[11px] text-[#716E68] pb-1">/ mo</span>
                  </div>
                  {cycle === 'annual' && plan.monthly > 0 && (
                    <span className="font-mono text-[10px] text-[#C25E3E] block">
                      ${plan.monthly} billed monthly · save ${(plan.monthly - plan.annual) * 12}/yr
                    </span>
                  )}
                  <p className="font-sans text-xs text-[#56423d] leading-relaxed">{plan.tagline}</p>

                  <div className="flex items-center gap-4 pt-1 border-t border-[#efeeeb] font-mono text-[11px] text-[#716E68]">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">group</span>
                      {plan.seats}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">cloud</span>
                      {plan.storage}
                    </span>
                  </div>

                  <ul className="space-y-2 pt-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 font-sans text-xs text-[#56423d]">
                        <span className="material-symbols-outlined text-[16px] text-[#C25E3E] shrink-0">check</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-5">
                  <button
                    onClick={() => setSelectedPlan(plan.key)}
                    className={`w-full px-4 py-2.5 font-sans text-xs uppercase tracking-wider transition-colors cursor-pointer ${
                      isCurrent
                        ? 'bg-[#efeeeb] text-[#141413] hover:bg-[#e4e2df]'
                        : isSelected
                          ? 'bg-[#C25E3E] text-white hover:bg-[#141413]'
                          : 'bg-[#141413] text-white hover:bg-[#C25E3E]'
                    }`}
                  >
                    {ctaLabel(plan.key)}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ADD-ONS + ESTIMATE */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white shadow-sm border border-[#E7E4DF]">
          <div className="p-5 flex items-center justify-between border-b border-[#E7E4DF]">
            <div>
              <h3 className="font-serif text-lg text-[#141413]">Studio Add-ons</h3>
              <p className="font-mono text-[10px] uppercase text-[#716E68] tracking-wider">Toggle to build your invoice</p>
            </div>
            <span className="material-symbols-outlined text-[18px] text-[#716E68]">tune</span>
          </div>
          <div className="divide-y divide-[#efeeeb]">
            {ADDONS.map((a) => {
              const on = !!addons[a.key];
              return (
                <label
                  key={a.key}
                  className="flex items-center justify-between gap-4 p-5 cursor-pointer hover:bg-[#f5f3f0] transition-colors"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <span className={`material-symbols-outlined text-[20px] shrink-0 ${on ? 'text-[#C25E3E]' : 'text-[#716E68]'}`}>
                      {a.icon}
                    </span>
                    <div className="min-w-0">
                      <span className="font-sans text-sm text-[#141413] block">{a.label}</span>
                      <span className="font-mono text-[11px] text-[#716E68]">{a.detail}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <span className="font-mono text-xs text-[#141413]">+${a.price}/mo</span>
                    <input
                      type="checkbox"
                      checked={on}
                      onChange={(e) => setAddons({ ...addons, [a.key]: e.target.checked })}
                      className="sr-only peer"
                    />
                    <span className="w-9 h-5 bg-[#e4e2df] relative transition-colors peer-checked:bg-[#141413] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full" />
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        {/* ESTIMATE */}
        <div className="bg-[#141413] text-white p-6 shadow-sm flex flex-col justify-between">
          <div>
            <span className="font-mono text-[10px] uppercase text-[#ffb59e] tracking-widest">Estimated Invoice</span>
            <div className="mt-4 space-y-2.5 font-mono text-xs">
              <div className="flex justify-between text-[#e4e2df]">
                <span>{PLANS.find((p) => p.key === selectedPlan)!.name}</span>
                <span>${estimate.base}</span>
              </div>
              {ADDONS.filter((a) => addons[a.key]).map((a) => (
                <div key={a.key} className="flex justify-between text-[#a9a6a3]">
                  <span className="truncate pr-3">{a.label}</span>
                  <span>+${a.price}</span>
                </div>
              ))}
              <div className="flex justify-between text-[#a9a6a3]">
                <span>Platform take on sales</span>
                <span className="text-[#ffb59e]">0%</span>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-white/10">
            <div className="flex items-end justify-between">
              <span className="font-mono text-[10px] uppercase text-[#a9a6a3] tracking-wider">
                Total / month{cycle === 'annual' ? ' · annual' : ''}
              </span>
              <span className="font-serif text-3xl text-white">${estimate.total}</span>
            </div>
            <button className="mt-4 w-full bg-[#C25E3E] text-white hover:bg-white hover:text-[#141413] transition-colors px-4 py-3 font-sans text-xs uppercase tracking-wider cursor-pointer">
              {selectedPlan === CURRENT_PLAN ? 'Confirm Add-ons' : 'Confirm Plan Change'}
            </button>
            <p className="font-mono text-[10px] text-[#a9a6a3] mt-3 leading-relaxed">
              Prorated to your current cycle. Cancel or change anytime.
            </p>
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="bg-white shadow-sm border border-[#E7E4DF]">
        <div className="p-5 flex items-center justify-between border-b border-[#E7E4DF]">
          <h3 className="font-serif text-lg text-[#141413]">Full Plan Comparison</h3>
          <span className="font-mono text-[10px] uppercase text-[#716E68] hidden sm:block">All plans · 0% sales take</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px]">
            <thead>
              <tr className="bg-[#FAF8F5] border-b border-[#E7E4DF]">
                <th className="px-5 py-3 text-left font-mono text-[10px] uppercase tracking-wider text-[#716E68]">Feature</th>
                {PLANS.map((p) => (
                  <th key={p.key} className="px-5 py-3 text-center font-mono text-[10px] uppercase tracking-wider text-[#716E68]">
                    {p.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#efeeeb]">
              {COMPARISON.map((row) => (
                <tr key={row.label} className="hover:bg-[#f5f3f0] transition-colors">
                  <td className="px-5 py-3.5 font-sans text-xs text-[#141413]">{row.label}</td>
                  {PLANS.map((p) => {
                    const v = row.values[p.key];
                    const isDash = v === '—';
                    return (
                      <td key={p.key} className="px-5 py-3.5 text-center">
                        {isDash ? (
                          <span className="font-mono text-xs text-[#c9c6c4]">—</span>
                        ) : (
                          <span className={`font-mono text-xs ${p.key === CURRENT_PLAN ? 'text-[#141413] font-semibold' : 'text-[#56423d]'}`}>
                            {v}
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="space-y-2">
          <span className="font-mono text-[10px] uppercase text-[#C25E3E] tracking-widest block">Membership Questions</span>
          <h2 className="font-serif text-2xl text-[#141413]">Billing, answered plainly</h2>
          <p className="font-sans text-sm text-[#56423d] leading-relaxed">
            Need institutional terms, purchase orders, or a multi-year agreement? The curatorial desk arranges
            custom contracts for foundations and museums.
          </p>
          <button className="mt-2 flex items-center gap-2 bg-[#efeeeb] hover:bg-[#e4e2df] text-[#141413] px-4 py-2.5 font-sans text-xs uppercase tracking-wider transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-[16px]">mail</span>
            Contact Curatorial Desk
          </button>
        </div>

        <div className="lg:col-span-2 bg-white border border-[#E7E4DF] shadow-sm divide-y divide-[#E7E4DF]">
          {FAQS.map((f, i) => (
            <div key={f.q}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer hover:bg-[#FAF8F5] transition-colors"
              >
                <span className="font-serif text-base text-[#141413]">{f.q}</span>
                <span className="material-symbols-outlined text-[20px] text-[#C25E3E] shrink-0">
                  {openFaq === i ? 'remove' : 'add'}
                </span>
              </button>
              {openFaq === i && (
                <p className="px-5 pb-5 font-sans text-sm text-[#5f5e5d] leading-relaxed">{f.a}</p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default BillingView;
