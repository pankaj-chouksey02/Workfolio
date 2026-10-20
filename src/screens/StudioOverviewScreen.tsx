"use client";

import React from 'react';
import { useArtworks } from '../hooks/useArtworks';

interface StudioOverviewScreenProps {
  onNavigate: (path: string) => void;
}

export default function StudioOverviewScreen({ onNavigate }: StudioOverviewScreenProps) {
  const { artworks } = useArtworks();

  const published = artworks.filter((a) => a.status === 'Published').length;
  const available = artworks.filter((a) => a.status === 'Available').length;
  const total = artworks.length;

  const quickActions = [
    {
      id: 'upload-artwork',
      icon: 'add_photo_alternate',
      label: 'Upload Artwork',
      sub: 'Add to your registry',
      path: 'artworks',
      accent: true,
    },
    {
      id: 'customize-portfolio',
      icon: 'tune',
      label: 'Customize Portfolio',
      sub: 'Adjust theme & layout',
      path: 'portfolio-customizer',
      accent: false,
    },
    {
      id: 'view-artworks',
      icon: 'gallery_thumbnail',
      label: 'Manage Artworks',
      sub: `${total} work${total !== 1 ? 's' : ''} catalogued`,
      path: 'artworks',
      accent: false,
    },
    {
      id: 'view-collections',
      icon: 'collections_bookmark',
      label: 'Collections',
      sub: 'Organise series & sets',
      path: 'collections',
      accent: false,
    },
  ];

  return (
    <div className="px-5 lg:px-12 py-8 space-y-8 max-w-[1200px] mx-auto w-full">

      {/* ── Header ──────────────────────────────── */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <span className="font-mono text-[10px] uppercase text-[#716E68] tracking-widest">
            Studio Overview
          </span>
          <h1 className="font-serif text-3xl text-[#141413] tracking-tight">
            Welcome back.
          </h1>
          <p className="font-sans text-sm text-[#56423d]">
            Here&apos;s a snapshot of your studio activity.
          </p>
        </div>

        {/* Portfolio link pill */}
        <button
          onClick={() => navigator.clipboard?.writeText(window.location.origin + '/profile')}
          className="inline-flex items-center gap-2 border border-[#E7E4DF] bg-white hover:bg-[#f5f3f0] transition-colors px-4 py-2.5 font-mono text-xs text-[#716E68] cursor-pointer self-start md:self-auto"
        >
          <span className="material-symbols-outlined text-[14px] text-[#C25E3E]">link</span>
          Copy portfolio link
        </button>
      </header>

      {/* ── Stat Cards ──────────────────────────── */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          {
            label: 'Total Works',
            value: total,
            icon: 'inventory_2',
            sub: 'In your registry',
          },
          {
            label: 'Published',
            value: published,
            icon: 'public',
            sub: 'Visible on portfolio',
          },
          {
            label: 'Available',
            value: available,
            icon: 'sell',
            sub: 'Open for acquisition',
          },
          {
            label: 'Drafts',
            value: total - published - available < 0 ? 0 : total - published - available,
            icon: 'edit_note',
            sub: 'Awaiting publish',
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white border border-[#E7E4DF] p-5 shadow-sm flex flex-col gap-3"
          >
            <div className="flex items-center justify-between text-[#716E68]">
              <span className="font-mono text-[10px] uppercase tracking-wider">{stat.label}</span>
              <span className="material-symbols-outlined text-[18px]">{stat.icon}</span>
            </div>
            <p className="font-serif text-3xl text-[#141413]">{stat.value}</p>
            <p className="font-mono text-[11px] text-[#716E68]">{stat.sub}</p>
          </div>
        ))}
      </section>

      {/* ── Quick Actions ────────────────────────── */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl text-[#141413]">Quick Actions</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {quickActions.map((action) => (
            <button
              key={action.id}
              id={action.id}
              onClick={() => onNavigate(action.path)}
              className={`group flex items-center gap-4 p-4 border text-left transition-all duration-150 cursor-pointer shadow-sm ${
                action.accent
                  ? 'bg-[#141413] border-[#141413] hover:bg-[#C25E3E] hover:border-[#C25E3E] text-white'
                  : 'bg-white border-[#E7E4DF] hover:border-[#141413] text-[#141413]'
              }`}
            >
              <span
                className={`material-symbols-outlined text-[22px] shrink-0 ${
                  action.accent ? 'text-white' : 'text-[#C25E3E]'
                }`}
              >
                {action.icon}
              </span>
              <div className="min-w-0">
                <p className={`font-sans text-xs font-semibold uppercase tracking-wide truncate ${action.accent ? 'text-white' : 'text-[#141413]'}`}>
                  {action.label}
                </p>
                <p className={`font-mono text-[10px] truncate mt-0.5 ${action.accent ? 'text-white/70' : 'text-[#716E68]'}`}>
                  {action.sub}
                </p>
              </div>
              <span
                className={`material-symbols-outlined text-[16px] ml-auto shrink-0 opacity-0 group-hover:opacity-100 transition-opacity ${action.accent ? 'text-white' : 'text-[#141413]'}`}
              >
                arrow_forward
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* ── Recent Artworks ──────────────────────── */}
      <section className="space-y-3 pb-10">
        <div className="flex items-end justify-between">
          <h2 className="font-serif text-xl text-[#141413]">Recent Artworks</h2>
          <button
            onClick={() => onNavigate('artworks')}
            className="font-sans text-xs uppercase tracking-wider text-[#716E68] hover:text-[#C25E3E] flex items-center gap-1 transition-colors cursor-pointer"
          >
            View all
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </button>
        </div>

        {artworks.length === 0 ? (
          <div className="bg-white border border-[#E7E4DF] p-10 text-center space-y-3">
            <span className="material-symbols-outlined text-[40px] text-[#E7E4DF]">gallery_thumbnail</span>
            <p className="font-sans text-sm text-[#716E68]">No artworks yet. Upload your first piece.</p>
            <button
              onClick={() => onNavigate('artworks')}
              className="bg-[#141413] hover:bg-[#C25E3E] text-white px-5 py-2.5 font-sans text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              Upload Artwork
            </button>
          </div>
        ) : (
          <div className="bg-white border border-[#E7E4DF] shadow-sm divide-y divide-[#efeeeb]">
            {artworks.slice(0, 5).map((artwork) => (
              <div
                key={artwork.id}
                className="flex items-center gap-4 px-5 py-3.5 hover:bg-[#f5f3f0] transition-colors group"
              >
                {/* Thumbnail */}
                <div className="w-10 h-10 shrink-0 bg-[#eae8e5] overflow-hidden">
                  {artwork.image ? (
                    <img
                      src={artwork.image}
                      alt={artwork.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="material-symbols-outlined text-[16px] text-[#716E68]">image</span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-sans text-sm text-[#141413] truncate">{artwork.title}</p>
                  <p className="font-mono text-[10px] text-[#716E68] truncate">{artwork.material}</p>
                </div>

                {/* Status badge */}
                <span
                  className={`font-mono text-[10px] px-2 py-0.5 shrink-0 ${
                    artwork.status === 'Published'
                      ? 'bg-[#141413] text-white'
                      : artwork.status === 'Available'
                      ? 'bg-[#C25E3E] text-white'
                      : 'bg-[#efeeeb] text-[#716E68]'
                  }`}
                >
                  {artwork.status}
                </span>

                {/* Arrow */}
                <button
                  onClick={() => onNavigate('artworks')}
                  className="opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  aria-label="Manage artwork"
                >
                  <span className="material-symbols-outlined text-[16px] text-[#141413]">open_in_new</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
