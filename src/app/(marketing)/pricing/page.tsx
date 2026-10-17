'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const PLANS = [
  {
    name: 'Free',
    price: '₹0',
    cycle: 'forever',
    tagline: 'For creators starting their portfolio.',
    cta: 'Get started free',
    ctaHref: '/signup',
    featured: false,
    features: [
      'Create a public portfolio',
      'Access to selected templates',
      'Add and manage work',
      'Shareable portfolio link',
      'Basic profile customization',
    ],
    missing: [
      'Premium templates & customization',
      'Advanced analytics',
      'Commission intake tools',
      'Custom domain',
    ],
  },
  {
    name: 'Pro',
    price: '₹499',
    cycle: 'month',
    tagline: 'For creators who want more control and advanced features.',
    cta: 'Explore Pro',
    ctaHref: '/signup?plan=pro',
    featured: true,
    features: [
      'All Free features',
      'Premium templates & customization',
      'Advanced portfolio analytics',
      'Commission intake tools',
      'Enhanced professional presentation',
      'Priority brief routing',
    ],
    missing: [
      'Multi-artist team workspace',
      'Custom domain support',
    ],
  },
  {
    name: 'Studio',
    price: '₹999',
    cycle: 'month',
    tagline: 'For professional studios and institutions at scale.',
    cta: 'Launch Studio',
    ctaHref: '/signup?plan=studio',
    featured: false,
    features: [
      'All Pro features',
      'Multi-artist team workspace',
      'Custom domain support',
      'White-label portfolio',
      'Dedicated account manager',
      'Full accession & provenance dossier',
    ],
    missing: [],
  },
];

const FAQS = [
  {
    q: 'Can I switch plans at any time?',
    a: 'Yes. You can upgrade or downgrade your plan at any point from your account settings. Changes take effect immediately and billing is prorated.',
  },
  {
    q: 'Is there a free trial for Pro or Studio?',
    a: 'Pro includes a 14-day free trial with no credit card required. Studio trials are available on request — reach out to our team.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept all major credit and debit cards (Visa, Mastercard, RuPay) as well as UPI and net banking for Indian accounts.',
  },
  {
    q: 'Are prices inclusive of GST?',
    a: 'Yes. All listed prices are inclusive of applicable GST. Your invoice will break out the tax component separately.',
  },
  {
    q: 'What happens to my portfolio if I downgrade to Free?',
    a: 'Your portfolio and work remain intact. Premium template selections revert to the default template, and Pro-only features are paused until you re-upgrade.',
  },
];

const FEATURES_TABLE = [
  { label: 'Public portfolio', free: true, pro: true, studio: true },
  { label: 'Shareable portfolio link', free: true, pro: true, studio: true },
  { label: 'Add & manage work', free: true, pro: true, studio: true },
  { label: 'Basic profile customization', free: true, pro: true, studio: true },
  { label: 'Selected templates', free: true, pro: true, studio: true },
  { label: 'Premium templates & customization', free: false, pro: true, studio: true },
  { label: 'Advanced portfolio analytics', free: false, pro: true, studio: true },
  { label: 'Commission intake tools', free: false, pro: true, studio: true },
  { label: 'Priority brief routing', free: false, pro: true, studio: true },
  { label: 'Multi-artist team workspace', free: false, pro: false, studio: true },
  { label: 'Custom domain support', free: false, pro: false, studio: true },
  { label: 'White-label portfolio', free: false, pro: false, studio: true },
  { label: 'Dedicated account manager', free: false, pro: false, studio: true },
  { label: 'Full accession & provenance dossier', free: false, pro: false, studio: true },
];

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="flex flex-col w-full bg-[#FAF8F5] text-[#1B1C1A]">

      {/* ── HERO ── */}
      <section className="relative w-full max-w-[1440px] mx-auto px-5 md:px-12 lg:px-16 pt-16 pb-6 overflow-hidden text-center">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#C25E3E]/5 blur-3xl pointer-events-none -z-10" />
        <span className="font-mono text-[10px] uppercase text-[#C25E3E] tracking-widest font-semibold">
          Simple, Transparent Pricing
        </span>
        <h1 className="font-serif text-5xl sm:text-6xl text-[#141413] tracking-tight leading-[1.08] mt-3 mb-4">
          Start free. Grow when you&apos;re ready.
        </h1>
        <p className="font-sans text-lg text-[#5f5e5d] max-w-xl mx-auto leading-relaxed">
          Everything you need to showcase your work, with room to grow as your portfolio evolves.
        </p>
        <div className="mt-4 inline-flex items-center gap-2 bg-[#f0ede9] border border-[#E7E4DF] px-4 py-2 font-mono text-[11px] text-[#5f5e5d]">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Free plan — no credit card required
        </div>
      </section>

      {/* ── PLAN CARDS ── */}
      <section className="w-full max-w-[1440px] mx-auto px-5 md:px-12 lg:px-16 pt-12 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col border transition-shadow duration-300 hover:shadow-xl ${
                plan.featured
                  ? 'bg-[#1B1C1A] text-white border-[#1B1C1A] shadow-xl'
                  : 'bg-white border-[#E7E4DF]'
              }`}
            >
              {plan.featured && (
                <span className="absolute -top-px right-6 bg-[#C25E3E] text-white font-mono text-[10px] uppercase tracking-widest px-4 py-1">
                  Popular
                </span>
              )}

              {/* Header */}
              <div className={`px-8 pt-8 pb-6 border-b ${plan.featured ? 'border-white/10' : 'border-[#E7E4DF]'}`}>
                <h2 className={`font-serif text-2xl mb-4 ${plan.featured ? 'text-white' : 'text-[#141413]'}`}>
                  {plan.name}
                </h2>
                <div className="flex items-baseline gap-1.5 mb-3">
                  <span className={`font-serif text-5xl font-semibold leading-none ${plan.featured ? 'text-white' : 'text-[#141413]'}`}>
                    {plan.price}
                  </span>
                  <span className={`font-mono text-xs uppercase tracking-wider ${plan.featured ? 'text-[#a9a6a3]' : 'text-[#716E68]'}`}>
                    / {plan.cycle}
                  </span>
                </div>
                <p className={`font-sans text-xs leading-relaxed ${plan.featured ? 'text-[#c8c5c0]' : 'text-[#5f5e5d]'}`}>
                  {plan.tagline}
                </p>
              </div>

              {/* Features */}
              <ul className={`flex-1 px-8 py-6 space-y-3.5 font-sans text-sm ${plan.featured ? 'text-[#e4e2df]' : 'text-[#56423d]'}`}>
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-[16px] mt-0.5 text-[#C25E3E] shrink-0">check</span>
                    <span className={plan.featured ? 'font-medium' : ''}>{f}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="px-8 pb-8">
                <Link
                  href={plan.ctaHref}
                  className={`block w-full text-center font-sans text-xs uppercase tracking-wider px-6 py-3.5 transition-colors ${
                    plan.featured
                      ? 'bg-[#C25E3E] text-white hover:bg-white hover:text-[#141413]'
                      : 'border border-[#141413] text-[#141413] hover:bg-[#141413] hover:text-white'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center font-mono text-[10px] text-[#a9a6a3] uppercase tracking-wider mt-8">
          No credit card required for Free plan &nbsp;&middot;&nbsp; Cancel anytime &nbsp;&middot;&nbsp; GST inclusive
        </p>
      </section>

      {/* ── FEATURE COMPARISON TABLE ── */}
      <section className="w-full bg-[#f5f3f0] py-20 border-y border-[#E7E4DF]">
        <div className="w-full max-w-[1100px] mx-auto px-5 md:px-12">
          <div className="text-center mb-12">
            <span className="font-mono text-[10px] uppercase text-[#C25E3E] font-semibold tracking-widest block mb-2">
              Compare Plans
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#141413]">Everything, side by side.</h2>
          </div>

          <div className="bg-white border border-[#E7E4DF] overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse">
              <thead>
                <tr className="border-b border-[#E7E4DF]">
                  <th className="text-left px-6 py-4 font-mono text-[10px] uppercase text-[#716E68] tracking-wider w-1/2">
                    Feature
                  </th>
                  {PLANS.map((p) => (
                    <th
                      key={p.name}
                      className={`px-4 py-4 font-serif text-base text-center ${
                        p.featured ? 'text-[#C25E3E]' : 'text-[#141413]'
                      }`}
                    >
                      {p.name}
                      {p.featured && (
                        <span className="block font-mono text-[9px] uppercase text-[#C25E3E] tracking-wider mt-0.5">
                          Popular
                        </span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E7E4DF]">
                {FEATURES_TABLE.map((row, i) => (
                  <tr key={row.label} className={i % 2 === 0 ? 'bg-white' : 'bg-[#faf8f5]'}>
                    <td className="px-6 py-3.5 font-sans text-xs text-[#56423d]">{row.label}</td>
                    {(['free', 'pro', 'studio'] as const).map((tier) => (
                      <td key={tier} className="px-4 py-3.5 text-center">
                        {row[tier] ? (
                          <span className="material-symbols-outlined text-[18px] text-[#C25E3E]">check_circle</span>
                        ) : (
                          <span className="material-symbols-outlined text-[18px] text-[#d4d0cb]">remove</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="w-full py-20">
        <div className="w-full max-w-[900px] mx-auto px-5 md:px-12">
          <div className="text-center mb-12">
            <span className="font-mono text-[10px] uppercase text-[#C25E3E] font-semibold tracking-widest block mb-2">
              Questions
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#141413]">Pricing, explained.</h2>
          </div>

          <div className="bg-white border border-[#E7E4DF] divide-y divide-[#E7E4DF]">
            {FAQS.map((f, i) => (
              <div key={f.q}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer hover:bg-[#FAF8F5] transition-colors"
                >
                  <span className="font-serif text-base text-[#141413]">{f.q}</span>
                  <span className="material-symbols-outlined text-[20px] text-[#C25E3E] shrink-0">
                    {openFaq === i ? 'remove' : 'add'}
                  </span>
                </button>
                {openFaq === i && (
                  <p className="px-6 pb-5 font-sans text-sm text-[#5f5e5d] leading-relaxed">{f.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="w-full max-w-[1440px] mx-auto px-5 md:px-12 lg:px-16 pb-20">
        <div className="bg-[#141413] text-white px-8 md:px-14 py-12 md:py-14 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#ffb59e]">
              Ready to begin?
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-white leading-tight">
              Your portfolio deserves a stage.
            </h2>
            <p className="font-sans text-sm text-[#e4e2df] font-light">
              Join thousands of artists, ceramists, and studios already building on Atelier. Start free — no commitment needed.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/signup"
              className="bg-[#C25E3E] text-white font-sans text-xs uppercase tracking-wider px-8 py-3.5 hover:bg-white hover:text-[#141413] transition-colors text-center"
            >
              Start for Free
            </Link>
            <Link
              href="/signup?plan=pro"
              className="border border-white/30 text-white font-sans text-xs uppercase tracking-wider px-8 py-3.5 hover:bg-white/10 transition-colors text-center"
            >
              Try Pro — 14 Days Free
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
